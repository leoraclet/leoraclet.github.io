---
title: Cipher feedback (CFB)
linkTitle: CFB Mode
tags:
- cybersecurity
- cryptography
- symmetric
- aes
- mode
- cfb
---

![CFB Mode - Encryption](./assets/CFB_encryption.svg)
![CFB Mode - Decryption](./assets/CFB_decryption.svg)

## Attacks

### Zero key (CFB-8)

- [ZeroLogon - CVE-2020-1472](https://github.com/bvcyber/CVE-2020-1472)
- [Wikipedia - ZeroLogon](https://en.wikipedia.org/wiki/Zerologon)

This security vulnerability revealed that in this block cipher mode of operation, with non-negligible probability (1 in 256), for a randomly generated key and a plaintext of zeroes, the ciphertext could also be all zeroes, making the output predictable.
