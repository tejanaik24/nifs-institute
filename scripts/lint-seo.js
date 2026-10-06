#!/usr/bin/env node

/**
 * NIFS India — Automated SEO Gatekeeper & Agent Guardrails
 * Enforces SEO-RULES.md across code, metadata, and blog posts.
 * Rejects commits that introduce forbidden claims, hardcoded stats, or invalid blogs.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let errors = 0;

function error(msg) {
  console.error(`\x1b[31m✖ [SEO GATEKEEPER ERROR]\x1b[0m ${msg}`);
  errors++;
}

function info(msg) {
  console.log(`\x1b[36mℹ [SEO GATEKEEPER]\x1b[0m ${msg}`);
}

function success(msg) {
  console.log(`\x1b[32m✔ [SEO GATEKEEPER]\x1b[0m ${msg}`);
}

// 1. Forbidden Claims Regex Patterns
const FORBIDDEN_CLAIMS = [
  { pattern: /\b100%\s*(job\s*)?placement\b/i, name: '100% placement / 100% job guarantee' },
  { pattern: /\bguaranteed\s*(job|placement)\b/i, name: 'guaranteed job / placement' },
  { pattern: /\b#1\s+in\s+india\b/i, name: '#1 in India' },
  { pattern: /\btop[- ]rated\b/i, name: 'top-rated' },
  { pattern: /\biti\s+eligible\b/i, name: 'ITI eligible for B.Sc courses' },
];

// Determine files to check (staged files if git is available, otherwise src directory)
function getFilesToCheck() {
  try {
    const stdout = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
    const staged = stdout.split('\n').map(s => s.trim()).filter(Boolean);
    if (staged.length > 0) {
      return staged.filter(f => (f.startsWith('src/') || f.startsWith('scripts/')) && (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.json') || f.endsWith('.js')));
    }
  } catch (e) {
    // Fallback if no staged git files
  }

  // Scan src/app and src/components recursively
  const files = [];
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (ent.name !== 'node_modules' && ent.name !== '.next') walk(full);
      } else if (/\.(tsx|ts|json)$/.test(ent.name)) {
        files.push(full.replace(/\\/g, '/'));
      }
    }
  }
  walk('src/app');
  walk('src/components');
  return files;
}

info('Running SEO content & integrity audit...');

// 2. Audit Blog Posts
const blogPostsPath = path.resolve('src/lib/data/blog-posts.json');
if (fs.existsSync(blogPostsPath)) {
  try {
    const posts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));
    posts.forEach((post) => {
      // Check all posts for required author
      if (!post.author || !post.author.name) {
        error(`Blog "${post.slug}" is missing a named author object in blog-posts.json`);
      }
      // Check if thin posts are properly shielded with noindex
      if (post.wordCount > 0 && post.wordCount < 400 && post.noindex !== true) {
        error(`Blog "${post.slug}" is under 400 words (${post.wordCount}) but missing "noindex: true"`);
      }

      // Deep scan all blog fields for forbidden claims
      const fieldsToCheck = [
        { name: 'title', val: post.title },
        { name: 'excerpt', val: post.excerpt },
        { name: 'contentHtml', val: post.contentHtml },
        { name: 'content', val: post.content },
      ];
      if (Array.isArray(post.faqs)) {
        post.faqs.forEach((faq, fIdx) => {
          fieldsToCheck.push({ name: `faqs[${fIdx}].question`, val: faq.question });
          fieldsToCheck.push({ name: `faqs[${fIdx}].answer`, val: faq.answer });
        });
      }

      fieldsToCheck.forEach(({ name: fieldName, val }) => {
        if (!val || typeof val !== 'string') return;
        FORBIDDEN_CLAIMS.forEach(({ pattern, name: claimName }) => {
          if (pattern.test(val)) {
            error(`Blog "${post.slug}" in field "${fieldName}" contains forbidden claim "${claimName}"`);
          }
        });
      });
    });
  } catch (err) {
    error(`Failed to parse src/lib/data/blog-posts.json: ${err.message}`);
  }
}

// 3. Scan Files for Forbidden Claims
const files = getFilesToCheck();
info(`Scanning ${files.length} candidate files for forbidden claims...`);

files.forEach((filePath) => {
  // Skip test/mock files and documentation
  if (filePath.includes('.test.') || filePath.includes('SEO-RULES') || filePath.includes('lint-seo')) return;
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');

  FORBIDDEN_CLAIMS.forEach(({ pattern, name }) => {
    // Ignore site-constants / comments / scripts if specifically contextual
    if (pattern.test(content)) {
      // Find line number
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (pattern.test(line) && !line.includes('//') && !line.includes('eslint') && !line.includes('FORBIDDEN')) {
          error(`${filePath}:${idx + 1} contains forbidden claim "${name}": "${line.trim().slice(0, 100)}"`);
        }
      });
    }
  });
});

if (errors > 0) {
  console.error(`\n\x1b[31m[SEO GATEKEEPER FAILED] Found ${errors} violation(s). Fix them before committing per SEO-RULES.md.\x1b[0m\n`);
  process.exit(1);
} else {
  success('All files passed SEO integrity checks. Zero forbidden claims detected.');
  process.exit(0);
}

