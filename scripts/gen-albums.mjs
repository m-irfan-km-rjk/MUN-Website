// Builds src/data/albums.json from the sub-folders of public/assets (one folder = one album).
// The "culturals" folder is skipped (it powers the Cultural Night section). Runs before dev/build.
//   albums = [{ id, title, year, cover, photos: [] }], newest first.
import { readdirSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const assets = join(root, 'public', 'assets');
const out = join(root, 'src', 'data', 'albums.json');
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;
const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
const toUrl = (folder, file) => `/assets/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;

// "2024" -> MUN 2024; "MUN 24" -> MUN 2024; "Intra MUN 25" -> Intra MUN 2025; "MUN 20 Training" -> MUN 2020 Training
function describe(folder) {
  const m = folder.match(/(?<!\d)(\d{4}|\d{2})(?!\d)/);
  const year = m ? (m[1].length === 2 ? 2000 + Number(m[1]) : Number(m[1])) : 0;
  let title = m ? folder.replace(m[1], String(year)) : folder;
  if (/^\d{4}$/.test(folder.trim())) title = `MUN ${folder.trim()}`;
  return { year, title: title.replace(/\s+/g, ' ').trim() };
}

const albums = [];
for (const entry of readdirSync(assets)) {
  if (entry.toLowerCase() === 'culturals') continue;
  const dir = join(assets, entry);
  if (!statSync(dir).isDirectory()) continue;
  const files = readdirSync(dir).filter((f) => IMAGE.test(f)).sort(natural);
  if (!files.length) continue;
  const coverFile = files.find((f) => /^cover\./i.test(f)) ?? files[0];
  const photos = files.map((f) => toUrl(entry, f));
  const { year, title } = describe(entry);
  albums.push({ id: entry.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), title, year, cover: toUrl(entry, coverFile), photos });
}

// Newest first; within a year the shorter (main) title first, so "MUN 2025" precedes "Intra MUN 2025".
albums.sort((a, b) => b.year - a.year || a.title.length - b.title.length || natural(a.title, b.title));

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(albums, null, 2) + '\n');
console.log(`albums: ${albums.map((a) => `${a.title} (${a.photos.length})`).join(', ')}`);

// Tiny blurred previews (data URLs) so photos fade in from a placeholder instead of popping in.
// src/data/blurs.json = { "<photo url>": "data:image/jpeg;base64,..." }. Skipped if sharp is unavailable.
const blurs = {};
try {
  const sharp = createRequire(import.meta.url)('sharp');
  for (const album of albums) {
    for (const url of album.photos) {
      const file = join(assets, ...decodeURIComponent(url.replace('/assets/', '')).split('/'));
      const buf = await sharp(file).rotate().resize(20).blur(1).jpeg({ quality: 40 }).toBuffer();
      blurs[url] = `data:image/jpeg;base64,${buf.toString('base64')}`;
    }
  }
} catch (e) {
  console.warn('albums: blur placeholders skipped (' + e.message + ')');
}
writeFileSync(join(root, 'src', 'data', 'blurs.json'), JSON.stringify(blurs) + '\n');
