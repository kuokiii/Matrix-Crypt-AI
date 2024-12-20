const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const MOD = 26;

export const textToNumbers = (text: string): number[] => {
  return text.toUpperCase().split('').map(char => ALPHABET.indexOf(char)).filter(num => num !== -1);
};

export const numbersToText = (numbers: number[]): string => {
  return numbers.map(num => ALPHABET[((num % MOD) + MOD) % MOD]).join('');
};

const determinant = (matrix: number[][]): number => {
  return (((matrix[0][0] * matrix[1][1]) % MOD) - ((matrix[0][1] * matrix[1][0]) % MOD) + MOD) % MOD;
};

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

const modInverse = (num: number): number => {
  for (let x = 1; x < MOD; x++) {
    if (((num % MOD) * (x % MOD)) % MOD === 1) {
      return x;
    }
  }
  return -1; // Return -1 if no modular inverse exists
};

const matrixInverse = (matrix: number[][]): number[][] | null => {
  const det = determinant(matrix);
  if (gcd(det, MOD) !== 1) {
    return null; // Matrix is not invertible
  }
  
  const detInv = modInverse(det);
  if (detInv === -1) {
    return null; // Modular inverse doesn't exist
  }
  
  return [
    [((matrix[1][1] * detInv) % MOD + MOD) % MOD, ((-matrix[0][1] * detInv) % MOD + MOD) % MOD],
    [((-matrix[1][0] * detInv) % MOD + MOD) % MOD, ((matrix[0][0] * detInv) % MOD + MOD) % MOD]
  ];
};

export const encrypt = (plaintext: string, key: number[][]): string => {
  const numbers = textToNumbers(plaintext);
  const result: number[] = [];

  for (let i = 0; i < numbers.length; i += 2) {
    const chunk = [
      numbers[i],
      i + 1 < numbers.length ? numbers[i + 1] : 0
    ];
    
    const encrypted = [
      ((key[0][0] * chunk[0] + key[0][1] * chunk[1]) % MOD + MOD) % MOD,
      ((key[1][0] * chunk[0] + key[1][1] * chunk[1]) % MOD + MOD) % MOD
    ];
    
    result.push(...encrypted);
  }

  return numbersToText(result);
};

export const decrypt = (ciphertext: string, key: number[][]): string | null => {
  const invKey = matrixInverse(key);
  if (!invKey) {
    return null; // Unable to decrypt due to non-invertible key
  }

  const numbers = textToNumbers(ciphertext);
  const result: number[] = [];

  for (let i = 0; i < numbers.length; i += 2) {
    const chunk = [
      numbers[i],
      i + 1 < numbers.length ? numbers[i + 1] : 0
    ];
    
    const decrypted = [
      ((invKey[0][0] * chunk[0] + invKey[0][1] * chunk[1]) % MOD + MOD) % MOD,
      ((invKey[1][0] * chunk[0] + invKey[1][1] * chunk[1]) % MOD + MOD) % MOD
    ];
    
    result.push(...decrypted);
  }

  // Remove trailing zeros that might have been added during encryption
  while (result.length > 0 && result[result.length - 1] === 0) {
    result.pop();
  }

  return numbersToText(result);
};

export const isValidKey = (key: number[][]): boolean => {
  const det = determinant(key);
  return gcd(det, MOD) === 1;
};

export const generateKey = (): number[][] => {
  let key: number[][];
  do {
    key = [
      [Math.floor(Math.random() * MOD), Math.floor(Math.random() * MOD)],
      [Math.floor(Math.random() * MOD), Math.floor(Math.random() * MOD)],
    ];
  } while (!isValidKey(key));
  return key;
};

