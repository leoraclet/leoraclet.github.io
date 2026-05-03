---
title: DHKE Attacks
linkTitle: Attacks
tags:
- cybersecurity
- cryptography
- dhke
- attacks
- public-key
prev: /docs/cryptography/public-key/dhke
---

<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD013 -->

## Summary

> [!warning] Work in progress

## Small prime

If the prime $p$ is small enough, then the DLP is not hard enough and can thus be solved in little time with existing algorithms.

```python {linenos=table}
from sage.all import *

# Recover one of the secrets
a = discrete_log(Mod(A, p), Mod(g, p))
# Compute shared secret
s = g^a % p
```

## Smooth prime

The public prime modulus $p$ must be chosen such that $p=2q+1$ where $q$ is also a prime. If not, then $p-1$ might be a [smooth number](https://en.wikipedia.org/wiki/Smooth_number) (i.e a number having a lot of small factors).

If so, then the [Pohlig–Hellman algorithm](https://en.wikipedia.org/wiki/Pohlig%E2%80%93Hellman_algorithm) can be used to compute the discrete logarithm very quickly.

Sage uses this algorithm when necessary under the hood, so you can use the same function [presented above](#small-prime).

Now, here is a simple script to generate such smooth primes

```python {linenos=table,filename="smooth_prime_gen.py"}
from Crypto.Util.number import isPrime

def smooth_p(bit_length=256):
    mul = 1
    i = 1
    while 1:
        mul *= i
        if (mul + 1).bit_length() >= bit_length and isPrime(mul + 1):
            return mul + 1
        i += 1
```

> [!tip]
> In the case of $p-1$ being a [powersmooth number](https://en.wikipedia.org/wiki/Smooth_number#Powersmooth_numbers), you can use [Pollard's $p-1$](https://en.wikipedia.org/wiki/Pollard%27s_p_%E2%88%92_1_algorithm) algorithm that is specifically designed for such numbers.

## Small Subgroup Confinement Attack

This attack exploits the same vulnerability created by a smooth prime number. You can thus refer to the previous attacks to take advantage of it.

Nevertheless, here are some resources to read more about it.

- [Small Subgroup Attacks - Florianjw's blog](https://fiona.onl/insecure_generators.html)
- [Small-Subgroup-Confinement-Attack](https://github.com/Kiooku/Small-Subgroup-Confinement-Attack)
