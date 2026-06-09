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
> In the case of $p-1$ being a [powersmooth number](https://en.wikipedia.org/wiki/Smooth_number#Powersmooth_numbers), you can use [Pollard's p-1](https://en.wikipedia.org/wiki/Pollard%27s_p_%E2%88%92_1_algorithm) algorithm that is specifically designed for such numbers.

### Small exponent

In the case where one of the secret exponents $a$ or $b$ is **small** (i.e., not of the same order as the field defined by $p$) and $p-1$ is a smooth enough number, then you can use an approximation of the **Pohlig–Hellman algorithm** by taking into account only the small factors of $p-1$ (as long as their product is of the order of the small exponent) to recover the exponent.

```python {linenos=table,filename="small_exponent.py"}
# Taken and adapted to Python 3 from
# https://github.com/ashutosh1206/Crypton/blob/master/Discrete-Logarithm-Problem/Algo-Pohlig-Hellman/pohlig_hellman.py

from Crypto.Util.number import GCD


def crt(list_a, list_m):
    try:
        assert len(list_a) == len(list_m)
    except:
        print("[+] Length of list_a should be equal to length of list_m")
        return -1
    for i in range(len(list_m)):
        for j in range(len(list_m)):
            if GCD(list_m[i], list_m[j]) != 1 and i != j:
                print("[+] Moduli should be pairwise co-prime")
                return -1
    M = 1
    for i in list_m:
        M *= i
    list_b = [M // i for i in list_m]
    assert len(list_b) == len(list_m)
    try:
        assert [GCD(list_b[i], list_m[i]) == 1 for i in range(len(list_m))]
        list_b_inv = [int(inverse(list_b[i], list_m[i])) for i in range(len(list_m))]
    except:
        print("[+] Encountered an unusual error while calculating inverse using gmpy2.invert()")
        return -1
    x = 0
    for i in range(len(list_m)):
        x += list_a[i] * list_b[i] * list_b_inv[i]
    return x % M


def brute_dlp(g, y, p):
    mod_size = len(bin(p - 1)[2:])
    sol = pow(g, 2, p)
    if y == 1:
        return 0
    if y == g:
        return 1
    if sol == y:
        return 2
    i = 3
    while i <= p - 1:
        sol = sol * g % p
        if sol == y:
            return i
        i += 1
    return None


def pohlig_hellman_pp(g, y, p, q, e):
    try:
        # Assume q is a factor of p-1
        assert (p - 1) % q == 0
    except:
        print("[-] Error! q**e not a factor of p-1")
        return -1

    # a = a_0*(q**0) + a_1*(q**1) + a_2*(q**2) + ... + a_(e-1)*(q**(e-1)) + s*(q**e)
    # where a_0, a_1, a_2, ..., a_(e-1) belong to {0,1,...,q-1} and s is some integer
    a = 0

    b_j = y
    alpha = pow(g, (p - 1) // q, p)
    for j in range(e):
        y_i = pow(b_j, (p - 1) // (q ** (j + 1)), p)
        a_j = brute_dlp(alpha, y_i, p)
        assert a_j >= 0 and a_j <= q - 1
        a += a_j * (q**j)

        multiplier = pow(g, a_j * (q**j), p)
        assert GCD(multiplier, p) == 1
        b_j = (b_j * inverse(multiplier, p)) % p
    return a


def pohlig_hellman(g, y, p, list_q):
    x_list = [pohlig_hellman_pp(g, y, p, list_q[i], 1) for i in range(len(list_q))]
    mod_list = [list_q[i] for i in range(len(list_q))]
    return crt(x_list, mod_list)
```

## Small Subgroup Attack

This attack exploits the same vulnerability created by a smooth prime number. You can thus refer to the previous attacks to take advantage of it.

Nevertheless, here are some resources to read more about it.

- [Small Subgroup Attacks - Florianjw's blog](https://fiona.onl/insecure_generators.html)
- [Small-Subgroup-Confinement-Attack](https://github.com/Kiooku/Small-Subgroup-Confinement-Attack)
