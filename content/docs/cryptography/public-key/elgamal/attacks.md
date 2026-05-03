---
title: ElGamal Attacks
linkTitle: Attacks
tags:
- cybersecurity
- cryptography
- elgamal
- attacks
- public-key
prev: /docs/cryptography/public-key/elgamal
---

<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD013 -->

## Summary

- [Encryption](#encryption)
  - [Nonce reuse](#nonce-reuse)
  - [Unsafe generator](#unsafe-generator)
  - [Oracle](#oracle)
    - [Padding oracle](#padding-oracle)
- [Signature](#signature)
  - [(Another) Non reuse](#another-nonce-reuse)

## Encryption

### Nonce reuse

Suppose you know a message $m$ and it's corresponding ciphertext $(c_1, c_2)$.
Now let's also suppose that you have the ciphertext $(c_1^{'}, c_2^{'})$ of an unknown message $m^{'}$ that you want to decrypt. You can retrieve $m^{'}$ uniquely if both ciphertexts were calculated using the same nonce $y$.

To do so, calculate :

$$
\begin{aligned}
s &= c_2 * (m^{-1} \mod p) &\mod p \\
&= h^y &\mod p \\
\end{aligned}
$$

you can now retrieve the message by computing :

$$
\begin{aligned}
c_2^{'} * (s^{-1} \mod p) \mod p &= c_2^{'} * ((h^y)^{-1} \mod p) &\mod p \\
&= m \cdot h^y * (h^{-y} \mod p) &\mod p \\
&= m^{'} &\mod p \\
\end{aligned}
$$

```python {linenos=table,filename="encryption_nonce_reuse.py"}
s = c2 * pow(m, -1, p) % p
m_ = c2_ * pow(s, -1, p) % p
```

### Unsafe generator

If the chosen generator $g$ is not safe, one can calculate the [Legendre symbol](/docs/cryptography/math-fundamentals/modular-arithmetic/#legendre-symbol) of the underlying message $m$ from its ciphertext $(c_1, c_2)$ as

$$
\left(\frac{m}{p}\right) = \frac{\left(\frac{c_2}{p}\right)}{max \left\{ \left(\frac{h}{p}\right), \left(\frac{c_1}{p}\right) \right\}}
$$

Thus revealing some information on the message $m$.

```python {linenos=table,filename="unsafe_generator.py"}
from sage.all import *

ls = int(legendre_symbol(c2, p) // max(legendre_symbol(h, p), legendre_symbol(c1, p)))
```

### Oracle

#### Padding oracle

> [!important] TODO ...

## Signature

### (Another) Nonce reuse

> [!important] TODO ...
