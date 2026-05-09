---
title: One Time Pad (OTP)
linkTitle: OTP
---

The [one-time pad](https://en.wikipedia.org/wiki/One-time_pad) (OTP) is an encryption technique that cannot be cracked in cryptography. It is information-theoretically secure, as proven by [Claude Shannon](https://en.wikipedia.org/wiki/Claude_Shannon).

## Basics

To encrypt a message, simply generate a random key with at least as many bytes as the length of the message you want to encrypt, then XOR the two to obtain the encrypted message. To decrypt it, just XOR the encrypted message with the key to retrieve the original message.

```python {linenos=table,filename="otp.py"}
import os

message = "This is a secret"
key = os.urandom(len(message))

ciphertext = bytes([a ^ b for a, b in zip(message.encode(), key)])
print(ciphertext.hex())
plaintext = bytes([a ^ b for a, b in zip(ciphertext, key)])
print(plaintext.decode())

# >>> a2fe3a5d89bec88430b23a7a7e4b0c50
# >>> This is a secret
```

## Attacks

### Never-encoded value

If, due to an implementation error, it is certain that the ciphertext will not contain one specific value, then it is possible to recover the plaintext given enough ciphertexts encrypted with different keys from the same message.

More precisely, you need enough messages to cover all possible values for each character of the ciphertext. The missing value can then be used to determine that character of the plaintext message.

### Key reuse

- [Taking advantage of one-time pad key reuse?](https://crypto.stackexchange.com/questions/59/taking-advantage-of-one-time-pad-key-reuse)
- [Many Time Pad Attack - Crib Drag](https://travisdazell.blogspot.com/2012/11/many-time-pad-attack-crib-drag.html)

If the same key is reused to encrypt different messages, it is then possible, given a known part of the plaintext (or having guessed it), to recover both messages and the key used to encrypt them.

## Tools

- [xortool](https://github.com/hellman/xortool)
- [Boxentriq - XOR Cipher](https://www.boxentriq.com/ciphers/xor-cipher#autosolver)
