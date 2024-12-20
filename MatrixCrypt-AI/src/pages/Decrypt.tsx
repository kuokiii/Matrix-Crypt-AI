import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { decrypt, isValidKey } from '../utils/matrixCrypt';
import MessageHistory from '../components/MessageHistory';

const Decrypt: React.FC = () => {
  const [ciphertext, setCiphertext] = useState('');
  const [key, setKey] = useState<number[][]>([[6, 24], [1, 13]]);
  const [plaintext, setPlaintext] = useState('');
  const [showSteps, setShowSteps] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<Array<{ type: 'encrypt' | 'decrypt', input: string, output: string, key: number[][] }>>([]);

  const handleDecrypt = () => {
    if (!isValidKey(key)) {
      setError('Invalid key. Please use a valid key.');
      return;
    }
    setError('');
    const decrypted = decrypt(ciphertext, key);
    setPlaintext(decrypted);
    setMessages([...messages, { type: 'decrypt', input: ciphertext, output: decrypted, key }]);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-blue-100 to-purple-100 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 text-blue-800"
      >
        Decrypt Your Message
      </motion.h1>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <label htmlFor="ciphertext" className="block text-sm font-medium text-gray-700 mb-2">
            Ciphertext
          </label>
          <input
            type="text"
            id="ciphertext"
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDecrypt}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            Decrypt
          </motion.button>
        </motion.div>
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
        {plaintext && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Decrypted Message:</h2>
            <p className="bg-blue-100 p-4 rounded-md text-blue-800 font-mono">{plaintext}</p>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6"
        >
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="text-purple-500 hover:text-purple-600 transition-colors"
          >
            {showSteps ? 'Hide' : 'Show'} Decryption Steps
          </button>
          {showSteps && (
            <div className="mt-4 text-sm bg-purple-50 p-4 rounded-md">
              <ol className="list-decimal list-inside space-y-2">
                <li>Convert ciphertext to numbers</li>
                <li>Divide numbers into 2x1 matrices</li>
                <li>Calculate the inverse of the key matrix</li>
                <li>Multiply each 2x1 matrix by the inverse key matrix</li>
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

export default Decrypt;

