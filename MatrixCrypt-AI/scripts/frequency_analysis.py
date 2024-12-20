import matplotlib.pyplot as plt

def frequency_analysis(text):
    freq = {}
    for char in text.upper():
        if char.isalpha():
            freq[char] = freq.get(char, 0) + 1
    return freq

def plot_frequency(freq):
    plt.bar(freq.keys(), freq.values())
    plt.title('Character Frequency')
    plt.xlabel('Characters')
    plt.ylabel('Frequency')
    plt.show()

# Example usage
text = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG"
freq = frequency_analysis(text)

print("Character frequencies:")
for char, count in sorted(freq.items()):
    print(f"{char}: {count}")

plot_frequency(freq)

