const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..', '..'); // overridden below when copied into project
const SRC = __dirname;

function hashFile(p) {
  return crypto.createHash('md5').update(fs.readFileSync(p)).digest('hex').slice(0, 8);
}

function build(projectRoot) {
  const template = fs.readFileSync(path.join(SRC, 'template.html'), 'utf8');
  const cssVersion = hashFile(path.join(projectRoot, 'style.css'));
  const jsVersion = hashFile(path.join(projectRoot, 'script.js'));

  const outputs = {
    en: path.join(projectRoot, 'index.html'),
    ru: path.join(projectRoot, 'ru', 'index.html'),
    uz: path.join(projectRoot, 'uz', 'index.html'),
  };

  for (const [locale, outPath] of Object.entries(outputs)) {
    const contentPath = path.join(SRC, 'content', `${locale}.json`);
    const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    content.ASSET_CSS_VERSION = cssVersion;
    content.ASSET_JS_VERSION = jsVersion;

    const rendered = template.replace(/\{\{([A-Za-z0-9_]+)\}\}/g, (m, key) => {
      if (!(key in content)) {
        throw new Error(`Missing key "${key}" for locale "${locale}"`);
      }
      return content[key];
    });

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, rendered);
    console.log('Wrote', outPath);
  }
}

const target = process.argv[2];
if (!target) {
  console.error('Usage: node build.js <project-root>');
  process.exit(1);
}
build(path.resolve(target));
