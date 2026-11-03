// Lists public/assets/culturals into src/data/culturals.json so the gallery picks up new photos
// automatically. Runs before `npm run dev` and `npm run build` (see package.json).
import { readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'public', 'assets', 'culturals');
const out = join(root, 'src', 'data', 'culturals.json');

const files = existsSync(dir)
  ? readdirSync(dir).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort()
  : [];

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(files.map((f) => `/assets/culturals/${f}`), null, 2) + '\n');
console.log(`culturals: ${files.length} photos listed`);
