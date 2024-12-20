import React from 'react';
import { FaInstagram, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <p>&copy; 2024 MatrixCryptAI. All rights reserved. Developed by Nirupam Thapa a.k.a kuoki</p>
        <div className="flex space-x-4">
          <a
            href="https://instagram.com/_kuoki/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://github.com/kuokiii"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

