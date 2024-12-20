import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  return (
    <div className="w-full gradient-bg min-h-screen">
      <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold text-center mb-8 text-purple-800"
      >
        Welcome to MatrixCryptAI
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-xl text-center mb-12 text-gray-700"
      >
        Explore the fascinating world of cryptography using matrix operations!
      </motion.p>
      <div className="flex justify-center">
        <FeatureCard
          title="Encrypt/Decrypt"
          description="Secure your messages using matrix operations and retrieve them with matrix inverses."
          icon={<Lock className="w-12 h-12" />}
          color="bg-gradient-to-r from-purple-100 to-blue-100"
          onClick={() => setCurrentPage('encryptdecrypt')}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-16 text-center"
      >
        <h2 className="text-3xl font-semibold mb-4 text-purple-800">How It Works</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          MatrixCryptAI uses advanced matrix operations to encrypt and decrypt your messages.
          Our system is inspired by the Hill Cipher technique, which provides a unique approach to text encryption.
        </p>
        <div className="mt-8 space-y-4">
          <Step number={1} description="Convert your message to numbers" />
          <Step number={2} description="Apply matrix multiplication for encryption" />
          <Step number={3} description="Use matrix inversion for decryption" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-16 text-center"
      >
        <h2 className="text-3xl font-semibold mb-4 text-purple-800">Ready to Get Started?</h2>
        <p className="text-lg text-gray-700 mb-8">
          Dive into the world of matrix-based cryptography and see how it works!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
          onClick={() => setCurrentPage('encryptdecrypt')}
        >
          Get Started
        </motion.button>
      </motion.div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, color, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${color} rounded-lg shadow-lg p-6 text-center cursor-pointer max-w-md w-full`}
      onClick={onClick}
    >
      <div className="flex justify-center mb-4 text-purple-600">{icon}</div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};

interface StepProps {
  number: number;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, description }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
        {number}
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default Home;

