import React from 'react'

function Footer() {
  return (
    <footer className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} ReviCode. Built for competitive programmers.
    </footer>
  );
}

export default Footer;
