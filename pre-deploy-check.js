#!/usr/bin/env node

/**
 * Pre-Deployment Verification Script
 * Run this before deploying to catch common configuration issues
 * 
 * Usage: node pre-deploy-check.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.blue}━━━ ${msg} ━━━${colors.reset}\n`),
};

let issuesFound = 0;
let warningsFound = 0;

// Check if file exists
const checkFile = (filePath, required = true) => {
  const exists = fs.existsSync(path.join(__dirname, filePath));
  if (exists) {
    log.success(`Found: ${filePath}`);
    return true;
  } else {
    if (required) {
      log.error(`Missing: ${filePath}`);
      issuesFound++;
    } else {
      log.warning(`Optional file missing: ${filePath}`);
      warningsFound++;
    }
    return false;
  }
};

// Check package.json for required dependencies
const checkDependencies = (packagePath, requiredDeps) => {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, packagePath), 'utf8'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    
    let missing = [];
    for (const dep of requiredDeps) {
      if (!deps[dep]) {
        missing.push(dep);
      }
    }
    
    if (missing.length === 0) {
      log.success(`All required dependencies present in ${packagePath}`);
      return true;
    } else {
      log.error(`Missing dependencies in ${packagePath}: ${missing.join(', ')}`);
      issuesFound++;
      return false;
    }
  } catch (error) {
    log.error(`Could not read ${packagePath}: ${error.message}`);
    issuesFound++;
    return false;
  }
};

// Check if .env.example has required variables
const checkEnvExample = (envPath, requiredVars) => {
  try {
    const content = fs.readFileSync(path.join(__dirname, envPath), 'utf8');
    let missing = [];
    
    for (const varName of requiredVars) {
      if (!content.includes(varName)) {
        missing.push(varName);
      }
    }
    
    if (missing.length === 0) {
      log.success(`All required variables in ${envPath}`);
      return true;
    } else {
      log.error(`Missing variables in ${envPath}: ${missing.join(', ')}`);
      issuesFound++;
      return false;
    }
  } catch (error) {
    log.error(`Could not read ${envPath}: ${error.message}`);
    issuesFound++;
    return false;
  }
};

// Main checks
const runChecks = () => {
  console.log(`${colors.cyan}
╔════════════════════════════════════════════════╗
║   IPD SmartCare - Pre-Deployment Checker      ║
╚════════════════════════════════════════════════╝
${colors.reset}`);

  // Check Project Structure
  log.section('Project Structure');
  checkFile('backend/package.json');
  checkFile('backend/server.js');
  checkFile('backend/app.js');
  checkFile('frontend/package.json');
  checkFile('frontend/index.html');
  checkFile('frontend/vite.config.js');
  checkFile('NLP_Model/nlp_model/web-app/app.py');
  checkFile('NLP_Model/nlp_model/web-app/requirements-minimal.txt');

  // Check Configuration Files
  log.section('Configuration Files');
  checkFile('backend/.env.example');
  checkFile('frontend/.env.example');
  checkFile('frontend/vercel.json');
  checkFile('.gitignore');
  
  // Check if .env files exist (warning only)
  log.info('Checking for .env files (should NOT be committed to Git):');
  if (fs.existsSync(path.join(__dirname, 'backend/.env'))) {
    log.warning('backend/.env exists - Make sure it\'s in .gitignore!');
  }
  if (fs.existsSync(path.join(__dirname, 'frontend/.env.local'))) {
    log.warning('frontend/.env.local exists - Make sure it\'s in .gitignore!');
  }

  // Check Documentation
  log.section('Documentation');
  checkFile('README.md');
  checkFile('DEPLOYMENT_GUIDE.md');
  checkFile('QUICK_REFERENCE.md');
  checkFile('DEPLOYMENT_CHECKLIST.md');
  checkFile('LOCAL_SETUP.md');

  // Check Backend Dependencies
  log.section('Backend Dependencies');
  checkDependencies('backend/package.json', [
    'express',
    'mongoose',
    'cors',
    'dotenv',
    'jsonwebtoken',
    'bcryptjs',
    'multer',
    'nodemailer',
  ]);

  // Check Frontend Dependencies
  log.section('Frontend Dependencies');
  checkDependencies('frontend/package.json', [
    'react',
    'react-dom',
    'react-router-dom',
    'axios',
  ]);

  // Check Environment Variables
  log.section('Environment Variables');
  checkEnvExample('backend/.env.example', [
    'MONGO_URI',
    'JWT_SECRET',
    'MASTER_KEY',
    'EMAIL_USER',
    'EMAIL_PASS',
    'NLP_SUMMARY_URL',
    'FRONTEND_URL',
  ]);
  
  checkEnvExample('frontend/.env.example', [
    'VITE_API_BASE',
  ]);

  // Check Git
  log.section('Git Setup');
  if (fs.existsSync(path.join(__dirname, '.git'))) {
    log.success('Git repository initialized');
  } else {
    log.warning('Git not initialized - Run: git init');
    warningsFound++;
  }

  // Check .gitignore includes sensitive files
  try {
    const gitignore = fs.readFileSync(path.join(__dirname, '.gitignore'), 'utf8');
    if (gitignore.includes('.env') && gitignore.includes('node_modules')) {
      log.success('.gitignore includes sensitive files');
    } else {
      log.error('.gitignore missing important entries (.env, node_modules)');
      issuesFound++;
    }
  } catch (error) {
    log.error('Could not verify .gitignore');
    issuesFound++;
  }

  // Final Summary
  log.section('Summary');
  
  if (issuesFound === 0 && warningsFound === 0) {
    console.log(`${colors.green}
✅ All checks passed! Your project is ready for deployment.

Next steps:
1. Review DEPLOYMENT_GUIDE.md
2. Push code to GitHub
3. Deploy to Vercel and Render
${colors.reset}`);
  } else if (issuesFound === 0) {
    console.log(`${colors.yellow}
✓ No critical issues found, but ${warningsFound} warning(s) detected.
Review the warnings above and fix if necessary.

You can proceed with deployment, but check warnings first.
${colors.reset}`);
  } else {
    console.log(`${colors.red}
✗ Found ${issuesFound} issue(s) and ${warningsFound} warning(s).
Please fix the errors above before deploying.

Common fixes:
- Ensure all required files exist
- Run 'npm install' in backend and frontend
- Copy .env.example files and configure them
- Initialize git repository if needed
${colors.reset}`);
    process.exit(1);
  }
};

// Run the checks
runChecks();
