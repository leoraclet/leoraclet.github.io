---
title: RSA - Signature
linkTitle: RSA
---

The [RSA](../../rsa) cryptosystem can also be used to [sign](https://en.wikipedia.org/wiki/Digital_signature#How_they_work) and [verify](https://en.wikipedia.org/wiki/Digital_signature#How_they_work) messages, making it a signature scheme as well.

## Parameters

| Name | Description |
| :--: | :---------- |
| $H$ | An approved cryptographic hash function |
| $p, q$ | The prime factors of $N$ |
| $N$ | The public modulus: $N=p \cdot q$ |
| $e$ | The public exponent coprime to $N$ |
| $\phi(N)$ | Euler's totient of $N$: $\phi(N) = (p - 1)(q - 1)$ |
| $d$ | The private exponent:  $d = e^{-1} \mod \phi(N)$ |
| $m$ | The message to send |
| $S$ | The signature of the message $m$: $S = H(m)^d \mod N$ |

## Basics

Here, compared to the classical use of the cryptosystem, the encryption step is used for verification, while the decryption step is used for signing. This is coherent because the private key owner is the only one who can sign a given message, but anyone knowing the public key can verify it.

Given a private key $(N, d)$, a public key $(N, e)$, and a hash function $H$, you can compute the signature of the message $m$ as:

$$
S = H(m)^d \mod N
$$

You can then verify it as:

$$
S^e \mod N \stackrel{?}{=} H(m)
$$

## Attacks

The attacks are similar to those of the RSA cryptosystem, which you can find documented [here](../../rsa/attacks).
