import random

def generate_key(length):
    return ''.join(chr(random.randint(0, 255)) for _ in range(length))

def xor_encrypt(plaintext, key):
    return ''.join(chr(ord(p) ^ ord(k)) for p, k in zip(plaintext, key))

def xor_decrypt(ciphertext, key):
    return ''.join(chr(ord(c) ^ ord(k)) for c, k in zip(ciphertext, key))

# Example usage
plaintext = "Hello, World!"
key = generate_key(len(plaintext))

ciphertext = xor_encrypt(plaintext, key)
decrypted = xor_decrypt(ciphertext, key)

print("One-Time Pad Encryption")
print(f"Plaintext: {plaintext}")
print(f"Key: {key.encode().hex()}")
print(f"Ciphertext: {ciphertext.encode().hex()}")
print(f"Decrypted: {decrypted}")

