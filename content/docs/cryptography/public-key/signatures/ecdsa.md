---
title: Elliptic Curve DSA (ECDSA)
linkTitle: ECDSA
tags:
- cybersecurity
- cryptography
- signature
- ecc
- ecdsa
- attacks
---

The [**Elliptic Curve Digital Signature Algorithm**](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) (ECDSA) is a variant of the Digital Signature Algorithm (DSA) which uses elliptic-curve cryptography.

## Basics

### Parameters

| Name | Description |
| :--: | :---------- |
| CURVE | The elliptic curve field and equation used |
| $G$ | A point on the curve that generates a subgroup of large prime order n |
| $n$ | Integer order of $G$, means that $nG=\mathcal{O}$, where $\mathcal{O}$ is the identity element |
| $d_{A}$ | The private key (randomly selected) |
| $Q_{A}$ | The public key $d_{A}\times G$ (calculated by elliptic curve) |
| $m$ | The message to send |

## Public key recovery

Given a message $m$ and a signature $(r,s)$ on that message, one can (potentially) recover the associated public key as follows.

1. Verify that $r$ and $s$ are integers in $[1,n-1]$. If not, the signature is invalid.
2. Calculate a curve point $R=(x_{1},y_{1})$ where $x_{1} = r + kn < p \; | \; \forall k \in \mathbb{N}$.
3. Calculate $e={\textrm {HASH}}(m)$, using the same function used during signature generation.
4. Let $z$ be the $L_{n}$ leftmost bits of $e$.
5. Calculate $u_{1}=-zr^{-1}\,{\bmod {\,}}n$ and $u_{2}=sr^{-1}\,{\bmod {\,}}n$.
6. Calculate the curve point $Q_{A}=(x_{A},y_{A})=u_{1}\times G+u_{2}\times R$.


## Attacks

### Nonce reuse

- [Reusing The Same Value Of k In Different Signatures](https://github.com/elikaski/ECC_Attacks#reusing-the-same-value-of-k-in-different-signatures)

### Insecure nonce

- [Generating k Values Insecurely](https://github.com/elikaski/ECC_Attacks#generating-k-values-insecurely)

### Message not hashes

- [Not Hashing The Message Before Signing It](https://github.com/elikaski/ECC_Attacks#not-hashing-the-message-before-signing-it)

## Resources

- [ECDSA: Handle with Care](https://blog.trailofbits.com/2020/06/11/ecdsa-handle-with-care/)
- [Elliptic Curve Cryptography: ECDH and ECDSA](https://andrea.corbellini.name/2015/05/30/elliptic-curve-cryptography-ecdh-and-ecdsa/)
- [How does the "biased-k attack" on (EC)DSA work?](https://crypto.stackexchange.com/questions/44644/how-does-the-biased-k-attack-on-ecdsa-work/48379#48379)
