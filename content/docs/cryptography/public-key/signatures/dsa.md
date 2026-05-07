---
title: Digital Signature Algorithm
linkTitle: DSA
---

The [**Digital Signature Algorithm**](https://en.wikipedia.org/wiki/Digital_Signature_Algorithm) (DSA) is a public-key cryptosystem for digital signature, based on the mathematical concept of modular exponentiation and the [discrete logarithm problem](../../../math/dlp).

## Basics

### Parameters

| Name | Description |
| :--: | ----------- |
| $L$ | The choosed key length (in bits) |
| $H$ | An approved cryptographic hash function |
| $g$ | The base point: $g = h^{(p-1)/q} \mod p$ |
| $q$ | A random $N$-bit prime |
| $p$ | A random $L$-bit prime such that $p-1$ is a mulitple pf $q$ |
| $x$ | The private key in $\{1, \ldots, q-1\}$ |
| $y$ | The public key: $y = g^{x} \mod p$ |

### Key generation

Key generation has two phases. The first phase involves choosing algorithm parameters, which may be shared between different users of the system. The second phase computes a single key pair for one user.

1. Choose an approved cryptographic hash function $H$ with output length $|H|$ bits.
2. Choose a key length $L$.
3. Choose the modulus length $N$ such that $N < L$ and $N \leq |H|$.
4. Choose an $N$-bit prime $q$.
5. Choose an $L$-bit prime $p$ such that $p-1$ is a multiple of $q$.
6. Choose an integer $h$ randomly from $\{2, \ldots, p-2\}$.
7. Compute $g = h^{(p-1)/q} \mod p$. If $g = 1$, try again with a different $h$.

For each user, you can now compute the key pair as follows:

1. Choose an integer $x$ randomly from $\{1, \ldots, q-1\}$.
2. Compute $y = g^{x} \mod p$.

Here, $x$ is the private key and $y$ is the public key.

### Signing

A message $m$ is signed as follows:

1. Choose an integer $k$ randomly from $\{1, \ldots, q-1\}$.
2. Compute $r = \left(g^{k} \mod p\right) \mod q$.
   If $r = 0$, restart with a different random $k$.
3. Compute $s = k^{-1}\left(H(m) + x r\right) \mod q$.
   If $s = 0$, restart with a different random $k$.

The signature is $(r, s)$.

### Verifying

One can verify that a signature $(r, s)$ is a valid signature for a message $m$ as follows:

1. Verify that $0 < r < q$ and $0 < s < q$.
2. Compute $w = s^{-1} \mod q$.
3. Compute $u_1 = H(m) \cdot w \mod q$.
4. Compute $u_2 = r \cdot w \mod q$.
5. Compute $v = \left(g^{u_1} y^{u_2} \mod p\right) \mod q$.

The signature is valid **if and only if** $v = r$.

## Attacks

### Known bits of nonce

#### Known MSB

You can recover the private key and nonces used to sign a given message if the most significant bits (MSB) of the nonce are known.

- [Attack Implementation](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/hnp/lattice_attack.py#L50)

#### Known LSB

You can recover the private key and nonce used to sign a given message if the least significant bits (LSB) of the nonce are known.

- [Attack Implementation](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/hnp/lattice_attack.py#L75)

#### Known middle bits

You can recover the private key and nonce used to sign a given message if the middle bits of the nonce are known.

- [Attack Implementation](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/hnp/lattice_attack.py#L101)

#### Any known bits

Using an improved method, it is also possible to recover the private key and nonce used to sign a given message with any of the bits of the nonce known, as long as there are enough of them.

- [Attack Implementation](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/hnp/extended_hnp.py#L92)
