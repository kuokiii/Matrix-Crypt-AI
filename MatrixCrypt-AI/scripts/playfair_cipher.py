def create_matrix(key):
    key = key.upper().replace("J", "I")
    matrix = []
    alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"
    
    for char in key + alphabet:
        if char not in matrix:
            matrix.append(char)
    
    return [matrix[i:i+5] for i in range(0, 25, 5)]

def find_position(matrix, char):
    for i, row in enumerate(matrix):
        if char in row:
            return i, row.index(char)
    return None

def playfair_encrypt(plaintext, key):
    matrix = create_matrix(key)
    plaintext = plaintext.upper().replace("J", "I")
    ciphertext = ""
    
    i = 0
    while i < len(plaintext):
        if i == len(plaintext) - 1:
            pair = (plaintext[i], "X")
        elif plaintext[i] == plaintext[i+1]:
            pair = (plaintext[i], "X")
            i -= 1
        else:
            pair = (plaintext[i], plaintext[i+1])
        
        row1, col1 = find_position(matrix, pair[0])
        row2, col2 = find_position(matrix, pair[1])
        
        if row1 == row2:
            ciphertext += matrix[row1][(col1+1)%5] + matrix[row2][(col2+1)%5]
        elif col1 == col2:
            ciphertext += matrix[(row1+1)%5][col1] + matrix[(row2+1)%5][col2]
        else:
            ciphertext += matrix[row1][col2] + matrix[row2][col1]
        
        i += 2
    
    return ciphertext

def playfair_decrypt(ciphertext, key):
    matrix = create_matrix(key)
    plaintext = ""
    
    for i in range(0, len(ciphertext), 2):
        pair = (ciphertext[i], ciphertext[i+1])
        row1, col1 = find_position(matrix, pair[0])
        row2, col2 = find_position(matrix, pair[1])
        
        if row1 == row2:
            plaintext += matrix[row1][(col1-1)%5] + matrix[row2][(col2-1)%5]
        elif col1 == col2:
            plaintext += matrix[(row1-1)%5][col1] + matrix[(row2-1)%5][col2]
        else:
            plaintext += matrix[row1][col2] + matrix[row2][col1]
    
    return plaintext

# Example usage
key = "KEYWORD"
plaintext = "HELLO WORLD"
ciphertext = playfair_encrypt(plaintext, key)
decrypted = playfair_decrypt(ciphertext, key)

print("Playfair Cipher")
print(f"Key: {key}")
print(f"Plaintext: {plaintext}")
print(f"Ciphertext: {ciphertext}")
print(f"Decrypted: {decrypted}")

