# Framer Motion to Motion Migration Tool

A simple, automated migration script I created to upgrade projects from `framer-motion` to the new `motion` package.

## My Problem

When I was excited to upgrade to Motion (the successor to Framer Motion), I quickly realized the official documentation was seriously missing migration tooling. I had used framer-motion in a lot of different places across my projects, and manually updating imports in dozens of files seemed like a nightmare.

After struggling with this across several of my Node.js projects, I decided to write a script to automate the process.

## My Solution

This script automatically scans your project and converts all `framer-motion` imports to `motion/react` imports. I've tested it on several of my projects and it handles various import patterns:

- Named imports: `import { motion, AnimatePresence } from 'framer-motion'`
- Namespace imports: `import * as FramerMotion from 'framer-motion'`
- Default imports: `import motion from 'framer-motion'`

## Installation & Usage

### Prerequisites

First, update your package.json dependencies:
```bash
npm uninstall framer-motion
npm install motion
```

### Running the Migration

1. **Download the script** to your project root:
   ```bash
   curl -O https://raw.githubusercontent.com/yourusername/motion-migration-nextjs/main/motion-migrate.js
   ```

2. **Preview changes** (I always recommend this first):
   ```bash
   node motion-migrate.js --dry
   ```

3. **Run the migration**:
   ```bash
   node motion-migrate.js
   ```

4. **Clean up** (optional):
   ```bash
   rm motion-migrate.js
   ```

## What It Does

### Files Processed
- `.js`, `.jsx`, `.ts`, `.tsx` files
- Recursively scans your entire project
- Skips `node_modules`, `.next`, `dist`, `.git` directories

### Import Transformations

| Before | After |
|--------|--------|
| `import { motion } from 'framer-motion'` | `import { motion } from 'motion/react'` |
| `import * as Motion from 'framer-motion'` | `import * as Motion from 'motion/react'` |
| `import motion from 'framer-motion'` | `import motion from 'motion/react'` |

### Example Output

**Dry run mode:**
```
🔍 Previewing changes...
📝 Would update: src/components/Header.tsx
📝 Would update: src/pages/index.tsx
📝 Would update: src/components/Modal.jsx

💡 Dry run complete - 3 file(s) would be updated.
```

**Migration mode:**
```
🔍 Scanning and migrating...
✅ Updated: src/components/Header.tsx
✅ Updated: src/pages/index.tsx
✅ Updated: src/components/Modal.jsx

🎉 Migration complete - 3 file(s) updated!
```

## Safety Features

I built in several safety features based on my experience:

- **Dry run mode**: Always preview changes before applying them
- **Targeted processing**: Only processes relevant file types
- **Directory filtering**: Automatically skips common build/dependency directories
- **Backup recommended**: Always commit your changes before running any migration script

## Why I'm Sharing This

I felt like the Motion package website and documentation was seriously missing out on providing migration tooling. Since I had to solve this problem for my own projects, I figured other developers might benefit from this simple script.

## Contributing

Found an edge case or have suggestions? Please open an issue or submit a pull request!

## License

MIT License - feel free to use this in your projects. 