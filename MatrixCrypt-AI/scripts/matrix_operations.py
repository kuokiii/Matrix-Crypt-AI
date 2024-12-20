import numpy as np

def matrix_multiply(A, B):
    return np.dot(A, B)

def matrix_inverse(A):
    return np.linalg.inv(A)

def matrix_determinant(A):
    return np.linalg.det(A)

# Example usage
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print("Matrix A:")
print(A)
print("\nMatrix B:")
print(B)
print("\nA * B:")
print(matrix_multiply(A, B))
print("\nInverse of A:")
print(matrix_inverse(A))
print("\nDeterminant of A:")
print(matrix_determinant(A))

