import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8"
      >
        About MatrixCryptAI
      </motion.h1>
      <div className="max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg mb-4"
        >
          MatrixCryptAI is an educational project that demonstrates the use of matrix operations in cryptography. Our system is inspired by the Hill Cipher technique, which uses matrix multiplication to encrypt and decrypt messages.
        </motion.p>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-2xl font-semibold mb-4"
        >
          How It Works
        </motion.h2>
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="list-disc list-inside mb-4"
        >
          <li>Text is converted into numerical values</li>
          <li>Matrix operations are applied to encode and decode messages</li>
          <li>Modular arithmetic ensures numerical values remain within a manageable range</li>
        </motion.ul>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-lg mb-4"
        >
          While this system provides an interesting introduction to cryptographic concepts, it's important to note that the Hill Cipher is not considered secure for modern cryptographic applications due to its vulnerability to known-plaintext attacks.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-lg"
        >
          This project is intended for educational purposes only and should not be used for securing sensitive information.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-8"
        >
          <h3 className="text-xl font-semibold mb-4">Mathematical Background</h3>
          <p className="text-lg mb-4">
            The Hill Cipher uses linear algebra to encrypt and decrypt messages. Here's a brief overview of the mathematical concepts involved:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Matrix multiplication</li>
            <li>Modular arithmetic</li>
            <li>Matrix inverses</li>
            <li>Determinants</li>
          </ul>
          <p className="text-lg">
            For more information on these concepts, we recommend exploring linear algebra resources and cryptography textbooks.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

