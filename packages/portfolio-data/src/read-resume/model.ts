import { readFileSync } from 'fs';
import { join } from 'path';

import { RESUME_FILE_NAME, TEXT_ENCODING } from '../assets';

const assetsDir = join(__dirname, '../assets');

export const readResumeMarkdown = (): string =>
  readFileSync(join(assetsDir, RESUME_FILE_NAME), TEXT_ENCODING);
