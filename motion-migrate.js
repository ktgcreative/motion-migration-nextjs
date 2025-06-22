/**
 * Migrates framer-motion imports to motion/react
 * 
 * Usage:
 *   node motion-migrate.js        # run migration
 *   node motion-migrate.js --dry  # preview changes
 */

const fs = require('fs');
const path = require('path');

// Check if dry run mode
const DRY = process.argv.includes('--dry');

// File extensions to process
const EXTS = ['.js', '.jsx', '.ts', '.tsx'];

// Directories to skip
const SKIP_DIRS = new Set(['node_modules', '.next', 'dist', '.git']);

// Migration rules
const RULES = [
    {
        re: /import\s*{\s*([^}]+)\s*}\s*from\s*['"]framer-motion['"]/g,
        sub: 'import { $1 } from \'motion/react\''
    },
    {
        re: /import\s+\*\s+as\s+(\w+)\s+from\s*['"]framer-motion['"]/g,
        sub: 'import * as $1 from \'motion/react\''
    },
    {
        re: /import\s+(\w+)\s+from\s*['"]framer-motion['"]/g,
        sub: 'import $1 from \'motion/react\''
    }
];

function isTargetFile(file) {
    return EXTS.includes(path.extname(file));
}

function walk(dir, files = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            if (!SKIP_DIRS.has(entry.name)) {
                walk(path.join(dir, entry.name), files);
            }
        } else if (entry.isFile() && isTargetFile(entry.name)) {
            files.push(path.join(dir, entry.name));
        }
    }
    return files;
}

// Main execution
console.log(DRY ? '🔍 Previewing changes...' : '🔍 Scanning and migrating...');

const allFiles = walk(process.cwd());
let changed = 0;

allFiles.forEach(file => {
    let src = fs.readFileSync(file, 'utf8');
    let hit = false;

    RULES.forEach(({ re, sub }) => {
        if (re.test(src)) {
            src = src.replace(re, sub);
            hit = true;
        }
    });

    if (hit) {
        if (DRY) {
            console.log(`📝 Would update: ${file}`);
        } else {
            fs.writeFileSync(file, src);
            console.log(`✅ Updated: ${file}`);
        }
        changed++;
    }
});

console.log(DRY
    ? `\n💡 Dry run complete - ${changed} file(s) would be updated.`
    : `\n🎉 Migration complete - ${changed} file(s) updated!`
);
