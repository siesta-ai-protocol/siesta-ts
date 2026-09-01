#!/usr/bin/env node
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SiestaKernel } from './kernel.js';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const command = process.argv[2] ?? 'discover';
const kernel = SiestaKernel.discover(projectRoot);

if (command === 'discover') {
  console.log(JSON.stringify(kernel.handle('siesta.discover', {}), null, 2));
} else if (command === 'validate') {
  const result = kernel.handle('siesta.validate', {});
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.valid ? 0 : 1);
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
