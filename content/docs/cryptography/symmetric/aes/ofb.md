---
title: Output feedback (OFB)
linkTitle: OFB Mode
tags:
- cybersecurity
- cryptography
- symmetric
- aes
- mode
- ofb
---

[Output FeedBack mode](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Output_feedback_(OFB)) turns AES into a stream cipher. It is an obscure cipher mode, with no real benefits these days over using CTR.

![OFB Mode - Encryption](./assets/OFB_encryption.svg)
![OFB Mode - Decryption](./assets/OFB_decryption.svg)

## Attacks

### Symmetry - Encryption oracle

Suppose you're given a ciphertext $C$ of a plaintext $P$ you want to recover and access to an encryption oracle. You can then easily recover $P$.

To do so, use the oracle to encrypt $C$.

Because you have

$$
C = E_K(IV) \oplus P
$$

you will receive

$$
\begin{aligned}
E_K(IV) \oplus C &= E_K(IV) \oplus (P \oplus E_K(IV)) \\
&= P
\end{aligned}
$$

```python {linenos=table,filename=""}
```
