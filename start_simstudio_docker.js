#!/usr/bin/env node
const {spawnSync, execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const simDir = path.join(__dirname, 'apps', 'sim');
const envPath = path.join(simDir, '.env');

function showHelp() {
  console.log(`Usage: node start_simstudio_docker.js [--local]\n` +
    `  --local   Use local LLM configuration (Ollama)\n`);
}

const args = process.argv.slice(2);
if (args.includes('-h') || args.includes('--help')) {
  showHelp();
  process.exit(0);
}
const useLocal = args.includes('--local');

if (!fs.existsSync(envPath)) {
  fs.copyFileSync(path.join(simDir, '.env.example'), envPath);
  console.log('Created .env from .env.example. Please review the file.');
} else {
  console.log('.env file found.');
}

function hasGpu() {
  try {
    execSync('nvidia-smi', {stdio: 'ignore'});
    return true;
  } catch {
    return false;
  }
}

const composeArgs = ['compose'];
if (useLocal) {
  composeArgs.push('--profile', hasGpu() ? 'local-gpu' : 'local-cpu');
}
composeArgs.push('up', '--build', '-d');
console.log(`Running: docker ${composeArgs.join(' ')}`);
spawnSync('docker', composeArgs, {stdio: 'inherit'});

console.log('Waiting for database to be ready...');
spawnSync(process.platform === 'win32' ? 'timeout' : 'sleep', ['5'], {stdio: 'inherit'});

console.log('Applying database migrations...');
spawnSync('docker', ['compose', 'exec', 'simstudio', 'bash', '-c', 'cd apps/sim && bun run db:push'], {stdio: 'inherit'});

console.log('Sim Studio is now running at http://localhost:3000');
console.log('To view logs, run: docker compose logs -f simstudio');

