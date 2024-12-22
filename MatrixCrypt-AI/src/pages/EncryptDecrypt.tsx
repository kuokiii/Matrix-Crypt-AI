import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { encrypt, decrypt, generateKey, isValidKey } from '../utils/matrixCrypt';
import { Clipboard, ClipboardCheck, Download, Share2 } from 'lucide-react';

interface Message {
  type: 'encrypt' | 'decrypt';
  input: string;
  output: string;
  key: number[][];
  timestamp: number;
}

const EncryptDecrypt: React.FC = () => {
  const [input, setInput] = useState('');
  const [key, setKey] = useState<number[][]>([[6, 24], [1, 13]]);
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [copied, setCopied] = useState(false);

  // Clear output when switching modes or changing input
  useEffect(() => {
    setOutput('');
    setError('');
  }, [mode, input]);

  const handleProcess = () => {
    if (!input.trim()) {
      setError('Please enter a message to process.');
      return;
    }
    
    if (!isValidKey(key)) {
      setError('Invalid key. Please use a valid key or generate a new one.');
      return;
    }
    
    setError('');
    let result: string | null;
    
    if (mode === 'encrypt') {
      result = encrypt(input, key);
    } else {
      result = decrypt(input, key);
    }
    
    if (result === null) {
      setError('Unable to process. The key may not be invertible for decryption.');
      return;
    }
    
    setOutput(result);
    setMessages(prev => [{
      type: mode,
      input,
      output: result as string,
      key,
      timestamp: Date.now()
    }, ...prev.slice(0, 9)]); // Keep last 10 messages
  };

  const handleGenerateKey = () => {
    const newKey = generateKey();
    setKey(newKey);
    setError('');
  };

  const handleModeChange = (newMode: 'encrypt' | 'decrypt') => {
    setMode(newMode);
    setOutput(''); // Clear output when switching modes
    setInput(''); // Clear input when switching modes
    setError(''); // Clear any errors
  };

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadHistory = () => {
    const historyText = messages
      .map(m => `${m.type.toUpperCase()}\nInput: ${m.input}\nOutput: ${m.output}\nKey: ${JSON.stringify(m.key)}\nTime: ${new Date(m.timestamp).toLocaleString()}\n\n`)
      .join('---\n');
    
    const blob = new Blob([historyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'encryption-history.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full gradient-bg min-h-screen">
      <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 text-purple-800"
      >
        Matrix Encryption Tool
      </motion.h1>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'encrypt' ? 'Plaintext' : 'Ciphertext'}
          </label>
          <input
            type="text"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            className="input-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder={mode === 'encrypt' ? 'Enter text to encrypt' : 'Enter text to decrypt'}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-4"
        >
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Key Matrix
            </label>
            <button
              onClick={handleGenerateKey}
              className="button-secondary"
            >
              Generate New Key
            </button>
          </div>
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
                  className="input-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              ))
            )}
          </div>
        </motion.div>

        <div className="mt-4 flex justify-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-purple-600"
              name="mode"
              checked={mode === 'encrypt'}
              onChange={() => handleModeChange('encrypt')}
            />
            <span className="ml-2">Encrypt</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-purple-600"
              name="mode"
              checked={mode === 'decrypt'}
              onChange={() => handleModeChange('decrypt')}
            />
            <span className="ml-2">Decrypt</span>
          </label>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleProcess}
          className="button-primary"
        >
          {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
        </motion.button>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-red-600 text-center"
          >
            {error}
          </motion.div>
        )}

        {output && (
          <motion.div
            key={`${mode}-${output}`} // Force re-render on mode or output change
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-purple-800">
                {mode === 'encrypt' ? 'Encrypted' : 'Decrypted'} Message:
              </h2>
              <button
                onClick={copyToClipboard}
                className="button-secondary"
                title="Copy to clipboard"
              >
                {copied ? <ClipboardCheck className="w-5 h-5" /> : <Clipboard className="w-5 h-5" />}
              </button>
            </div>
            <p className="bg-purple-100 p-4 rounded-md text-purple-800 font-mono">{output}</p>
          </motion.div>
        )}
      </div>

      {messages.length > 0 && (
        <div className="max-w-md mx-auto mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-purple-800">Message History</h2>
            <div className="flex space-x-2">
              <button
                onClick={downloadHistory}
                className="button-secondary"
                title="Download history"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMessages([])}
                className="button-secondary"
                title="Clear history"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.timestamp}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold capitalize">
                    {message.type}ed
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Input:</span>
                    <p className="font-mono">{message.input}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Output:</span>
                    <p className="font-mono">{message.output}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-500">Key:</span>
                  <div className="grid grid-cols-2 gap-1 font-mono text-sm">
                    <div>[{message.key[0].join(', ')}]</div>
                    <div>[{message.key[1].join(', ')}]</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default EncryptDecrypt;

