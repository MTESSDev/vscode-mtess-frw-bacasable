const chunks = [];
process.stdin.on('data', d => chunks.push(d));
process.stdin.on('end', () => {
  const data = JSON.parse(Buffer.concat(chunks));
  const fp = data.tool_input?.file_path || '';

  if (!fp.endsWith('.form.yml')) return;

  const old_string = data.tool_input?.old_string || '';
  const content = require('fs').readFileSync(fp, 'utf8');

  // old_string est garanti unique par l'outil Edit — position exacte assurée
  const idx = content.indexOf(old_string);
  const line = idx === -1 ? 1 : content.slice(0, idx).split('\n').length;

  require('fs').writeFileSync('.claude/.frw-line', String(line));
});
