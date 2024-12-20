def vigenere_encrypt(plaintext, key):
    ciphertext = ""
    key_length = len(key)
    for i, char in enumerate(plaintext.upper()):
        if char.isalpha():
            shift = ord(key[i % key_length].upper()) - ord('A')
            encrypted_char = chr((ord(char) - ord('A') + shift) % 26 + ord('A'))
            ciphertext += encrypted_char
        else:
            ciphertext += char
    return ciphertext

def vigenere_decrypt(ciphertext, key):
    plaintext = ""
    key_length = len(key)
    for i, char in enumerate(ciphertext.upper()):
        if char.isalpha():
            shift = ord(key[i % key_length].upper()) - ord('A')
            decrypted_char = chr((ord(char) - ord('A') - shift) % 26 + ord('A'))
            plaintext += decrypted_char
        else:
            plaintext += char
    return plaintext

# Example usage
key = "SECRET"
plaintext = "HELLO WORLD"
ciphertext = vigenere_encrypt(plaintext, key)
decrypted = vigenere_decrypt(ciphertext, key)

print(f"Plaintext: {plaintext}")
print(f"Key: {key}")
print(f"Ciphertext: {ciphertext}")
print(f"Decrypted: {decrypted}")

