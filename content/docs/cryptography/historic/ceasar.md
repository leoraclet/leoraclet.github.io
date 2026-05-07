---
title: Ceasar Cipher
linkTitle: Caesar
---

The [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher) is one of the simplest, oldest, and most widely known encryption techniques used in cryptography. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions along the alphabet.

> [!note]
> Note that this cipher is a special case of [Affine Cipher](../affine)

---

Here is a simple Python implementation.

```python {linenos=table,filename="ceasar-cipher.py"}
import string

CHARS = string.ascii_letters


def get_letter_position(letter):
    """Convert letter to numeric position (A=0, B=1, etc.)"""
    return ord(letter.upper()) - ord("A")


def position_to_letter(position):
    """Convert numeric position back to letter"""
    return chr(position + ord("A"))


def encrypt(text, shift):
    """Encrypt given text by a fixed shift offset"""
    encrypted = ""
    for letter in text:
        if letter in CHARS:
            lpos = get_letter_position(letter)
            encrypted += position_to_letter((lpos + shift) % 26)
        else:
            encrypted += letter

    return encrypted


def decrypt(text, shift):
    """Decrypt given text by a fixed shift offset"""
    return encrypt(text, -shift)


################################################
# TEST
################################################

ciphertext = encrypt("The flag is COUCOU", 3)
print(ciphertext)
print(decrypt(ciphertext, 3))
print(encrypt(ciphertext, -3))
```

> [!tip] Observation
> Notice that, because the Caesar cipher is said to be [symmetric](https://www.geeksforgeeks.org/computer-networks/symmetric-key-cryptography/), the decrypt function is exactly the same as the encrypt one; it just takes the inverse of the key parameter.

## Attacks

### Brute-force

This cipher is very easy to crack because of its nature. As there are only $26$ possible substitutions, you can try all of them until you find the correct plaintext.

This [online tool](https://www.dcode.fr/caesar-cipher) does just that.

Or, you can code it by yourself in Python.

```python {linenos=table,filename="ceasar-cipher-cracker.py"}
for shift in range(26):
    print(decrypt(ciphertext, shift))
```

## Resources

- [Caesar Cipher Decoder](https://www.dcode.fr/caesar-cipher)
- [Wikipedia - Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)
