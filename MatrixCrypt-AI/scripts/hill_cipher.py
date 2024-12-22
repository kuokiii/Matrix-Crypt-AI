import numpy as np

def text_to_numbers(text):
    return [ord(char) - ord('A') for char in text.upper() if char.isalpha()]

def numbers_to_text(numbers):
    return ''.join([chr((num % 26) + ord('A')) for num in numbers])

def encrypt(plaintext, key):
    numbers = text_to_numbers(plaintext)
    key_matrix = np.array(key).reshape((2, 2))
    encrypted = []
    for i in range(0, len(numbers), 2):
        chunk = np.array(numbers[i:i+2])
        if len(chunk) < 2:
            chunk = np.pad(chunk, (0, 1), 'constant')
        result = np.dot(key_matrix, chunk) % 26
        encrypted.extend(result)
    return numbers_to_text(encrypted)

def decrypt(ciphertext, key):
    numbers = text_to_numbers(ciphertext)
    key_matrix = np.array(key).reshape((2, 2))
    key_inverse = np.linalg.inv(key_matrix)
    decrypted = []
    for i in range(0, len(numbers), 2):
        chunk = np.array(numbers[i:i+2])
        result = np.round(np.dot(key_inverse, chunk)).astype(int) % 26
        decrypted.extend(result)
    return numbers_to_text(decrypted)

# Example usage
key = [6, 24, 1, 13]
plaintext = "HELLO"
ciphertext = encrypt(plaintext, key)
decrypted = decrypt(ciphertext, key)

print(f"Plaintext: {plaintext}")
print(f"Ciphertext: {ciphertext}")
print(f"Decrypted: {decrypted}")

