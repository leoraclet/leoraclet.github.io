---
title: Factorize
---

On this page, we'll cover all the different methods that exist to factorize a modulus $N$ into its prime factors $p$ and $q$, given information on those primes. This includes known or shared bits, special structure, or known bits (or the whole value) of other parameters of RSA.

It also covers more general methods that are more or less efficient depending on the primes, how they are generated, or their size.

## Special Structure

Given $N$, $p$, $q$, if

$$
\left\lceil N^{1/2}-\left\lfloor p^{1/2}\right\rfloor\cdot\left\lfloor q^{1/2}\right\rfloor\right\rfloor
$$

is a sufficiently small integer, then one can efficiently recover the prime factors from the modulus $N$ using the **Ghafar-Ariffin-Asbullah** attack.

```python {linenos=table,filename="gaa.py"}
# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/factorization/gaa.py
from math import ceil

from sage.all import ZZ
from sage.all import sqrt


def factorize(N, rp, rq):
    """
    Recovers the prime factors from a modulus using the Ghafar-Ariffin-Asbullah attack.
    More information: Ghafar AHA. et al., "A New LSB Attack on Special-Structured RSA Primes"
    :param N: the modulus
    :param rp: the value rp
    :param rq: the value rq
    :return: a tuple containing the prime factors
    """
    i = ceil(sqrt(rp * rq))
    x = ZZ["x"].gen()
    while True:
        sigma = (round(int(sqrt(N))) - i) ** 2
        z = (N - (rp * rq)) % sigma
        f = x ** 2 - z * x + sigma * rp * rq
        for x0 in f.roots(multiplicities=False):
            if x0 % rp == 0:
                p = int((x0 // rp) + rq)
                assert N % p == 0
                return p, N // p
            if x0 % rq == 0:
                p = int((x0 // rq) + rp)
                assert N % p == 0
                return p, N // p

        i += 1
```

## Shor's algorithm

The algorithm is as follows:

1. Choose a base $a$ coprime with $N$.
2. Find an integer $r$ such that $a^r \equiv 1 \mod N$ (this is the hard part).
3. Now, if $r$ is even, you can write

$$
\begin{aligned}
a^r &\equiv 1 \mod N \\
a^r - 1 &\equiv 0 \mod N \\
(a^{r/2} + 1)(a^{r/2} - 1) &\equiv 0 \mod N \\
(a^{r/2} + 1)(a^{r/2} - 1) &= N \\
(a^{r/2} + 1)(a^{r/2} - 1) &= p \cdot q
\end{aligned}
$$

4. You can calculate either $p$ or $q$ as either $a^{r/2} + 1$ or $a^{r/2} - 1$.
5. If $r$ is odd, use the same formula but with the decreasing factors of $r$.

You can read more about how the algorithm works on the [Wikipedia page](https://en.wikipedia.org/wiki/Shor%27s_algorithm#Classical_reduction), especially about the quantum order sub-routine from which the speed on quantum computers comes from.

```python {linenos=table,filename="shor_factorize.py"}
# Based on
# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/factorization/shor.py

from math import gcd, isqrt

def divisors(n):
    for i in range(1, isqrt(n) + 1):
        if n % i == 0:
            yield i

def factorize(N, a, s):
    """
    Recovers the prime factors from a modulus if the order of a mod n is known.
    More information: M. Johnston A., "Shor's Algorithm and Factoring: Don't Throw Away the Odd Orders"
    :param N: the modulus
    :param a: the base
    :param s: the order of a
    :return: a tuple containing the prime factors, or None if the factors were not found
    """
    assert pow(a, s, N) == 1, "s must be the order of a mod N"

    # Addition from my own post "FCSC 2026 - Crypto Write-Ups"
    # https://neutronys.com/blog/fcsc-2026-crypto/
    phi = (N // s) * s
    p_plus_q = N + 1 - phi
    p = abs(-p_plus_q + isqrt(p_plus_q**2 - 4*N)) // 2
    if 1 < p < N and N % p == 0:
        return p, N // p

    for r in divisors(s):
        b_r = pow(a, s // r, N)
        p = gcd(b_r - 1, N)
        if 1 < p < N and N % p == 0:
            return p, N // p

    return None
```

## Base conversion

- [base_conversion.py](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/factorization/base_conversion.py)

In the case of specially formed primes, it is easy to recover the prime factors $p$ and $q$ from a modulus $N$ by converting it to different bases. This can notably be used when the modulus bit pattern is not random/structured or when the Hamming weight of the modulus is low or high.

## Low hamming weight

> [!tip]
> See [this note](../attacks/#low-hamming-weight) for more details.

## Unbalanced Moduli

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

> [!tip]
> You can read a better written and more rigorous explanation in [this paper's section 4.2.2](https://eprint.iacr.org/2020/1506.pdf#subsubsection.4.2.2).

Suppose you have a $n$-bit modulus $N$ being the product of two primes $p$ and $q$ and that you know the $k$ **high** bits of $p$, noted $b$. Then, you can write

$$
p = 2^{n-k} \cdot b + u \quad \Rightarrow \quad 2^{n-k} \cdot b = p - u
$$

with $u$ the unknown bits.

With this value of $b$, you can create the polynomial

$$
\begin{aligned}
f(X) &= X + 2^{n-k} \cdot b &\mod N \\
&= X + (p - u) &\mod N \\
&= X - u &\mod p \\
\end{aligned}
$$

which has $p - u$ as a root mod $N$, but more importantly a root $u$ mod $p$.

If you know enough bits of $p$ (i.e. $k$ is large enough compared to $n$), then $u$ is small enought to be a small root of $f(X)$ mod $p$ and you can thus efficiently calculate it using **Coppersmith's method**.

Now that you know $u$, you can simply calculate $p = 2^{n-k} \cdot b + u$ to recover one of the prime factors of $N$.

```python {linenos=table,filename="factorize_msb.py"}
p = random_prime(2^512)
q = random_prime(2^512)
N = p*q
k = 512 // 3
b = p >> k

def attack(N, b, k):
    """
    Recover
    :param N: Public modulus
    :param b: The known bits of p as a number
    :param k: The number of known consecutive bits
    """

    X = 2^k
    b = X * b
    M = matrix([[X^2, 2*X*b, b^2], [0, X, b], [0, 0, N]])
    B = M.LLL()

    Q = B[0][0]*x^2/X^2 + B[0][1]*x/X + B[0][2]

    p = b + Q.roots(ring=ZZ)[0][0]
    if 1 < p < N and N % p == 0:
        return p, N // p
    else:
        return 0, 0

p, q = attack(N, b, k)
assert p * q == N
```

> [!note]
> You can find in [this repo](https://github.com/mimoo/RSA-and-LLL-attacks) a simpler and Sage-oriented implementation making use of [Sage's built-in function for `small_roots`](https://doc.sagemath.org/html/en/reference/polynomial_rings/sage/rings/polynomial/polynomial_modn_dense_ntl.html#sage.rings.polynomial.polynomial_modn_dense_ntl.Polynomial_dense_mod_n.small_roots).

### Known LSB bits

The reasoning is exactly the same as presented [above](#known-msb-bits), except for the fact that in this case you write

$$
p = 2^{k} \cdot u + b \quad \Rightarrow \quad b = p - 2^{k} \cdot u
$$

with $k$ **low** bits known of $p$, and

$$
\begin{aligned}
f(X) &= X + b &\mod N \\
&= X + (p - 2^{k} \cdot u) &\mod N \\
&= X - 2^{k} \cdot u &\mod p \\
\end{aligned}
$$

### Known middle bits

> [!tip]
> As before, you can find a better written and more rigorous explanation in [this paper's section 4.2.4](https://eprint.iacr.org/2020/1506.pdf#subsubsection.4.2.4).

### Known bits chunks

> [!tip]
> Again, you check this [this paper's section 4.2.5](https://eprint.iacr.org/2020/1506.pdf#subsubsection.4.2.4).

### Many random bits

In the case where the attacker has knowledge of many non-contiguous bits of both $p$ and $q$ randomly spread out, they can use the **Branch and Prune** method to iteratively find the missing bits of information from the factors $p$ and $q$.

You can check [this code](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/factorization/branch_and_prune.py) for a good implementation of this attack.

## Resources

- [Reconstructing RSA Private Keys from Random Key Bits](https://eprint.iacr.org/2008/510.pdf)
- [A Coding-Theoretic Approach to Recovering Noisy RSA Keys](https://eprint.iacr.org/2012/724.pdf)
- [RSA private key reconstruction from random bits using SAT solvers](https://eprint.iacr.org/2013/026.pdf)
- [Recovering cryptographic keys from partial information, by example](https://eprint.iacr.org/2020/1506.pdf)
