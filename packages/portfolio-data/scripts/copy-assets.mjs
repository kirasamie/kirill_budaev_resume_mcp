import { cpSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

const sourceDir = 'src/assets';
const targetDir = 'dist/assets';

mkdirSync(targetDir, { recursive: true });

for (const fileName of readdirSync(sourceDir)) {
  if (fileName.endsWith('.json') || fileName.endsWith('.md')) {
    cpSync(join(sourceDir, fileName), join(targetDir, fileName));
  }
}
