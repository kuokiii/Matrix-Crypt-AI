import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { encrypt, generateKey, isValidKey } from '../utils/matrixCrypt';
import MessageHistory from '../components/MessageHistory';

const Encrypt: React.FC = () => {
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState<number[][]>([[6, 24], [1, 13]]);
  const [ciphertext, setCiphertext] = useState('');
  const [showSteps, setShowSteps] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<Array<{ type: 'encrypt' | 'decrypt', input: string, output: string, key: number[][] }>>([]);

  const handleEncrypt = () => {
    if (!isValidKey(key)) {
      setError('Invalid key. Please generate a new key.');
      return;
    }
    setError('');
    const encrypted = encrypt(plaintext, key);
    setCiphertext(encrypted);
    setMessages([...messages, { type: 'encrypt', input: plaintext, output: encrypted, key }]);
  };

  const handleGenerateKey = () => {
    const newKey = generateKey();
    setKey(newKey);
    setError('');
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-green-100 to-blue-100 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 text-green-800"
      >
        Encrypt Your Message
      </motion.h1>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <label htmlFor="plaintext" className="block text-sm font-medium text-gray-700 mb-2">
            Plaintext
          </label>
          <input
            type="text"
            id="plaintext"
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-4"
        >
          <label htmlFor="key" className="block text-sm font-medium text-gray-700 mb-2">
            Key Matrix
          </label>
          <div className="grid grid-cols-2 gap-2">
            {key.map((row, i) =>
              row.map((value, j) => (
                <input
                  key={`${i}-${j}`}
                  type="number"
                  value={value}
                  onChange={(e) => {
                    const newKey = [...key];
                    newKey[i][j] = parseInt(e.target.value, 10) || 0;
                    setKey(newKey);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ))
            )}
          </div>
        </motion.div>
        <div className="flex justify-between mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEncrypt}
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
          >
            Encrypt
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerateKey}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            Generate Key
          </motion.button>
        </div>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-red-600"
          >
            {error}
          </motion.div>
        )}
        {ciphertext && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-green-800">Encrypted Message:</h2>
            <p className="bg-green-100 p-4 rounded-md text-green-800 font-mono">{ciphertext}</p>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6"
        >
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            {showSteps ? 'Hide' : 'Show'} Encryption Steps
          </button>
          {showSteps && (
            <div className="mt-4 text-sm bg-blue-50 p-4 rounded-md">
              <ol className="list-decimal list-inside space-y-2">
                <li>Convert plaintext to numbers</li>
                <li>Divide numbers into 2x1 matrices</li>
                <li>Multiply each 2x1 matrix by the key matrix</li>
                <li>Apply modulo 26 to the result</li>
                <li>Convert numbers back to letters</li>
              </ol>
            </div>
          )}
        </motion.div>
      </div>
      <MessageHistory messages={messages} />
    </div>
  );
};

export default Encrypt;

