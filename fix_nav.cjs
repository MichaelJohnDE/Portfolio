const fs = require('fs');
const path = require('path');

const dir = 'h:/Dev Projects/Portfolio/src/pages';
const files = ['StMichaelDocs.jsx', 'PalihogDocs.jsx', 'FSUUDocs.jsx'];

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Add useState to import
    if (!content.includes('useState')) {
      content = content.replace("import React, { useEffect } from 'react';", "import React, { useEffect, useState } from 'react';");
    }

    // Add the scroll hook logic inside the component
    if (!content.includes('const [scrolled, setScrolled] = useState(false);')) {
      const hookString = `
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
`;
      // Find where to insert (after `const { theme, toggleTheme } = useTheme();`)
      content = content.replace("const { theme, toggleTheme } = useTheme();", "const { theme, toggleTheme } = useTheme();" + hookString);
    }

    // Replace the nav className
    content = content.replace(
      '<nav className="fixed top-0 w-full z-50 glass-header py-4 transition-all">',
      "<nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${scrolled ? 'bg-surface/80 glass-nav shadow-lg border-b border-outline-variant/20 py-3' : 'bg-transparent py-5'}`}>"
    );

    fs.writeFileSync(filePath, content);
  }
});

console.log('Navbars updated.');
