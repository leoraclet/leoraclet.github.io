---
title: Mersenne Twister (MT19937)
linkTitle: MT19937
tags:
- cybersecurity
- cryptography
- rng
- mersenne-twister
- mt19937
---

The [**Mersenne Twister**](https://en.wikipedia.org/wiki/Mersenne_Twister) is a widely used pseudorandom number generator (PRNG). Its most popular variant, **MT19937**, is based on the [Mersenne prime](https://en.wikipedia.org/wiki/Mersenne_prime) $2^{19937} - 1$.

## Python Attacks

In its most common implementation, this PRNG has a period length of 624, after which it cycles back. This means that, given enough generated outputs, one can predict the future outputs of the generator or even recover the initial state. This allows the recovery of all past generated values and all the ones to come.

It is also possible that, given two outputs separated by a fixed number of intermediate generations, the implementation may allow state recovery or output prediction, as seen in the last attack.

### Known 32-bit outputs

- [Known 32-bit Outputs: getrandbits(32)](https://jia.je/ctf-writeups/misc/pyrand.html#known-32-bit-outputs-getrandbits32)

### Known 1-bit outputs

- [Known getrandbits(1)](https://jia.je/ctf-writeups/misc/pyrand.html#known-getrandbits1)

### Known partial 16-bits

- [Known partial bits of getrandbits(16)](https://jia.je/ctf-writeups/misc/pyrand.html#known-partial-bits-of-getrandbits16)

### Only 6 known ouputs

- [Stackered - Seed recovery from few outputs](https://stackered.com/blog/python-random-prediction/#seed-recovery-from-few-outputs)

### Only 2 known outputs

- [TetCTF 2020 - (Crypto) 2020th Write-up](https://github.com/bachpc/TetCTF-2020/blob/master/2020th/2020th.ipynb)

## PHP Attacks

### Only 2 known values

- [Breaking PHP's mt_rand() with 2 values and no bruteforce](https://blog.lexfo.fr/php-mt-rand-prediction.html)
- [GitHUb - mt_rand-reverse](https://github.com/ambionics/mt_rand-reverse/tree/master)

## Resources

- [Python Random Number Generator (MT19937) Attacks](https://jia.je/ctf-writeups/misc/pyrand.html)
- [Breaking Python's PRNG with a few values and no bruteforce](https://stackered.com/blog/python-random-prediction/)
