const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getFiles(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules' || item === '.git' || item === '.next') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      getFiles(full, list);
    } else {
      list.push(full);
    }
  }
  return list;
}

const all = getFiles('.');
const imgExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
const codeExts = ['.ts', '.tsx', '.js', '.jsx', '.json', '.php', '.css', '.html', '.md', '.sql'];

const images = all.filter(f => imgExts.includes(path.extname(f).toLowerCase()));
const codeFiles = all.filter(f => codeExts.includes(path.extname(f).toLowerCase()));

console.log('Total images:', images.length);
console.log('Total text/data files scanned:', codeFiles.length);

const scannedData = codeFiles.map(f => ({
  path: f.replace(/\\/g, '/'),
  content: fs.readFileSync(f, 'utf8')
}));

const report = [];

images.forEach(img => {
  const norm = img.replace(/\\/g, '/');
  const base = path.basename(norm);
  const size = fs.statSync(img).size;
  const buf = fs.readFileSync(img);
  const hash = crypto.createHash('md5').update(buf).digest('hex');

  // Find all files that mention the base name or full relative path
  const matches = scannedData.filter(c => {
    // Exclude self if script or image
    if (c.path === 'scripts/check_images.js') return false;
    return c.content.includes(base) || c.content.includes(norm) || (norm.startsWith('public/') && c.content.includes(norm.replace('public/', '/')));
  });

  report.push({
    path: norm,
    size,
    sizeMB: (size / (1024 * 1024)).toFixed(2),
    sizeKB: (size / 1024).toFixed(1),
    hash,
    base,
    matchCount: matches.length,
    matches: matches.map(m => m.path)
  });
});

console.log('\n--- IMAGES WITH EXACT MATCHES IN CODE/DATA ---');
const used = report.filter(r => r.matchCount > 0);
console.log('Used count:', used.length);

console.log('\n--- IMAGES WITH ZERO REFERENCES ANYWHERE ---');
const unused = report.filter(r => r.matchCount === 0);
console.log('Unused count:', unused.length);
console.log('Total unused size (MB):', (unused.reduce((s, r) => s + r.size, 0) / (1024 * 1024)).toFixed(2));

console.log('\nUnused images breakdown:');
unused.forEach(u => {
  console.log(`[${u.sizeKB} KB] ${u.path}`);
});
