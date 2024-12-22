import random
import math

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

def generate_prime(min_value, max_value):
    prime = random.randint(min_value, max_value)
    while not is_prime(prime):
        prime = random.randint(min_value, max_value)
    return prime

def mod_inverse(a, m):
    for i in range(1, m):
        if (a * i) % m == 1:
            return i
    return None

def generate_rsa_keys():
    p = generate_prime(100, 1000)
    q = generate_prime(100, 1000)
    n = p * q
    phi = (p - 1) * (q - 1)
    
    e = random.randint(2, phi - 1)
    while math.gcd(e, phi) != 1:
        e = random.randint(2, phi - 1)
    
    d = mod_inverse(e, phi)
    
    return (e, n), (d, n)

# Generate RSA keys
public_key, private_key = generate_rsa_keys()

print("RSA Key Generation")
print(f"Public Key (e, n): {public_key}")
print(f"Private Key (d, n): {private_key}")

