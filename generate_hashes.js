const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cheerio = require('cheerio'); // Install with: npm install cheerio

const jsBaseDir = path.join(__dirname, 'out/_next/static');
const htmlBaseDir = path.join(__dirname, 'out');

// Step 1: Get all JS files and generate hashes
function getAllJsFiles(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllJsFiles(filePath, files);
    } else if (file.endsWith('.js')) {
      files.push(filePath);
    }
  });
  return files;
}

const integrityMap = {};
const jsFiles = getAllJsFiles(jsBaseDir);

jsFiles.forEach(file => {
  const content = fs.readFileSync(file);
  const hash = crypto.createHash('sha384').update(content).digest('base64');
  const relativePath = path.relative(htmlBaseDir, file).replace(/\\/g, '/');
  integrityMap[`/${relativePath}`] = `sha384-${hash}`;
});

// Step 2: Inject integrity into <script> tags in HTML files
function getAllHtmlFiles(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, files);
    } else if (file.endsWith('.html')) {
      files.push(filePath);
    }
  });
  return files;
}

const htmlFiles = getAllHtmlFiles(htmlBaseDir);

htmlFiles.forEach(htmlFile => {
  const content = fs.readFileSync(htmlFile, 'utf-8');
  const $ = cheerio.load(content);

  $('script[src^="/_next/"]').each((_, el) => {
    const src = $(el).attr('src');
    if (integrityMap[src]) {
      $(el).attr('integrity', integrityMap[src]);
      $(el).attr('crossorigin', 'anonymous');
    }
  });

  fs.writeFileSync(htmlFile, $.html());
  console.log(`✅ Injected integrity into ${path.relative(htmlBaseDir, htmlFile)}`);
});
