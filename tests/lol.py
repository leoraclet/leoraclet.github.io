import os

message = "This is a secret"
key = os.urandom(len(message))

ciphertext = bytes([a ^ b for a, b in zip(message.encode(), key)])
print(ciphertext.hex())
plaintext = bytes([a ^ b for a, b in zip(ciphertext, key)])
print(plaintext.decode())
