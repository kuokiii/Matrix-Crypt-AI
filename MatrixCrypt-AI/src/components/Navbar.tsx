import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

interface NavbarProps {
  setCurrentPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentPage }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
          <Logo className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">MatrixCryptAI</span>
        </div>
        <div className="flex space-x-4">
          <NavLink onClick={() => setCurrentPage('encryptdecrypt')}>Encrypt/Decrypt</NavLink>
          <NavLink onClick={() => setCurrentPage('about')}>About</NavLink>
          <NavLink onClick={() => setCurrentPage('login')}>Login</NavLink>
          <NavLink onClick={() => setCurrentPage('register')}>Register</NavLink>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  onClick: () => void;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ onClick, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

export default Navbar;

