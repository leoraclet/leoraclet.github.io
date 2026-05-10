---
title: NTRU
linkTitle: NTRU
tags:
- cybersecurity
- cryptography
- lattices
- ntru
- public-key
---

[NTRU](https://en.wikipedia.org/wiki/NTRU) is an open-source public-key cryptosystem that uses lattice-based cryptography to encrypt and decrypt data.

## Basics

> [!important] TODO

## Attacks

In this section, I will present some basic and common attacks against the NTRU cryptosystem.

### Weak parameters

```python {linenos=table,filename="ntru-weak-parameter.py"}
##############################################
# BUILD MATRIX
##############################################
_h = h.list()
_h = _h + [0] * (N - len(_h))
B = identity_matrix(ZZ, 2 * N)
# Puts the value of q along the bottom right diagonal.
for i in range(N, 2 * N):
    B[i, i] = q
# The rotations of the public key in the top right quadrant
for i in range(N):
    B[i, N:] = vector(_h[-i:] + _h[:-i])

alpha = 20
B[:80, :80] *= alpha

lol = B.BKZ()
for a in lol.rows():
    f = a[:80] / alpha
    f = [int(e) for e in f]
    guesses = [f, f[::-1], -1 * f, -1 * f[::-1]]
    for guess in guesses:
        if not all([1 if e == 0 else 0 for e in guess]):
            try:
                guess_f = R(guess)
                fp = ntru.invertmodprime(guess_f, ntru.p)
                fq = (
                    ntru.invertmodpowerof2(guess_f, ntru.q)
                    if ntru.q % 2 == 0
                    else ntru.invertmodprime(guess_f, ntru.q)
                )
                ntru.secretkey = guess_f, fp
                f_dec = ntru.decrypt_poly(e0)
                roots = (f_dec - target).roots()
                if roots:
                    return roots[0][0]
                roots = (-f_dec - target).roots()
                if roots:
                    return roots[0][0]
            except Exception as e:
                pass
```

### Multiple Ciphertexts

When the same public modulus $q$ is used to encrypt the same message $m$ multiple times to ciphertexts $e_0, e_1, \dots, e_i$, then you can use those ciphertexts to retrieve the original message $m$.

```python {linenos=table,filename="ntru-mulitple-ciphertexts.py"}
def recover_m_from_multiple_ciphertexts():
    """
    Recover the message m from multiple NTRU ciphertexts e_i.

    Args:
        e (list): List of ciphertext polynomials e_i.
        h (sage.rings.polynomial.polynomial_ring_element.Polynomial): Public key polynomial.
        N (int): Ring degree.
        q (int): Public modulus.

    Returns:
        sage.rings.polynomial.polynomial_ring_element.Polynomial: Recovered message polynomial m.
    """

    # Step 1: Compute differences e_i - e_0
    e0 = e[0]
    diffs = [ei - e0 for ei in e[1:]]
    diffs_r = []

    h_inv = ntru.invertmodpowerof2(h, q)
    for d in diffs:
        d_r = ntru.centerLift(ntru.convolution_rp(d, h_inv / p), q)
        diffs_r.append(d_r)

    diff_poly = [0] * 503
    for d_r in diffs_r:
        for i in range(503):
            tmp = d_r.list()
            tmp = tmp + [0] * (503 - len(tmp))
            if tmp[i] == -2:
                diff_poly[i] = 1
            elif tmp[i] == 2:
                diff_poly[i] = -1

    r0 = R(diff_poly)
    f = ntru.centerLift(e0 - ntru.convolution_rp(r0, h * p), q)
    return (f - target).roots()[0][0]
```

## Resources

- [The Mathematics of the NTRU Public Key Cryptosystem](https://nitaj.users.lmno.cnrs.fr/ntru3final.pdf)
- [Introduction to NTRU Public Key Cryptosystem](https://hoseinhadipour.com/course-cryptanalysis/Slides/Main/NTRU.pdf)
- [The NTRU cryptosystem](https://shrek.unideb.hu/~tengely/crypto/section-8.html)
- [NTRU: A Ring-Based Public Key Cryptosystem](https://www.ntru.org/f/hps98.pdf)
- [A Simple and Efficient Key Reuse Attack on NTRU Cryptosystem](https://eprint.iacr.org/2019/1022.pdf)
