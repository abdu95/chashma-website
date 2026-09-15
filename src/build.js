const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SRC = __dirname;
const STATIC_FILES = ['style.css', 'script.js', 'robots.txt', 'sitemap.xml'];
const STATIC_DIRS = ['icons'];

function hashFile(p) {
  return crypto.createHash('md5').update(fs.readFileSync(p)).digest('hex').slice(0, 8);
}

function readJSON(p) {
  let raw;
  try {
    raw = fs.readFileSync(p, 'utf8');
  } catch (e) {
    throw new Error(`Cannot read content file: ${p}\n${e.message}`);
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`Invalid JSON in ${p}: ${e.message}`);
  }
}

function render(templatePath, content, label) {
  const template = fs.readFileSync(templatePath, 'utf8');
  return template.replace(/\{\{([A-Za-z0-9_]+)\}\}/g, (m, key) => {
    if (!(key in content)) {
      throw new Error(`Missing key "${key}" for ${label} (${templatePath})`);
    }
    return content[key];
  });
}

function tagSkeleton(html) {
  return (html.match(/<[a-zA-Z][a-zA-Z0-9]*/g) || []).join('\n');
}

function verifyLocalePages(pages) {
  const problems = [];

  for (const { label, html } of pages) {
    const leftoverPlaceholders = html.match(/\{\{[A-Za-z0-9_]+\}\}/g);
    if (leftoverPlaceholders) {
      problems.push(`${label}: unresolved placeholder(s) ${leftoverPlaceholders.join(', ')}`);
    }
    if (html.includes('href="#"')) {
      problems.push(`${label}: contains a dead href="#" link`);
    }
  }

  const skeletons = pages.map(p => tagSkeleton(p.html));
  const allMatch = skeletons.every(s => s === skeletons[0]);
  if (!allMatch) {
    problems.push(
      `Locale pages have drifted structurally (tag skeleton differs across ${pages.map(p => p.label).join(', ')}) — a template edit likely didn't apply the same way to every locale.`
    );
  }

  return problems;
}

function checkAssetsExist(distDir, html, label, problems) {
  const refs = [...html.matchAll(/(?:href|src)="\/([^"?]+)(?:\?[^"]*)?"/g)].map(m => m[1]);
  for (const ref of refs) {
    const basename = ref.split('/').pop();
    if (!basename || !basename.includes('.')) continue; // page route (e.g. "ru/"), not a static file
    const full = path.join(distDir, ref);
    if (!fs.existsSync(full)) {
      problems.push(`${label}: references missing local asset "/${ref}"`);
    }
  }
}

function copyStaticAssets(projectRoot, distDir) {
  for (const f of STATIC_FILES) {
    fs.copyFileSync(path.join(projectRoot, f), path.join(distDir, f));
  }
  for (const d of STATIC_DIRS) {
    fs.cpSync(path.join(projectRoot, d), path.join(distDir, d), { recursive: true });
  }
}

function build(projectRoot) {
  const distDir = path.join(projectRoot, 'dist');
  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(distDir, { recursive: true });
  copyStaticAssets(projectRoot, distDir);

  const cssVersion = hashFile(path.join(projectRoot, 'style.css'));
  const jsVersion = hashFile(path.join(projectRoot, 'script.js'));

  const localeOutputs = {
    en: path.join(distDir, 'index.html'),
    ru: path.join(distDir, 'ru', 'index.html'),
    uz: path.join(distDir, 'uz', 'index.html'),
  };

  const rendered = [];
  for (const [locale, outPath] of Object.entries(localeOutputs)) {
    const content = readJSON(path.join(SRC, 'content', `${locale}.json`));
    content.ASSET_CSS_VERSION = cssVersion;
    content.ASSET_JS_VERSION = jsVersion;
    const html = render(path.join(SRC, 'template.html'), content, `locale "${locale}"`);
    rendered.push({ label: locale, outPath, html });
  }

  const page404 = render(
    path.join(SRC, '404.html'),
    { ASSET_CSS_VERSION: cssVersion },
    '404 page'
  );
  const page404Out = { label: '404', outPath: path.join(distDir, '404.html'), html: page404 };

  const problems = verifyLocalePages(rendered);
  for (const p of [...rendered, page404Out]) {
    checkAssetsExist(distDir, p.html, p.label, problems);
  }

  if (problems.length) {
    console.error('Build verification failed:\n' + problems.map(p => `  - ${p}`).join('\n'));
    process.exit(1);
  }

  for (const { outPath, html, label } of [...rendered, page404Out]) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    console.log('Wrote', outPath, `(${label})`);
  }
  console.log('Build verification passed. Output in', distDir);
}

const target = process.argv[2];
if (!target) {
  console.error('Usage: node build.js <project-root>');
  process.exit(1);
}
build(path.resolve(target));
