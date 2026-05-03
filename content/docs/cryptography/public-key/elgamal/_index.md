---
title: ElGamal
tags:
- cybersecurity
- cryptography
- elgamal
- public-key
prev: /docs/cryptography/public-key
next: /docs/cryptography/public-key/elgamal/attacks
---

The [**ElGamal encryption**](https://en.wikipedia.org/wiki/ElGamal_encryption) system is a public-key encryption algorithm based on the [Diffie–Hellman key exchange](../dhke) first described by [Taher Elgamal](https://en.wikipedia.org/wiki/Taher_Elgamal) in 1985.

## Textbook definition

### Keys generation

1. Choose a large prime $p$.
2. Choose a generator $g$ of the multiplicative group of integers modulo $p$.
3. Choose a random integer $x$ such that $1<x<p−1$.
4. Compute the public key $h = g^x \mod p$

### Encryption

To encrypt a message $m$ with the public key $(p,g,h)$, compute the ciphertext $(c_1, c_2)$ with:

1. Choose a random integer $y$ (nonce) such that $1<y<p−1$.
2. Compute the ciphertext as:

$$
\begin{aligned}
&c_1 = g^y &\mod p \\
&c_2 = m \cdot h^y &\mod p \\
\end{aligned}
$$

### Decryption

To decrypt a ciphertext $(c_1,c_2)$ with the private key $(p,g,x)$ compute :

$$
m = c_2 \cdot (c_1^x)^{-1} \mod p
$$

with $m$ being the deciphered message.

## Resources

- [ElGamal encryption](https://en.wikipedia.org/wiki/ElGamal_encryption)