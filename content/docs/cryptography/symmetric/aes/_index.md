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
|  [**CFB**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#CFB-1,_CFB-8,_CFB-64,_CFB-128,_etc.)    | Very similar to **OFB**  | ZeroLogon Vulnerability (CFB-8)|
| [**OFB**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Output_feedback_(OFB))  | XORs each block with repeated encryptions of IV | Symmetry + Encryption / Decryption oracle |

## Attacks

### Linear SBox

- [StackExchange - How to find linear equations of a SBox?](https://crypto.stackexchange.com/questions/113743/how-to-find-linear-equations-of-a-sbox)
- [StackExchange - Consequences of AES without any one of its operations](https://crypto.stackexchange.com/questions/20228/consequences-of-aes-without-any-one-of-its-operations)
- [StackExchange - Linear AES : expression of K in AES(P) = AP+K](https://crypto.stackexchange.com/questions/89596/linear-aes-expression-of-k-in-aesp-apk/89607#89607)

> [!important] TODO

### Fault attack

- [GitHub - Differential fault analysis framework for AES128](https://github.com/Daeinar/dfa-aes)
- [Differential Fault Analysis of the Advanced Encryption Standard using a Single Fault](https://eprint.iacr.org/2009/575.pdf)
- [A Differential Fault Attack Technique against SPN Structures, with Application to the AES and KHAZAD](https://link.springer.com/content/pdf/10.1007/978-3-540-45238-6_7.pdf)
- [Differential Fault Analysis on White-box AES Implementations](https://blog.quarkslab.com/differential-fault-analysis-on-white-box-aes-implementations.html)

> [!important] TODO

### Correlaiton Power Analysis

- [Correlation Power Analysis with a Leakage Model](https://link.springer.com/content/pdf/10.1007/978-3-540-28632-5_2.pdf)

## Resources

- [GitHub - crypto-attacks](https://github.com/jvdsn/crypto-attacks)
- [Advanced Encryption Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)
- [SageMath Docs - Rijndael-GF](https://doc.sagemath.org/html/en/reference/cryptography/sage/crypto/mq/rijndael_gf.html)
- [SageMath Docs - Ideals in multivariate polynomial rings](https://doc.sagemath.org/html/en/reference/polynomial_rings/sage/rings/polynomial/multi_polynomial_ideal.html)
