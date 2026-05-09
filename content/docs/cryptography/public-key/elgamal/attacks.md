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
  - [Non reuse: 2](#nonce-reuse-2)
  - [Existantial forgery](#existantial-forgery)
  - [Forgery](#forgery)

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
# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/elgamal_encryption/nonce_reuse.py
def attack(p, m, c1, c2, c1_, c2_):
    """
    Recovers a secret plaintext encrypted using the same nonce as a previous, known plaintext.
    :param p: the prime used in the ElGamal scheme
    :param m: the known plaintext
    :param c1: the ciphertext of the known plaintext
    :param c2: the ciphertext of the known plaintext
    :param c1_: the ciphertext of the secret plaintext
    :param c2_: the ciphertext of the secret plaintext
    :return: the secret plaintext
    """
    s = c2 * pow(m, -1, p) % p
    m_ = c2_ * pow(s, -1, p) % p
    return int(m_)
```

### Unsafe generator

If the chosen generator $g$ is not safe, one can calculate the [Legendre symbol](/docs/cryptography/math-fundamentals/modular-arithmetic/#legendre-symbol) of the underlying message $m$ from its ciphertext $(c_1, c_2)$ as

$$
\left(\frac{m}{p}\right) = \frac{\left(\frac{c_2}{p}\right)}{max \left\{ \left(\frac{h}{p}\right), \left(\frac{c_1}{p}\right) \right\}}
$$

Thus revealing some information on the message $m$.

```python {linenos=table,filename="unsafe_generator.py"}
# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/elgamal_encryption/unsafe_generator.py
from sage.all import legendre_symbol

def attack(p, h, c1, c2):
    """
    Returns the Legendre symbol of the message encrypted using an unsafe generator.
    :param p: the prime used in the ElGamal scheme
    :param h: the public key
    :param c1: the ciphertext
    :param c2: the ciphertext
    :return: the Legendre symbol
    """
    return int(legendre_symbol(c2, p) // max(legendre_symbol(h, p), legendre_symbol(c1, p)))
```

### Fault Attack

- [ElGamal ECC](https://ctf-wiki.mahaloz.re/crypto/asymmetric/discrete-log/ecc/)
- [Fault Attacks on ElGamal-Type Cryptosystems](https://staff.fim.uni-passau.de/kreuzer/papers/ElGamal_FaultAttack-preprint.pdf)

### Oracle

#### Padding oracle

> [!important] TODO ...

## Signature

Those attacks cover the ElGamal signature scheme.

### Nonce reuse: 2

Given two messages $m_1$ and $m_2$ with their respective signatures $(r_1, s_1)$ and $(r_2, s_2)$, if they were generated using the same nonce $k$, an attacker can recover $k$ and the private key from the given information alone. Let's see how.

You're given

$$
\begin{aligned}
r_1 &= g^k \mod p \\
r_2 &= g^k \mod p \\
\\
s_1 &= (H(m_1) - xr_1)k^{-1} \mod (p - 1) \\
s_2 &= (H(m_2) - xr_2)k^{-1} \mod (p - 1) \\
\end{aligned}
$$

from which you can calculate

$$
\begin{aligned}
s_1 - s_2 &= (H(m_1) - xr_1)k^{-1} - (H(m_2) - xr_2)k^{-1} &\mod (p - 1) \\
&= (H(m_1) - xr_1 - H(m_2) + xr_2)k^{-1}  &\mod (p - 1) \\
&= (H(m_1) - H(m_2))k^{-1} &\mod (p - 1) \\
\end{aligned}
$$

and

$$
H(m_1) - H(m_2) \mod (p - 1)
$$

because you know the hash function used $H$.

From this, you can now the solve for $k$ the following congruence equation

$$
(H(m_1) - H(m_2))k^{-1} = s_1 - s_2 \mod m
$$

> [!tip] Coprime numbers
> In general, $s_1 - s_2$ is most likely **not** coprime with $p-1$. However, if it is, you can directly calculate
>
> $$k = \frac{H(m_1) - H(m_2)}{s_1 - s_2} \mod (p-1)$$
>
> because $s_1 - s_2$ is invertible modulo $p-1$.

```python {linenos=table,filename="nonce_reuse.py"}
from math import gcd

# https://github.com/jvdsn/crypto-attacks/blob/master/shared/__init__.py
def solve_congruence(a, b, m):
    """
    Solves a congruence of the form ax = b mod m.
    :param a: the parameter a
    :param b: the parameter b
    :param m: the modulus m
    :return: a generator generating solutions for x
    """
    g = gcd(a, m)
    a //= g
    b //= g
    n = m // g
    for i in range(g):
        yield (pow(a, -1, n) * b + i * n) % m

# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/elgamal_signature/nonce_reuse.py
def attack(p, m1, r1, s1, m2, r2, s2):
    """
    Recovers the nonce and private key from two messages signed using the same nonce.
    :param p: the prime used in the ElGamal scheme
    :param m1: the first message
    :param r1: the signature of the first message
    :param s1: the signature of the first message
    :param m2: the second message
    :param r2: the signature of the second message
    :param s2: the signature of the second message
    :return: generates tuples containing the possible nonce and private key
    """
    for k in solve_congruence(s1 - s2, m1 - m2, p - 1):
        for x in solve_congruence(r1, m1 - k * s1, p - 1):
            yield int(k), int(x)
```

### Existantial forgery

- [Wikipedia - ElGamal signature scheme: Existential forgery](https://en.wikipedia.org/wiki/ElGamal_signature_scheme#Existential_forgery)

When no hash function is used and the message $m$ is instead directly used in the signing algorithm, it is then possible for an attacker, given a valid signature $(r, s)$ of a message $m$, to forge a valid signature for a message $m' = e \cdot s$ for a chosen value of $e \in [1, p - 2]$.

To do so, simply chose a number $e \in [1, p - 2]$, then compute

$$
\begin{aligned}
r' &= g^e y \mod p \\
s' &= -r \mod (p - 1) \\
\end{aligned}
$$

The tuple $(r', s')$ is therefore a valid signature of the message $m' = e \cdot s$.

### Forgery

If the generator $g$ (or $\alpha$) is badly chosen then signatures on every given message can be found without knowing the secet key.

More precisely, as stated in [this paper](https://crypto.ethz.ch/publications/files/Bleich96.pdf) at **Corollary 2**:

> If $\alpha$ is smooth and divides $p - 1$ then it is possible to generate a valid ElGamal signature on an arbitrary value $h$ if $p \equiv 1 \mod 4$ and on one half of the values $0 < h < p$ if $p \equiv 3 \mod 4$.

To do so for any given message $m$, calculate

$$
\begin{aligned}
k &= \frac{p - 3}{2} \\
r &= \frac{p - 1}{g} \\
s &= (m - r)k^{-1} \mod (p - 1) \\
\end{aligned}
$$

The tuple $(r, s)$ is therefore a valid signature of the message $m$.
