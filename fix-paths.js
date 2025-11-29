#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const assetsDir = path.join(distDir, 'assets');

// Find the JavaScript bundle
const jsFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));

if (jsFiles.length === 0) {
  console.error('No JavaScript files found in dist/assets/');
  process.exit(1);
}

const jsFile = path.join(assetsDir, jsFiles[0]);
let content = fs.readFileSync(jsFile, 'utf8');

// Replace absolute paths with GitHub Pages base path
// Pattern: "/tilesets/..." -> "/christmas-pubs-rpg/tilesets/..."
// Pattern: "/player/..." -> "/christmas-pubs-rpg/player/..."
// Pattern: "/maps/..." -> "/christmas-pubs-rpg/maps/..."
// Pattern: "/songs/..." -> "/christmas-pubs-rpg/songs/..."

const basePath = '/christmas-pubs-rpg';

// Fix paths for various asset types
content = content.replace(/"\/(tilesets\/[^"]+)"/g, `"${basePath}/$1"`);
content = content.replace(/"\/(player\/[^"]+)"/g, `"${basePath}/$1"`);
content = content.replace(/"\/(maps\/[^"]+)"/g, `"${basePath}/$1"`);
content = content.replace(/"\/(songs\/[^"]+)"/g, `"${basePath}/$1"`);

// Also handle single quotes
content = content.replace(/'\/(tilesets\/[^']+)'/g, `'${basePath}/$1'`);
content = content.replace(/'\/(player\/[^']+)'/g, `'${basePath}/$1'`);
content = content.replace(/'\/(maps\/[^']+)'/g, `'${basePath}/$1'`);
content = content.replace(/'\/(songs\/[^']+)'/g, `'${basePath}/$1'`);

fs.writeFileSync(jsFile, content, 'utf8');
console.log(`Fixed paths in ${jsFiles[0]}`);


