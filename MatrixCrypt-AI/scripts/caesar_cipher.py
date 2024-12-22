def caesar_encrypt(plaintext, shift):
    ciphertext = ""
    for char in plaintext.upper():
        if char.isalpha():
            ascii_offset = ord('A')
            encrypted_char = chr((ord(char) - ascii_offset + shift) % 26 + ascii_offset)
            ciphertext += encrypted_char
        else:
            ciphertext += char
    return ciphertext

def caesar_decrypt(ciphertext, shift):
    return caesar_encrypt(ciphertext, -shift)

def brute_force_caesar(ciphertext):
    for shift in range(26):
        plaintext = caesar_decrypt(ciphertext, shift)
        print(f"Shift {shift}: {plaintext}")

# Example usage
plaintext = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG"
shift = 3
ciphertext = caesar_encrypt(plaintext, shift)
decrypted = caesar_decrypt(ciphertext, shift)

print(f"Plaintext: {plaintext}")
print(f"Ciphertext: {ciphertext}")
print(f"Decrypted: {decrypted}")

print("\nBrute force attack:")
brute_force_caesar(ciphertext)

