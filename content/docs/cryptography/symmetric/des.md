---
title: Data Encryption Standard (DES)
linkTitle: DES
---
[**Data Encryption Standard**](https://en.wikipedia.org/wiki/Data_Encryption_Standard) (DES) is a symmetric cryptographic algorithm. It uses the same key for encryption and decryption. It is a block cipher that encrypts data in 64-bit blocks using a 56-bit key. The key is sometimes completed with an additional byte for parity checks.

DES is now considered insecure and has been replaced by [AES](/docs/cryptography/symmetric/aes/).

## Attacks

### Weak keys

- [Weak keys in DES](https://en.wikipedia.org/wiki/Weak_key#Weak_keys_in_DES)

The block cipher DES has a few specific keys termed "weak keys" and "semi-weak keys". These are keys that cause the encryption mode of DES to act identically to the decryption mode of DES.
