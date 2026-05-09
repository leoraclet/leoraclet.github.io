---
title: Secure Hash Algorithm 1 (SHA-1)
linkTitle: SHA-1
weight: 2
tags:
- cybersecurity
- cryptography
- sha1
- hash
- collision
- hash-length-extension
---

The [Secure Hash Algorithm 1](https://en.wikipedia.org/wiki/SHA-1) (SHA-1) is a hash function which takes an input and produces a 160-bit (20-byte) hash value known as a message digest – typically rendered as 40 hexadecimal digits.

## Attacks

The attacks on **SHA-1** are similar to those on [**MD5**](../md5#attacks), but the chosen-prefix collision is much more restrictive, especially in terms of computational power, than for MD5. However, due to its existence, SHA-1 is now also considered insecure by today's standards.

### Collisions

- [**sha1collider**](https://github.com/nneonneo/sha1collider/)

### Hash Length Extension

> [!tip]
> You can refer to [this page](../md5#hash-length-extension) for more details about this attack.

## Resources

- [First Chosen-Prefix Collision on SHA-1 and Application to the PGP Web of Trust](https://eprint.iacr.org/2020/014.pdf)
- [SHA-1 is a Shambles](https://sha-mbles.github.io/)
