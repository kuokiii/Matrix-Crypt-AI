import React from 'react';
import { motion } from 'framer-motion';

interface Message {
  type: 'encrypt' | 'decrypt';
  input: string;
  output: string;
  key: number[][];
}

interface MessageHistoryProps {
  messages: Message[];
}

const MessageHistory: React.FC<MessageHistoryProps> = ({ messages }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Message History</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((message, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">
                  {message.type === 'encrypt' ? 'Encrypted' : 'Decrypted'}
                </span>
                <span className="text-sm text-gray-500">
                  Key: [{message.key[0].join(', ')}], [{message.key[1].join(', ')}]
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
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageHistory;

