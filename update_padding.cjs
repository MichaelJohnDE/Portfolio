const fs = require('fs');
const path = require('path');

const dir = 'h:/Dev Projects/Portfolio/src/components';
const files = [
  'Hero.jsx', 'Navbar.jsx', 'Skills.jsx', 'Projects.jsx', 
  'Experience.jsx', 'Contact.jsx', 'Certifications.jsx', 'Footer.jsx'
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/px-\[5%\] md:px-\[10%\] lg:px-\[15%\]/g, 'px-[5%] md:px-[6%] lg:px-[8%]');
    fs.writeFileSync(filePath, content);
  }
});

console.log('Padding updated successfully.');
