const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', 'product.html', 'about.html', 'terms.html', 'lookbook.html'];
const outputFile = 'i18n.js';

// Read current i18n.js to preserve existing translations for keys not found in HTML
let currentI18n = {};
try {
  const i18nContent = fs.readFileSync(outputFile, 'utf-8');
  const match = i18nContent.match(/const TRANSLATIONS = ({[\s\S]*?});/);
  if (match) {
    currentI18n = eval('(' + match[1] + ')');
  }
} catch (e) {}

const ru = {};
const en = {};

htmlFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf-8');

  // Find all elements with data-i18n
  const regex = /<[^>]+data-i18n="([^"]+)"[^>]*>([\s\S]*?)<\/[^>]+>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const key = match[1];
    if (key.startsWith('product_') && key.endsWith('_fullname')) continue; // skip product fullnames - handled via inline

    const fullTag = match[0];
    const isHtml = fullTag.includes('data-i18n-html="true"');

    // Extract inline English if present
    const enMatch = fullTag.match(/data-i18n-en='([^']*)'/);
    if (enMatch) en[key] = enMatch[1];

    // Extract Russian from inner content (decode HTML entities for text mode)
    let ruText = match[2].trim();

    // Find the element's direct content (handle nested tags properly)
    const innerMatch = fullTag.match(/data-i18n-html="true"/) ? ruText : ruText.replace(/<[^>]*>/g, '').trim();

    if (!ru[key] && ruText) {
      ru[key] = ruText;
    }
  }
});

// Merge with existing translations (HTML takes priority)
const mergedRu = { ...currentI18n.ru, ...ru };
const mergedEn = { ...currentI18n.en, ...en };

// Preserve keys from i18n.js that weren't found in HTML
Object.keys(currentI18n.ru || {}).forEach(k => {
  if (!mergedRu[k]) mergedRu[k] = currentI18n.ru[k];
});
Object.keys(currentI18n.en || {}).forEach(k => {
  if (!mergedEn[k]) mergedEn[k] = currentI18n.en[k];
});

// Read the current file to preserve LANGUAGES and engine code
const currentContent = fs.readFileSync(outputFile, 'utf-8');
const langMatch = currentContent.match(/const LANGUAGES = \[[\s\S]*?\];/);
const engineMatch = currentContent.match(/\/\/ ===== I18N Engine =====[\s\S]*/);

function serialize(obj) {
  const entries = Object.entries(obj).map(([k, v]) => {
    if (v.includes("'")) {
      return `    ${k}: "${v}"`;
    }
    return `    ${k}: '${v}'`;
  });
  return entries.join(',\n');
}

const newContent = `// ===== OVERDOSED Internationalization System =====

const LANGUAGES = [
  { code: 'ru', name: 'Русский', native: 'Русский' },
  { code: 'en', name: 'English', native: 'English' }
];

const TRANSLATIONS = {
  ru: {
${serialize(mergedRu)}
  },
  en: {
${serialize(mergedEn)}
  }
};

${engineMatch ? engineMatch[0] : ''}
`;

fs.writeFileSync(outputFile, newContent, 'utf-8');
console.log('i18n.js synced from HTML files.');
