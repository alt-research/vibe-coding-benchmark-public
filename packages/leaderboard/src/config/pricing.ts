/**
 * Model Pricing Configuration
 *
 * Prices are per 1 million tokens, sourced from OpenRouter (2026-01-21)
 * https://openrouter.ai/models
 * https://pricepertoken.com/
 *
 * To update: Edit this file and rebuild the leaderboard service
 */

export interface ModelPricing {
  input: number;   // $ per 1M input tokens
  output: number;  // $ per 1M output tokens
  model: string;   // Display name
  provider: string;
  lastUpdated: string;
}

// Canonical pricing data - use this everywhere
export const MODEL_PRICING: Record<string, ModelPricing> = {
  // Anthropic Claude
  'Claude Opus': {
    input: 5.00,
    output: 25.00,
    model: 'Claude Opus 4.5',
    provider: 'Anthropic',
    lastUpdated: '2026-01-21',
  },
  'Claude Sonnet': {
    input: 3.00,
    output: 15.00,
    model: 'Claude Sonnet 4.5',
    provider: 'Anthropic',
    lastUpdated: '2026-01-21',
  },
  'Claude Haiku': {
    input: 1.00,
    output: 5.00,
    model: 'Claude Haiku 4.5',
    provider: 'Anthropic',
    lastUpdated: '2026-01-21',
  },
  'Claude': {
    input: 1.00,
    output: 5.00,
    model: 'Claude Haiku 4.5',
    provider: 'Anthropic',
    lastUpdated: '2026-01-21',
  },
  'Claude Code': {
    input: 1.00,
    output: 5.00,
    model: 'Claude Haiku 4.5',
    provider: 'Anthropic',
    lastUpdated: '2026-01-21',
  },

  // OpenAI
  'OpenAI': {
    input: 1.75,
    output: 14.00,
    model: 'GPT-5.2',
    provider: 'OpenAI',
    lastUpdated: '2026-01-21',
  },
  'OpenAI Codex': {
    input: 1.75,
    output: 14.00,
    model: 'GPT-5.2',
    provider: 'OpenAI',
    lastUpdated: '2026-01-21',
  },

  // xAI Grok
  'Grok': {
    input: 3.00,
    output: 15.00,
    model: 'Grok 4',
    provider: 'xAI',
    lastUpdated: '2026-01-21',
  },
  'Grok Fast': {
    input: 0.20,
    output: 0.50,
    model: 'Grok 4 Fast',
    provider: 'xAI',
    lastUpdated: '2026-01-21',
  },
  'Grok 4.1': {
    input: 0.20,
    output: 0.50,
    model: 'Grok 4.1 Fast',
    provider: 'xAI',
    lastUpdated: '2026-01-21',
  },

  // Zhipu AI GLM
  'GLM-4': {
    input: 0.40,
    output: 1.50,
    model: 'GLM 4-Plus / GLM-4.7',
    provider: 'Zhipu AI',
    lastUpdated: '2026-01-21',
  },
  'GLM': {
    input: 0.07,
    output: 0.40,
    model: 'GLM 4.7 Flash',
    provider: 'Zhipu AI',
    lastUpdated: '2026-01-21',
  },

  // DeepSeek
  'DeepSeek': {
    input: 0.30,
    output: 1.20,
    model: 'DeepSeek v3',
    provider: 'DeepSeek',
    lastUpdated: '2026-01-21',
  },

  // Google Gemini
  'Gemini': {
    input: 0.50,
    output: 3.00,
    model: 'Gemini 3 Flash',
    provider: 'Google',
    lastUpdated: '2026-01-21',
  },
  'Gemini Flash': {
    input: 0.50,
    output: 3.00,
    model: 'Gemini 3 Flash',
    provider: 'Google',
    lastUpdated: '2026-01-21',
  },
  'Gemini Pro': {
    input: 2.00,
    output: 12.00,
    model: 'Gemini 3 Pro',
    provider: 'Google',
    lastUpdated: '2026-01-21',
  },

  // MiniMax
  'MiniMax': {
    input: 0.27,
    output: 1.12,
    model: 'MiniMax M2.1',
    provider: 'MiniMax',
    lastUpdated: '2026-01-21',
  },
};

/**
 * Calculate cost from tokens using pricing config
 */
export function calculateCost(agentName: string, inputTokens: number, outputTokens: number): number {
  const pricing = MODEL_PRICING[agentName] || { input: 1, output: 5 };
  return (inputTokens / 1_000_000) * pricing.input + (outputTokens / 1_000_000) * pricing.output;
}

/**
 * Get pricing for a model by name (fuzzy match)
 */
export function getPricing(modelName: string): ModelPricing | null {
  // Exact match
  if (MODEL_PRICING[modelName]) {
    return MODEL_PRICING[modelName];
  }

  // Partial match
  const key = Object.keys(MODEL_PRICING).find(k =>
    modelName.toLowerCase().includes(k.toLowerCase()) ||
    k.toLowerCase().includes(modelName.toLowerCase())
  );

  return key ? MODEL_PRICING[key] : null;
}

/**
 * Get all pricing as a formatted table for display
 */
export function getPricingTable(): Array<{
  provider: string;
  model: string;
  input: string;
  output: string;
  lastUpdated: string;
}> {
  const seen = new Set<string>();
  return Object.values(MODEL_PRICING)
    .filter(p => {
      if (seen.has(p.model)) return false;
      seen.add(p.model);
      return true;
    })
    .sort((a, b) => a.provider.localeCompare(b.provider))
    .map(p => ({
      provider: p.provider,
      model: p.model,
      input: `$${p.input.toFixed(2)}`,
      output: `$${p.output.toFixed(2)}`,
      lastUpdated: p.lastUpdated,
    }));
}
