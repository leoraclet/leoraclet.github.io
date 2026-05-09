---
title: Factorize
---

On this page, we'll cover all the different methods that exist to factorize a modulus $N$ into its prime factors $p$ and $q$, given information on those primes. This includes known or shared bits, special structure, or known bits (or the whole value) of other parameters of RSA.

It also covers more general methods that are more or less efficient depending on the primes, how they are generated, or their size.

## Base conversion

- [base_conversion.py](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/factorization/base_conversion.py)

> [!important] TODO

## Low hamming weight

> [!important] TODO

## Unbalanced Moduli

> [!important] TODO

### Known Bits

- [Factoring Unbalanced Moduli with Known Bits](https://eprint.iacr.org/2009/323)
- [Attack implementation](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/factorization/unbalanced.py)

> [!important] TODO

### Bits in common

- [Implicit factorization of unbalanced RSA moduli](https://eprint.iacr.org/2014/548.pdf)
- [Attack implementation](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/factorization/implicit.py)

> [!important] TODO

## Known bits of primes

In this section, we'll see how in some cases it is possible to recover the prime factors $p$ and $q$ of $N = pq$ if we know some contiguous *high* or *low* bits of one of the primes.

The following attacks are based on or are variants of the [Coppersmith's method](https://en.wikipedia.org/wiki/Coppersmith_method)

### Known MSB bits

> [!important] TODO

### Known LSB bits

> [!important] TODO

## Branch & Prune

> [!important] TODO

## Coppersmith's method

> [!important] TODO

## Resources

- [A Coding-Theoretic Approach to Recovering Noisy RSA Keys](https://eprint.iacr.org/2012/724.pdf)
- [RSA private key reconstruction from random bits using SAT solvers](https://eprint.iacr.org/2013/026.pdf)
- [Recovering cryptographic keys from partial information, by example](https://eprint.iacr.org/2020/1506.pdf)
