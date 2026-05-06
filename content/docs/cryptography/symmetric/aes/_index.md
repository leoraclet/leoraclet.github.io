---
title: Advanced Encryption Standard (AES)
linkTitle: AES
---

## Modes of Operation

![Block Cipher Modes of Operation](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/BlockCipherModesofOperation.svg/1920px-BlockCipherModesofOperation.svg.png "Block Cipher Mode of Operation")

Because block ciphers work on fixed-size blocks, they are combined with **modes of operation** to handle arbitrary-length data. Here are the most common ones with their associated potential flaws.

| Mode Name   | Description                                        | Common Weakness in CTFs                                        |
| :--------: |----------------------------------------------------|----------------------------------------------------------------|
| [**ECB**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Electronic_codebook_(ECB)) | Each block encrypted independently.                | Leaks patterns, identical plaintexts -> identical ciphertexts. |
| [**CBC**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Cipher_block_chaining_(CBC)) | XORs each block with previous ciphertext.          | Padding oracle attacks via IV or padding error oracle, Bit-flip.         |
| [**CTR**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Counter_(CTR))  | Turns block cipher into stream cipher via counter. | Key/nonce reuse causes keystream leakage.                      |
| [**GCM**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Galois/counter_(GCM))  | Authenticated encryption (AEAD).                   | Nonce reuse, Forbidden Attack.                      |
| [**IGE**](https://crypto.stackexchange.com/questions/43841/cbc-mode-infinite-garble-extension) | XORs each block with previous ciphertext AND plaintext                   | Padding oracle.                     |
|  [**CFB**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#CFB-1,_CFB-8,_CFB-64,_CFB-128,_etc.)    |                     | ZeroLogon Vulnerability (CFB-8)|
| [**OFB**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Output_feedback_(OFB))  | XORs each block with repeated encryptions of IV | Symmetry + Encryption / Decryption oracle |

## Resources

- [GitHub - crypto-attacks](https://github.com/jvdsn/crypto-attacks)
- [Advanced Encryption Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)
