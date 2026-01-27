#!/usr/bin/env node

/**
 * Agentic Dev Starter - Installer
 *
 * Installs agentic development configuration into your project.
 *
 * Usage:
 *   npx agentic-dev-starter
 *   bunx agentic-dev-starter
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  gray: '\x1b[90m',
  red: '\x1b[31m',
  magenta: '\x1b[35m'
};

const log = {
  info: (msg) => console.log(`${colors.cyan}${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}   ✓ ${msg}${colors.reset}`),
  skip: (msg) => console.log(`${colors.yellow}   ○ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}   ! ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}   ✗ ${msg}${colors.reset}`),
  section: (msg) => console.log(`\n${colors.bold}${msg}${colors.reset}`),
  dim: (msg) => console.log(`${colors.gray}   ${msg}${colors.reset}`)
};

// Provider configurations
const PROVIDERS = {
  cursor: {
    name: 'Cursor',
    dir: '.cursor/rules',
    description: 'AI-powered IDE with rules system'
  },
  claude: {
    name: 'Claude Code',
    dir: '.claude',
    description: 'Anthropic Claude CLI agent'
  },
  copilot: {
    name: 'GitHub Copilot',
    dir: '.github',
    description: 'GitHub Copilot Chat instructions'
  },
  cline: {
    name: 'Cline',
    dir: '.clinerules',
    description: 'VS Code extension with rules'
  },
  windsurf: {
    name: 'Windsurf',
    dir: '.windsurf/rules',
    description: 'Codeium Cascade agent'
  },
  trae: {
    name: 'Trae',
    dir: '.trae',
    description: 'ByteDance AI coding assistant'
  },
  kiro: {
    name: 'Kiro',
    dir: '.kiro/agents',
    description: 'AWS AI coding IDE'
  },
  droid: {
    name: 'Factory Droid',
    dir: '.factory/droids',
    description: 'Factory.ai coding agent'
  },
  gemini: {
    name: 'Gemini CLI',
    dir: '.gemini',
    description: 'Google Gemini command-line tool'
  },
  antigravity: {
    name: 'Antigravity',
    dir: '.agent/workflows',
    native: true,  // Antigravity reads directly from .agent/, no sync needed
    description: 'Google Antigravity AI IDE'
  },
  opencode: {
    name: 'OpenCode',
    dir: '.opencode',
    description: 'Open-source AI coding tool'
  }
};

// File conflict options
const CONFLICT_OPTIONS = {
  SKIP: 'skip',
  MERGE: 'merge',
  OVERWRITE: 'overwrite',
  BACKUP: 'backup'
};

// Get template directory (where this package is installed)
function getTemplateDir() {
  // When running via npx, __dirname is the package location
  return path.join(__dirname);
}

// Target directory (user's project)
const TARGET_DIR = process.cwd();
const TEMPLATE_DIR = getTemplateDir();

// Create readline interface
function createRL() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

// Ask a question
async function ask(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

// Multi-select providers
async function selectProviders(rl) {
  const providerIds = Object.keys(PROVIDERS);
  const selected = new Set();

  console.log('\n' + colors.bold + '📦 Which AI coding tools do you use?' + colors.reset);
  console.log(colors.gray + '   Enter numbers separated by commas, or "a" for all\n' + colors.reset);

  providerIds.forEach((id, i) => {
    const p = PROVIDERS[id];
    console.log(`   ${colors.cyan}${i + 1}.${colors.reset} ${p.name} ${colors.gray}(${p.description})${colors.reset}`);
  });
  console.log(`   ${colors.cyan}a.${colors.reset} All providers`);

  const answer = await ask(rl, '\n   Your selection: ');

  if (answer.toLowerCase() === 'a') {
    return providerIds;
  }

  const nums = answer.split(',').map(s => parseInt(s.trim(), 10));
  nums.forEach(n => {
    if (n >= 1 && n <= providerIds.length) {
      selected.add(providerIds[n - 1]);
    }
  });

  return Array.from(selected);
}

// Handle file conflict
async function handleConflict(rl, filePath, defaultChoice = null) {
  const relativePath = path.relative(TARGET_DIR, filePath);

  console.log(`\n${colors.yellow}   ⚠ File exists: ${relativePath}${colors.reset}`);
  console.log('   What would you like to do?');
  console.log(`   ${colors.cyan}1.${colors.reset} Skip (keep existing)`);
  console.log(`   ${colors.cyan}2.${colors.reset} Merge (prepend our rules)`);
  console.log(`   ${colors.cyan}3.${colors.reset} Overwrite`);
  console.log(`   ${colors.cyan}4.${colors.reset} Backup (rename existing to .backup)`);

  const answer = await ask(rl, '   Your choice [1]: ');

  switch (answer.trim()) {
    case '2': return CONFLICT_OPTIONS.MERGE;
    case '3': return CONFLICT_OPTIONS.OVERWRITE;
    case '4': return CONFLICT_OPTIONS.BACKUP;
    default: return CONFLICT_OPTIONS.SKIP;
  }
}

// Ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Copy file with conflict handling
async function copyFile(rl, srcPath, destPath, globalChoice = null) {
  const relativeDest = path.relative(TARGET_DIR, destPath);

  if (!fs.existsSync(srcPath)) {
    log.error(`Template not found: ${path.relative(TEMPLATE_DIR, srcPath)}`);
    return globalChoice;
  }

  ensureDir(path.dirname(destPath));

  if (fs.existsSync(destPath)) {
    let choice = globalChoice;

    if (!choice) {
      choice = await handleConflict(rl, destPath);
    }

    switch (choice) {
      case CONFLICT_OPTIONS.SKIP:
        log.skip(`Skipped: ${relativeDest}`);
        return choice;

      case CONFLICT_OPTIONS.MERGE:
        const existing = fs.readFileSync(destPath, 'utf8');
        const template = fs.readFileSync(srcPath, 'utf8');
        const merged = template + '\n\n---\n\n# Your Existing Rules\n\n' + existing;
        fs.writeFileSync(destPath, merged);
        log.success(`Merged: ${relativeDest}`);
        return choice;

      case CONFLICT_OPTIONS.BACKUP:
        const backupPath = destPath + '.backup';
        fs.renameSync(destPath, backupPath);
        log.dim(`Backed up to: ${path.relative(TARGET_DIR, backupPath)}`);
        fs.copyFileSync(srcPath, destPath);
        log.success(`Created: ${relativeDest}`);
        return choice;

      case CONFLICT_OPTIONS.OVERWRITE:
        fs.copyFileSync(srcPath, destPath);
        log.success(`Overwritten: ${relativeDest}`);
        return choice;
    }
  } else {
    fs.copyFileSync(srcPath, destPath);
    log.success(`Created: ${relativeDest}`);
  }

  return globalChoice;
}

// Copy directory recursively
async function copyDir(rl, srcDir, destDir, globalChoice = null) {
  if (!fs.existsSync(srcDir)) {
    return globalChoice;
  }

  ensureDir(destDir);

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      globalChoice = await copyDir(rl, srcPath, destPath, globalChoice);
    } else {
      globalChoice = await copyFile(rl, srcPath, destPath, globalChoice);
    }
  }

  return globalChoice;
}

// Install for specific provider
async function installProvider(rl, providerId) {
  const config = PROVIDERS[providerId];
  if (!config) return;

  log.section(`📦 Installing ${config.name}...`);

  const srcDir = path.join(TEMPLATE_DIR, config.dir);
  const destDir = path.join(TARGET_DIR, config.dir);

  // Copy provider-specific directory
  if (fs.existsSync(srcDir)) {
    await copyDir(rl, srcDir, destDir);
  } else {
    // Generate from .agent source
    await generateProviderConfig(rl, providerId);
  }
}

// Generate provider config from .agent source
async function generateProviderConfig(rl, providerId) {
  const agentSrcDir = path.join(TEMPLATE_DIR, '.agent', 'agents');
  const commandSrcDir = path.join(TEMPLATE_DIR, '.agent', 'commands');
  const rulesSrcDir = path.join(TEMPLATE_DIR, '.agent', 'rules');
  const config = PROVIDERS[providerId];

  if (!fs.existsSync(agentSrcDir)) {
    log.warn(`Agent templates not found`);
    return;
  }

  const destDir = path.join(TARGET_DIR, config.dir);
  ensureDir(destDir);

  // Read agent files
  const agentFiles = fs.existsSync(agentSrcDir)
    ? fs.readdirSync(agentSrcDir).filter(f => f.endsWith('.md'))
    : [];
  const commandFiles = fs.existsSync(commandSrcDir)
    ? fs.readdirSync(commandSrcDir).filter(f => f.endsWith('.md'))
    : [];
  const rulesFiles = fs.existsSync(rulesSrcDir)
    ? fs.readdirSync(rulesSrcDir).filter(f => f.endsWith('.md')).sort()
    : [];

  // Helper to get combined rules content
  const getRulesContent = () => {
    if (rulesFiles.length === 0) return '';
    let content = '\n\n# Coding Rules\n\n';
    rulesFiles.forEach(f => {
      const ruleContent = fs.readFileSync(path.join(rulesSrcDir, f), 'utf8');
      const body = ruleContent.replace(/^---[\s\S]*?---\n/, '');
      content += body + '\n\n---\n\n';
    });
    return content;
  };

  switch (providerId) {
    case 'cursor':
      // Create rules.mdc from coding rules
      if (rulesFiles.length > 0) {
        let cursorRules = '---\ndescription: Coding rules and best practices\nalwaysApply: true\n---\n';
        cursorRules += getRulesContent();
        fs.writeFileSync(path.join(destDir, 'rules.mdc'), cursorRules);
        log.success(`Created: ${config.dir}/rules.mdc`);
      }

      // Create agents.mdc
      let cursorContent = '---\ndescription: AI agent definitions\nalwaysApply: false\n---\n\n# Agents\n\n';
      agentFiles.forEach(f => {
        const name = path.basename(f, '.md');
        const content = fs.readFileSync(path.join(agentSrcDir, f), 'utf8');
        const body = content.replace(/^---[\s\S]*?---\n/, '');
        cursorContent += `## @${name}\n\n**File:** \`.agent/agents/${name}.md\`\n\n${body}\n\n---\n\n`;
      });
      fs.writeFileSync(path.join(destDir, 'agents.mdc'), cursorContent);
      log.success(`Created: ${config.dir}/agents.mdc`);

      // Copy commands
      commandFiles.forEach(f => {
        const src = path.join(commandSrcDir, f);
        const dest = path.join(destDir, f.replace('.md', '.mdc'));
        fs.copyFileSync(src, dest);
        log.success(`Created: ${config.dir}/${path.basename(dest)}`);
      });
      break;

    case 'cline':
      // Create numbered files
      const agentsContent = fs.readFileSync(path.join(TEMPLATE_DIR, 'AGENTS.md'), 'utf8');
      fs.writeFileSync(path.join(destDir, '01-rules.md'), agentsContent);
      log.success(`Created: ${config.dir}/01-rules.md`);

      let agentRef = '# Agents\n\n';
      agentFiles.forEach(f => {
        const name = path.basename(f, '.md');
        agentRef += `## @${name}\n\n**Source:** \`.agent/agents/${name}.md\`\n\n`;
      });
      fs.writeFileSync(path.join(destDir, '02-agents.md'), agentRef);
      log.success(`Created: ${config.dir}/02-agents.md`);

      // Add coding rules
      if (rulesFiles.length > 0) {
        fs.writeFileSync(path.join(destDir, '03-coding-rules.md'), getRulesContent());
        log.success(`Created: ${config.dir}/03-coding-rules.md`);
      }
      break;

    case 'claude':
      // Create CLAUDE.md with rules
      let claudeContent = fs.readFileSync(path.join(TEMPLATE_DIR, 'AGENTS.md'), 'utf8');
      claudeContent += getRulesContent();
      fs.writeFileSync(path.join(TARGET_DIR, 'CLAUDE.md'), claudeContent);
      log.success(`Created: CLAUDE.md`);

      const settings = { permissions: { allow: ['Read', 'Write', 'Bash'], deny: [] } };
      fs.writeFileSync(path.join(destDir, 'settings.json'), JSON.stringify(settings, null, 2));
      log.success(`Created: ${config.dir}/settings.json`);
      break;

    case 'copilot':
      let copilotContent = fs.readFileSync(path.join(TEMPLATE_DIR, 'AGENTS.md'), 'utf8');
      copilotContent += getRulesContent();
      fs.writeFileSync(path.join(destDir, 'copilot-instructions.md'), copilotContent);
      log.success(`Created: ${config.dir}/copilot-instructions.md`);
      break;

    case 'windsurf':
      let windsurfContent = fs.readFileSync(path.join(TEMPLATE_DIR, 'AGENTS.md'), 'utf8');
      windsurfContent += '\n\n# Agents\n\n';
      agentFiles.forEach(f => {
        const name = path.basename(f, '.md');
        windsurfContent += `- **@${name}**: \`.agent/agents/${name}.md\`\n`;
      });
      windsurfContent += getRulesContent();
      fs.writeFileSync(path.join(destDir, 'rules.md'), windsurfContent);
      log.success(`Created: ${config.dir}/rules.md`);
      break;

    case 'trae':
      let traeContent = fs.readFileSync(path.join(TEMPLATE_DIR, 'AGENTS.md'), 'utf8');
      traeContent += getRulesContent();
      fs.writeFileSync(path.join(destDir, 'project_rules.md'), traeContent);
      log.success(`Created: ${config.dir}/project_rules.md`);
      break;

    case 'kiro':
      // Create a rules agent with coding rules
      if (rulesFiles.length > 0) {
        const rulesJson = { name: 'coding-rules', prompt: getRulesContent(), model: 'claude-sonnet-4', tools: ['read'] };
        fs.writeFileSync(path.join(destDir, 'coding-rules.json'), JSON.stringify(rulesJson, null, 2));
        log.success(`Created: ${config.dir}/coding-rules.json`);
      }
      agentFiles.forEach(f => {
        const name = path.basename(f, '.md');
        const content = fs.readFileSync(path.join(agentSrcDir, f), 'utf8');
        const body = content.replace(/^---[\s\S]*?---\n/, '');
        const json = { name, prompt: body, model: 'claude-sonnet-4', tools: ['read', 'write'] };
        fs.writeFileSync(path.join(destDir, `${name}.json`), JSON.stringify(json, null, 2));
        log.success(`Created: ${config.dir}/${name}.json`);
      });
      break;

    case 'droid':
    case 'opencode':
      // Copy agent files directly
      agentFiles.forEach(f => {
        fs.copyFileSync(path.join(agentSrcDir, f), path.join(destDir, f));
        log.success(`Created: ${config.dir}/${f}`);
      });
      // Copy rules files
      rulesFiles.forEach(f => {
        fs.copyFileSync(path.join(rulesSrcDir, f), path.join(destDir, f));
        log.success(`Created: ${config.dir}/${f}`);
      });
      break;

    case 'gemini':
      // Create .gemini/instructions.md with rules
      let geminiContent = fs.readFileSync(path.join(TEMPLATE_DIR, 'AGENTS.md'), 'utf8');
      geminiContent += getRulesContent();
      fs.writeFileSync(path.join(destDir, 'instructions.md'), geminiContent);
      log.success(`Created: ${config.dir}/instructions.md`);
      break;

    case 'antigravity':
      // Antigravity reads directly from .agent/ - no sync needed
      // Workflows: .agent/workflows/ (triggered via /command)
      // Rules: .agent/rules/ (passive, always active)
      log.skip('Antigravity uses .agent/ directly - no sync needed');
      break;
  }
}

// Main installation
async function main() {
  console.log('\n' + colors.bold + colors.magenta + '🚀 Agentic Dev Starter' + colors.reset);
  console.log(colors.gray + '   Universal AI coding assistant configuration\n' + colors.reset);

  const rl = createRL();

  try {
    // 1. Select providers
    const providers = await selectProviders(rl);

    if (providers.length === 0) {
      console.log('\n' + colors.yellow + '   No providers selected. Exiting.' + colors.reset + '\n');
      rl.close();
      return;
    }

    console.log(`\n${colors.gray}   Selected: ${providers.map(p => PROVIDERS[p].name).join(', ')}${colors.reset}`);

    // 2. Install .agent directory (source of truth)
    log.section('📁 Installing core files...');

    const agentSrc = path.join(TEMPLATE_DIR, '.agent');
    const agentDest = path.join(TARGET_DIR, '.agent');
    await copyDir(rl, agentSrc, agentDest);

    // 3. Install AGENTS.md
    await copyFile(rl,
      path.join(TEMPLATE_DIR, 'AGENTS.md'),
      path.join(TARGET_DIR, 'AGENTS.md')
    );

    // 4. Install provider-specific configs
    for (const providerId of providers) {
      await installProvider(rl, providerId);
    }

    // 5. Done!
    console.log('\n' + colors.green + colors.bold + '✨ Installation complete!' + colors.reset);
    console.log('\n' + colors.gray + '   Next steps:' + colors.reset);
    console.log('   1. Review and customize AGENTS.md for your project');
    console.log('   2. Check .agent/ for agent and command definitions');
    console.log('   3. Commit to version control\n');

  } catch (err) {
    log.error(err.message);
  } finally {
    rl.close();
  }
}

// Parse CLI args
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
${colors.bold}Agentic Dev Starter${colors.reset}

Usage:
  npx agentic-dev-starter     Interactive installation
  bunx agentic-dev-starter    Interactive installation

Options:
  --help, -h      Show this help
  --version, -v   Show version

Supported providers:
${Object.entries(PROVIDERS).map(([id, p]) => `  - ${p.name.padEnd(15)} (${id})`).join('\n')}
`);
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  const pkg = require('./package.json');
  console.log(pkg.version);
  process.exit(0);
}

main().catch(console.error);
