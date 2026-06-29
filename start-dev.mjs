import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const dir = dirname(fileURLToPath(import.meta.url));
process.chdir(dir);

const next = join(dir, 'node_modules', '.bin', 'next');
const child = spawn(next, ['dev'], { cwd: dir, stdio: 'inherit', env: { ...process.env, NODE_ENV: 'development' } });
child.on('exit', (code) => process.exit(code ?? 0));
