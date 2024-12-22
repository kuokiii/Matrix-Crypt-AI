import random

def generate_prime():
    # This is a simplified prime generation for demonstration purposes
    # In practice, use a more robust method for generating large primes
    primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
    return random.choice(primes)

def mod_pow(base, exponent, modulus):
    result = 1
    while exponent > 0:
        if exponent & 1:
            result = (result * base) % modulus
        exponent = exponent >> 1
        base = (base * base) % modulus
    return result

# Simulate Diffie-Hellman key exchange
p = generate_prime()
g = 2  # generator

# Alice's private and public keys
a = random.randint(1, p-1)
A = mod_pow(g, a, p)

# Bob's private and public keys
b = random.randint(1, p-1)
B = mod_pow(g, b, p)

# Shared secret calculation
s_alice = mod_pow(B, a, p)
s_bob = mod_pow(A, b, p)

print("Diffie-Hellman Key Exchange Simulation")
print(f"Shared Prime (p): {p}")
print(f"Generator (g): {g}")
print(f"Alice's Private Key: {a}")
print(f"Alice's Public Key: {A}")
print(f"Bob's Private Key: {b}")
print(f"Bob's Public Key: {B}")
print(f"Alice's Calculated Shared Secret: {s_alice}")
print(f"Bob's Calculated Shared Secret: {s_bob}")
print(f"Shared Secret Match: {s_alice == s_bob}")

