import numpy as np

def generate_key(size=2):
    while True:
        key = np.random.randint(0, 26, size=(size, size))
        if np.linalg.det(key) != 0 and np.gcd(int(np.round(np.linalg.det(key))), 26) == 1:
            return key

def key_to_string(key):
    return ' '.join(map(str, key.flatten()))

# Generate and print 5 valid keys
for i in range(5):
    key = generate_key()
    print(f"Key {i+1}:")
    print(key)
    print(f"Key string: {key_to_string(key)}")
    print()

