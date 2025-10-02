const fs = require('fs'); const path = require('path');
const banned = /\bblood\b(?!\s*orange)/i;
const files = [];
(function walk(d){ for (const f of fs.readdirSync(d)) {
  const p = path.join(d,f); const s = fs.statSync(p);
  if (s.isDirectory()) walk(p);
  else if (/\.(ts|tsx|css|md|json)$/.test(f)) files.push(p);
}})('app');

const bad = [];
for (const f of files) {
  const t = fs.readFileSync(f,'utf8');
  if (banned.test(t)) bad.push(f);
}
if (bad.length) {
  console.error('❌ Use "Blood Orange Refresher"—never plain "blood". Fix:\n' + bad.join('\n'));
  process.exit(1);
} else {
  console.log('✅ No banned words found');
}
