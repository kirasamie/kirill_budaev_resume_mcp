import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { tokens } from './tokens.ts';

const outFile = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/app/styles/theme.generated.css',
);

const css = [
  '/* AUTO-GENERATED — do not edit */',
  '@theme {',
  ...tokens.map(([name, value]) => `  ${name}: ${value};`),
  '}',
  '',
].join('\n');

writeFileSync(outFile, css, 'utf8');
console.log(`[tokens] wrote ${outFile}`);
