const fs = require('fs');
const path = require('path');

const paths = [
  'h:/Dev Projects/Portfolio/src/components/Navbar.jsx',
  'h:/Dev Projects/Portfolio/src/pages/StMichaelDocs.jsx',
  'h:/Dev Projects/Portfolio/src/pages/PalihogDocs.jsx',
  'h:/Dev Projects/Portfolio/src/pages/FSUUDocs.jsx'
];

paths.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove the toggle buttons
    content = content.replace(/<button\s+onClick=\{toggleTheme\}[\s\S]*?<\/button>/g, '');
    
    // Remove the useTheme import and usage if it's no longer needed (which is true for Navbar and the subpages)
    // Actually, we don't need to strictly remove the unused import, but let's try to remove toggleTheme destructuring
    content = content.replace(/const { theme, toggleTheme } = useTheme\(\);?/g, 'const { theme } = useTheme();');
    content = content.replace(/const { theme, toggleTheme } = useTheme\(\)\n/g, 'const { theme } = useTheme();\n');
    
    fs.writeFileSync(filePath, content);
  }
});

console.log('Toggles removed.');
