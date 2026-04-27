import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const localesDir = path.join(root, 'src', 'locales');
const enDir = path.join(localesDir, 'en');
const arDir = path.join(localesDir, 'ar');

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const flattenKeys = (value, prefix = '') => {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flattenKeys(item, `${prefix}[${index}]`));
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, nested]) => {
      const nextPrefix = prefix ? `${prefix}.${key}` : key;
      return flattenKeys(nested, nextPrefix);
    });
  }

  return [prefix];
};

const getSectionFiles = (dir) =>
  fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .sort();

const enFiles = getSectionFiles(enDir);
const arFiles = getSectionFiles(arDir);

const missingSectionsInAr = enFiles.filter((name) => !arFiles.includes(name));
const missingSectionsInEn = arFiles.filter((name) => !enFiles.includes(name));

const errors = [];

if (missingSectionsInAr.length > 0) {
  errors.push(`Missing sections in ar: ${missingSectionsInAr.join(', ')}`);
}

if (missingSectionsInEn.length > 0) {
  errors.push(`Missing sections in en: ${missingSectionsInEn.join(', ')}`);
}

for (const file of enFiles) {
  if (!arFiles.includes(file)) continue;

  const en = readJson(path.join(enDir, file));
  const ar = readJson(path.join(arDir, file));
  const enKeys = new Set(flattenKeys(en));
  const arKeys = new Set(flattenKeys(ar));

  const missingInAr = [...enKeys].filter((key) => !arKeys.has(key));
  const missingInEn = [...arKeys].filter((key) => !enKeys.has(key));

  if (missingInAr.length > 0) {
    errors.push(`${file}: keys missing in ar -> ${missingInAr.slice(0, 15).join(', ')}${missingInAr.length > 15 ? ' ...' : ''}`);
  }

  if (missingInEn.length > 0) {
    errors.push(`${file}: keys missing in en -> ${missingInEn.slice(0, 15).join(', ')}${missingInEn.length > 15 ? ' ...' : ''}`);
  }
}

if (errors.length > 0) {
  console.error('Locale structure check failed:\n');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('Locale structure check passed.');
