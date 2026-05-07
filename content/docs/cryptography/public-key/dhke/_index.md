---
title: Diffie–Hellman Key Exchange
linkTitle: DHKE
tags:
- cybersecurity
- cryptography
- dhke
- public-key
prev: /docs/cryptography/public-key
next: /docs/cryptography/public-key/dhke/attacks
---

The [**Diffie–Hellman Key Exchange**](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) (DHKE) is a method that allows two sides to agree on a shared secret over a public channel. This method is based on the [discrete logarithm problem](../../math/dlp) which is believed to be hard to solve.

## Textbook definition

### Parameters

| Name | Description |
| :--: | :---------- |
| $p$ | The prime modulus |
| $g$ | A generator of the multiplicative group of integers modulo $p$ |
| $a$ | Alice's private number: $1 < a < p - 1$ |
| $b$ | Bob's private number: $1 < b < p - 1$ |
| $A$ | Alice's public number: $A = g^a \mod p$ |
| $B$ | Bob's public number: $B = g^b \mod p$ |
| $s$ | The shared secret: $s = B^a = A^b = g^{ab} \mod p$ |

### Key exchange

Suppose a situation where Alice and Bob want to create a shared secret key.

1. They choose both a big prime number $p$ and a generator $g$ on which they agree on.
2. They create private keys $a$ and $b$ respectively, with $a, b \in GF(p)$
3. They both compute their corresponding public keys $A$ and $B$ and send them to each other over the public channel.

$$
\begin{aligned}
A &= g^a \mod p \\
B &= g^b \mod p \\
\end{aligned}
$$

4. They can now both compute the shared secret key $s$ as

$$
s = B^a = A^b = g^{ab} \mod p
$$

They can now use the shared secret $s$ to derive a symmetric key for AES (for example), and use it to encrypt their future messages.

## Tools

- [Discrete logarithm calculator](https://www.alpertron.com.ar/DILOG.HTM)
- [Wikipedia - Diffie–Hellman Key Exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange)
