import type { Task } from '../loader.js';

export interface AgentMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AgentConfig {
  name: string;
  model: string;
  apiKey: string;
  baseUrl?: string;
  maxTokens?: number;
}

export interface Agent {
  name: string;
  config: AgentConfig;
  execute(task: Task, prompt: string): AsyncGenerator<AgentEvent>;
}

export interface AgentEvent {
  type: 'thinking' | 'tool_use' | 'text' | 'error' | 'done';
  message: string;
  data?: Record<string, unknown>;
}

export function createAgent(name: string): Agent {
  switch (name.toLowerCase()) {
    case 'claude':
      return new ClaudeAgent();
    case 'glm':
      return new GLMAgent();
    case 'minimax':
      return new MiniMaxAgent();
    case 'openai':
      return new OpenAIAgent();
    case 'deepseek':
      return new DeepSeekAgent();
    case 'gemini':
      return new GeminiAgent();
    case 'qwen':
      return new QwenAgent();
    case 'mock':
      return new MockAgent();
    default:
      throw new Error(`Unknown agent: ${name}. Available: claude, glm, minimax, openai, deepseek, gemini, qwen, mock`);
  }
}

class ClaudeAgent implements Agent {
  name = 'claude';
  config: AgentConfig;

  constructor() {
    this.config = {
      name: 'claude',
      model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-5',
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      baseUrl: process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com',
      maxTokens: 4096
    };
  }

  async *execute(task: Task, prompt: string): AsyncGenerator<AgentEvent> {
    yield { type: 'thinking', message: 'Connecting to Claude API...' };

    const systemPrompt = `You are an AI coding agent. Complete the following task by writing code.

Task: ${task.name}
Description: ${task.description}
Stack: ${task.stack}

Respond with your implementation plan and code.`;

    try {
      const response = await fetch(`${this.config.baseUrl}/v1/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.config.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: this.config.model,
          max_tokens: this.config.maxTokens,
          system: systemPrompt,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (!response.ok) {
        const error = await response.text();
        yield { type: 'error', message: `API error: ${response.status} - ${error}` };
        return;
      }

      const data = await response.json() as {
        content: Array<{ type: string; text?: string }>;
        usage?: { input_tokens: number; output_tokens: number };
      };

      for (const block of data.content) {
        if (block.type === 'text' && block.text) {
          yield { type: 'text', message: block.text };
        }
      }

      yield {
        type: 'done',
        message: 'Completed',
        data: {
          tokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
          model: this.config.model
        }
      };
    } catch (error) {
      yield { type: 'error', message: `Request failed: ${error}` };
    }
  }
}

class GLMAgent implements Agent {
  name = 'glm';
  config: AgentConfig;
  private useAnthropicApi: boolean;

  constructor() {
    // Support both Zhipu API and z.ai Anthropic-compatible API
    this.useAnthropicApi = !!process.env.GLM_USE_ANTHROPIC || (process.env.GLM_BASE_URL?.includes('anthropic') ?? false);
    this.config = {
      name: 'glm',
      model: process.env.GLM_MODEL || (this.useAnthropicApi ? 'glm-4-plus' : 'glm-4-plus'),
      apiKey: process.env.GLM_API_KEY || '',
      baseUrl: process.env.GLM_BASE_URL || 'https://open.bigmodel.cn/api/paas/v4',
      maxTokens: 4096
    };
  }

  async *execute(task: Task, prompt: string): AsyncGenerator<AgentEvent> {
    yield { type: 'thinking', message: `Connecting to GLM API (${this.useAnthropicApi ? 'Anthropic format' : 'OpenAI format'})...` };

    const systemPrompt = `You are an AI coding agent. Complete the following task by writing code.

Task: ${task.name}
Description: ${task.description}
Stack: ${task.stack}

Respond with your implementation plan and code.`;

    try {
      if (this.useAnthropicApi) {
        // Use Anthropic API format (for z.ai)
        const response = await fetch(`${this.config.baseUrl}/v1/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.config.apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: this.config.model,
            max_tokens: this.config.maxTokens,
            system: systemPrompt,
            messages: [{ role: 'user', content: prompt }]
          })
        });

        if (!response.ok) {
          const error = await response.text();
          yield { type: 'error', message: `API error: ${response.status} - ${error}` };
          return;
        }

        const data = await response.json() as {
          content: Array<{ type: string; text?: string }>;
          usage?: { input_tokens: number; output_tokens: number };
        };

        for (const block of data.content) {
          if (block.type === 'text' && block.text) {
            yield { type: 'text', message: block.text };
          }
        }

        yield {
          type: 'done',
          message: 'Completed',
          data: {
            tokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
            model: this.config.model
          }
        };
      } else {
        // Use OpenAI-compatible format (for Zhipu/OpenRouter)
        const requestBody: Record<string, unknown> = {
          model: this.config.model,
          max_tokens: this.config.maxTokens,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ]
        };
        // Support OpenRouter provider selection
        const provider = process.env.GLM_PROVIDER;
        if (provider) {
          requestBody.provider = { order: [provider] };
        }
        const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}`
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const error = await response.text();
          yield { type: 'error', message: `API error: ${response.status} - ${error}` };
          return;
        }

        const data = await response.json() as {
          choices: Array<{ message: { content: string } }>;
          usage?: { total_tokens: number };
        };

        if (data.choices?.[0]?.message?.content) {
          yield { type: 'text', message: data.choices[0].message.content };
        }

        yield {
          type: 'done',
          message: 'Completed',
          data: {
            tokens: data.usage?.total_tokens || 0,
            model: this.config.model
          }
        };
      }
    } catch (error) {
      yield { type: 'error', message: `Request failed: ${error}` };
    }
  }
}

class MiniMaxAgent implements Agent {
  name = 'minimax';
  config: AgentConfig;

  constructor() {
    // MiniMax M2.1 configuration
    this.config = {
      name: 'minimax',
      model: process.env.MINIMAX_MODEL || 'MiniMax-M2.1',
      apiKey: process.env.MINIMAX_API_KEY || '',
      baseUrl: process.env.MINIMAX_BASE_URL || 'https://api.minimax.io/anthropic',
      maxTokens: 16384
    };
  }

  async *execute(task: Task, prompt: string): AsyncGenerator<AgentEvent> {
    yield { type: 'thinking', message: `Connecting to MiniMax API (${this.config.model})...` };

    const systemPrompt = `You are an expert AI coding agent. Your task is to write complete, working code implementations.

IMPORTANT INSTRUCTIONS:
1. Write COMPLETE, PRODUCTION-READY code - not snippets or pseudocode
2. Include ALL necessary imports, types, and error handling
3. Follow best practices for the specified stack
4. Use proper code blocks with filenames: \`\`\`typescript src/index.ts

Task: ${task.name}
Description: ${task.description}
Stack: ${task.stack}

Provide a complete implementation with all files needed.`;

    try {
      // Use Anthropic-compatible messages API
      const response = await fetch(`${this.config.baseUrl}/v1/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.config.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: this.config.model,
          max_tokens: this.config.maxTokens,
          system: systemPrompt,
          messages: [
            { role: 'user', content: prompt }
          ]
        })
      });

      if (!response.ok) {
        const error = await response.text();
        yield { type: 'error', message: `API error: ${response.status} - ${error}` };
        return;
      }

      const data = await response.json() as {
        content?: Array<{ type: string; text?: string }>;
        usage?: { input_tokens: number; output_tokens: number };
      };

      const text = data.content?.find(c => c.type === 'text')?.text;
      if (text) {
        yield { type: 'text', message: text };
      }

      const inputTokens = data.usage?.input_tokens || 0;
      const outputTokens = data.usage?.output_tokens || 0;
      const totalTokens = inputTokens + outputTokens;

      yield {
        type: 'done',
        message: 'Completed',
        data: {
          tokens: totalTokens,
          inputTokens,
          outputTokens,
          model: this.config.model
        }
      };
    } catch (error) {
      yield { type: 'error', message: `Request failed: ${error}` };
    }
  }
}

class OpenAIAgent implements Agent {
  name = 'openai';
  config: AgentConfig;

  constructor() {
    this.config = {
      name: 'openai',
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      apiKey: process.env.OPENAI_API_KEY || '',
      baseUrl: process.env.OPENAI_BASE_URL || 'https://api.openai.com',
      maxTokens: 4096
    };
  }

  async *execute(task: Task, prompt: string): AsyncGenerator<AgentEvent> {
    yield { type: 'thinking', message: `Connecting to OpenAI (${this.config.model})...` };

    const systemPrompt = `You are an AI coding agent. Complete the following task by writing code.

Task: ${task.name}
Description: ${task.description}
Stack: ${task.stack}

Respond with your implementation plan and code.`;

    try {
      const response = await fetch(`${this.config.baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'HTTP-Referer': 'https://vibecoding.llmbench.xyz',
          'X-Title': 'VibeCodingBench'
        },
        body: JSON.stringify({
          model: this.config.model,
          max_tokens: this.config.maxTokens,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ]
        })
      });

      if (!response.ok) {
        const error = await response.text();
        yield { type: 'error', message: `API error: ${response.status} - ${error}` };
        return;
      }

      const data = await response.json() as {
        choices: Array<{ message: { content: string } }>;
        usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
      };

      if (data.choices?.[0]?.message?.content) {
        yield { type: 'text', message: data.choices[0].message.content };
      }

      yield {
        type: 'done',
        message: 'Completed',
        data: {
          tokens: data.usage?.total_tokens || 0,
          inputTokens: data.usage?.prompt_tokens || 0,
          outputTokens: data.usage?.completion_tokens || 0,
          model: this.config.model
        }
      };
    } catch (error) {
      yield { type: 'error', message: `Request failed: ${error}` };
    }
  }
}

class DeepSeekAgent implements Agent {
  name = 'deepseek';
  config: AgentConfig;

  constructor() {
    this.config = {
      name: 'deepseek',
      model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
      apiKey: process.env.DEEPSEEK_API_KEY || '',
      baseUrl: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
      maxTokens: 4096
    };
  }

  async *execute(task: Task, prompt: string): AsyncGenerator<AgentEvent> {
    yield { type: 'thinking', message: `Connecting to DeepSeek (${this.config.model})...` };

    const systemPrompt = `You are an AI coding agent. Complete the following task by writing code.

Task: ${task.name}
Description: ${task.description}
Stack: ${task.stack}

Respond with your implementation plan and code.`;

    try {
      const response = await fetch(`${this.config.baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'HTTP-Referer': 'https://vibecoding.llmbench.xyz',
          'X-Title': 'VibeCodingBench'
        },
        body: JSON.stringify({
          model: this.config.model,
          max_tokens: this.config.maxTokens,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ]
        })
      });

      if (!response.ok) {
        const error = await response.text();
        yield { type: 'error', message: `API error: ${response.status} - ${error}` };
        return;
      }

      const data = await response.json() as {
        choices: Array<{ message: { content: string } }>;
        usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
      };

      if (data.choices?.[0]?.message?.content) {
        yield { type: 'text', message: data.choices[0].message.content };
      }

      yield {
        type: 'done',
        message: 'Completed',
        data: {
          tokens: data.usage?.total_tokens || 0,
          inputTokens: data.usage?.prompt_tokens || 0,
          outputTokens: data.usage?.completion_tokens || 0,
          model: this.config.model
        }
      };
    } catch (error) {
      yield { type: 'error', message: `Request failed: ${error}` };
    }
  }
}

class GeminiAgent implements Agent {
  name = 'gemini';
  config: AgentConfig;

  constructor() {
    this.config = {
      name: 'gemini',
      model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
      apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '',
      baseUrl: process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com',
      maxTokens: 4096
    };
  }

  async *execute(task: Task, prompt: string): AsyncGenerator<AgentEvent> {
    yield { type: 'thinking', message: `Connecting to Gemini (${this.config.model})...` };

    const systemPrompt = `You are an AI coding agent. Complete the following task by writing code.

Task: ${task.name}
Description: ${task.description}
Stack: ${task.stack}

Respond with your implementation plan and code.`;

    const combinedPrompt = `${systemPrompt}\n\n---\n\n${prompt}`;

    try {
      // Use Google AI generateContent endpoint
      const response = await fetch(`${this.config.baseUrl}/v1beta/models/${this.config.model}:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.config.apiKey
        },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: combinedPrompt }] }
          ]
        })
      });

      if (!response.ok) {
        const error = await response.text();
        yield { type: 'error', message: `API error: ${response.status} - ${error}` };
        return;
      }

      const data = await response.json() as {
        candidates?: Array<{ content: { parts: Array<{ text?: string }> } }>;
        usageMetadata?: { totalTokenCount: number };
      };

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        yield { type: 'text', message: text };
      }

      yield {
        type: 'done',
        message: 'Completed',
        data: {
          tokens: data.usageMetadata?.totalTokenCount || 0,
          model: this.config.model
        }
      };
    } catch (error) {
      yield { type: 'error', message: `Request failed: ${error}` };
    }
  }
}

class QwenAgent implements Agent {
  name = 'qwen';
  config: AgentConfig;

  constructor() {
    this.config = {
      name: 'qwen',
      model: process.env.QWEN_MODEL || 'qwen3-max',
      apiKey: process.env.QWEN_API_KEY || '',
      baseUrl: process.env.QWEN_BASE_URL || 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
      maxTokens: 8192
    };
  }

  async *execute(task: Task, prompt: string): AsyncGenerator<AgentEvent> {
    yield { type: 'thinking', message: 'Connecting to Qwen API...' };

    const systemPrompt = `You are an AI coding agent. Complete the following task by writing code.

Task: ${task.name}
Description: ${task.description}
Stack: ${task.stack}

Respond with your implementation plan and code.`;

    try {
      const requestBody: Record<string, unknown> = {
        model: this.config.model,
        max_tokens: this.config.maxTokens,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ]
      };

      // Enable thinking mode if specified
      if (process.env.QWEN_ENABLE_THINKING === 'true') {
        requestBody.enable_thinking = true;
      }

      const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const error = await response.text();
        yield { type: 'error', message: `API error: ${response.status} - ${error}` };
        return;
      }

      const data = await response.json() as {
        choices: Array<{ message: { content: string } }>;
        usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
      };

      if (data.choices?.[0]?.message?.content) {
        yield { type: 'text', message: data.choices[0].message.content };
      }

      yield {
        type: 'done',
        message: 'Completed',
        data: {
          tokens: data.usage?.total_tokens || 0,
          inputTokens: data.usage?.prompt_tokens || 0,
          outputTokens: data.usage?.completion_tokens || 0,
          model: this.config.model
        }
      };
    } catch (error) {
      yield { type: 'error', message: `Request failed: ${error}` };
    }
  }
}

class MockAgent implements Agent {
  name = 'mock';
  config: AgentConfig;

  constructor() {
    this.config = {
      name: 'mock',
      model: 'mock-v1',
      apiKey: 'mock'
    };
  }

  async *execute(_task: Task, _prompt: string): AsyncGenerator<AgentEvent> {
    yield { type: 'thinking', message: 'Mock thinking...' };
    yield { type: 'tool_use', message: 'Writing file...', data: { file: 'index.ts' } };
    yield { type: 'text', message: 'Implementation complete' };
    yield { type: 'done', message: 'Completed' };
  }
}
