MatrixCryptAI is an interactive web application that demonstrates the fascinating world of matrix-based cryptography. Using the principles of the Hill Cipher, this project allows users to encrypt and decrypt messages using 2x2 matrix keys.

## 🌟 Features

- **Encryption & Decryption**: Secure your messages or decode encrypted text using matrix operations.
- **Interactive UI**: User-friendly interface with real-time feedback.
- **Custom Key Input**: Enter your own 2x2 matrix key or generate a random one.
- **Message History**: Keep track of your recent encryption and decryption operations.
- **Copy to Clipboard**: Easily copy encrypted or decrypted messages.
- **Download History**: Save your encryption/decryption history as a text file.


## 🛠️ Technologies Used

- React
- TypeScript
- Tailwind CSS
- Framer Motion

## 📦 Installation

1. Clone the repository:


git clone [https://github.com/your-username/matrix-crypt-ai.git](https://github.com/your-username/matrix-crypt-ai.git)



2. Navigate to the project directory:


cd matrix-crypt-ai


3. Install dependencies:

npm install


4. Start the development server:

npm start


5. Open your browser and visit `http://localhost:3000`

## 🧮 How It Works

MatrixCryptAI uses the Hill Cipher algorithm, a polygraphic substitution cipher based on linear algebra. Here's a brief overview of the process:

1. **Encryption**:
- Convert the plaintext to numbers (A=0, B=1, ..., Z=25)
- Group the numbers into pairs
- Multiply each pair with the 2x2 key matrix
- Convert the resulting numbers back to letters

2. **Decryption**:
- Convert the ciphertext to numbers
- Calculate the inverse of the key matrix
- Multiply each pair of numbers with the inverse key matrix
- Convert the resulting numbers back to letters

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/matrix-crypt-ai/issues).

## 📝 License

This project is [GNU] licensed.

## 👨‍💻 Author

**Nirupam Thapa**

- GitHub: (https://github.com/kuokiii)
- Instagram: (https://instagram.com/_kuoki/)

## 🙏 Acknowledgments

- Inspired by the Hill Cipher algorithm
- Thanks to all contributors and supporters of this project!

---

⭐️ If you find this project interesting or useful, please consider giving it a star!

