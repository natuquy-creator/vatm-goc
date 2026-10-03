const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const www = path.join(root, 'www');

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const s = path.join(src, name);
    const d = path.join(dest, name);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

['index.html', 'manifest.json', 'sw.js'].forEach((f) => {
  const s = path.join(root, f);
  if (fs.existsSync(s)) copyFile(s, path.join(www, f));
});
copyDir(path.join(root, 'icons'), path.join(www, 'icons'));
console.log('OK: đã đồng bộ index.html + icons (logo VATM) + manifest + sw → www/');
