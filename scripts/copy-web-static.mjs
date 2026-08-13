import { cp, mkdir, rm } from 'fs/promises';
import { join } from 'path';

const source = join(process.cwd(), 'apps/web/dist');
const target = join(process.cwd(), 'apps/api/static');

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });
