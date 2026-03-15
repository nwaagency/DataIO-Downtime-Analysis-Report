const fs = require('fs');
const path = require('path');

// Define the directory structure
const directories = [
  'src',
  'src/css',
  'src/js'
];

// Define the files and optional initial boilerplate content
const files = {
  'src/css/variables.css': '/* Core CSS variables (colors, spacing, fonts) */\n',
  'src/css/layout.css': '/* Grid and structural styles */\n',
  'src/css/components.css': '/* Reusable UI component styles */\n',
  'src/js/main.js': '// Entry point and global logic\n',
  'src/js/animations.js': '// IntersectionObserver and scroll logic\n',
  'src/js/form.js': '// Web3Forms submission handling\n',
  'src/index.html': '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Home</title>\n</head>\n<body>\n\n</body>\n</html>',
  'src/services.html': '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Services</title>\n</head>\n<body>\n\n</body>\n</html>',
  'src/projects.html': '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Projects</title>\n</head>\n<body>\n\n</body>\n</html>',
  'src/about.html': '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>About</title>\n</head>\n<body>\n\n</body>\n</html>',
  'src/contact.html': '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Contact</title>\n</head>\n<body>\n\n</body>\n</html>',
  'netlify.toml': '[build]\n  publish = "dist"\n  command = "npm run build"\n\n[[redirects]]\n  from = "/*"\n  to = "/index.html"\n  status = 200\n'
};

console.log('Initializing project structure...');

// Create directories
directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
});

// Create files
Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content);
    console.log(`Created file: ${filePath}`);
  } else {
    console.log(`File already exists (skipped): ${filePath}`);
  }
});

console.log('\nSetup complete! You can now start building your vanilla stack.');