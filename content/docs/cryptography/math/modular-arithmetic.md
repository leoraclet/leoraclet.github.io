---
title: Modular Arithmetic
linkTitle: Mod Arithmetic
tags:
- cybersecurity
- cryptography
- modular-arithmetic
- math
---

## The Basics

Modular arithmetic works by taking remainders after division by a modulus $m$.
Two numbers are congruent modulo $m$ if their difference is divisible by $m$.

$$
11 + 3 = 14 \equiv 2 \mod 12
$$

## Modular (Multiplicative) Inverses

A modular inverse of $a$ modulo $m$ is a number $b$ such that:

$$
ab \equiv 1 \mod m
$$

An inverse exists **iff** $\gcd(a, m) = 1$.

### Uses

Division is done via inverses:

$$
a \div b \equiv a \cdot b^{-1} \mod m
$$

## Quadratic Residues

A number $x$ is a quadratic residue mod $p$ if:

$$
a^2 \equiv x \mod p
$$

Not all elements have square roots (about $50\%$ do in $\mathbb{F}_p$).

### Legendre Symbol

Determine if $a$ is a quadratic residue:

$$
\left(\frac{a}{p}\right) \equiv a^{\frac{p-1}{2}} \mod p = \left\{\begin{array}{l}
+1 \quad \text{if}\ a \ \text{is a quadratic residue and} \ a \neq 0 \mod p \\
-1 \quad \text{if}\ a \ \text{is a quadratic non-residue mod}\ p \\
\pm 0 \quad \text{if}\ a \equiv 0 \mod p \\
\end{array} \right.
$$

### Square root

#### Simple case

In the case that $p \equiv 3 \mod 4$, then

$$
x = a^{\frac{p+1}{4}} \mod p
$$

is the square root of $a$ mod $p$.

#### Tonelli-Shanks algorithm

Used when $p \equiv 1 \mod 4$.

```python {linenos=table,filename="mod_square_root.py"}
from sage.rings.finite_rings.integer_mod import square_root_mod_prime

print(square_root_mod_prime(Mod(a, p), p))
```


## Chinese Remainder Theorem

The [Chinese Remainder Theorem](https://en.wikipedia.org/wiki/Chinese_remainder_theorem) gives a unique solution to a set of linear congruences if their moduli are coprime.

This means, that given a set of arbitrary integers $a_i$, and pairwise coprime integers $n_i$, such that the following linear congruences hold:

$$
\begin{align}
x &\equiv a_1 \mod n_1 \\
x &\equiv a_2 \mod n_2 \\
&\vdots \quad \\
x &\equiv a_n \mod n_k \\
\end{align}
$$

There is a unique solution $x \equiv a \mod N$ where $N=n^1 \cdot n^2 \cdot ... \cdot n^n$.

> [!note]
> Note "pairwise coprime integers" means that if we have a set of integers $\{n^1, n^2, ..., n^n\}$, all pairs of integers selected from the set are coprime (i.e $gcd(n^i,n^j)=1$).

## Modular binary shifts

### Left shift

To do a binary **left shift** of a number $a$ by $i$ in the integers is equivalent to mulitply $a$ by $2^i$.

> [!warning] To be continued ...

### Right shift

To do a binary **right shift** of a number $a$ by $i$ in the integers is equivalent to mulitply $a$ by $2^{-i}$.

> [!warning] To be continued ...

## Useful properties

Here is a non-exhaustive list of some useful and cool properties in modular arithmetic; some may seem obvious, while others are less intuitive.

1. Given a prime number $p$ and a random integer $x$, we have $h = (q+1)^x \equiv qx + 1 \mod q^2$ by the binomial formula.

    We can then calculate $x = \frac{h - 1}{q}$

    > [!tip]
    > In the case which $x = q$, then we have $(q+1)^q \equiv q^2 + 1 \equiv 1 \mod q^2$

2. Suppose we have a number $n$, then for every integer $m < \frac{N}{2}$, we have $m \equiv m$ (mod $n - m)$


## Resources

- [Wikipedia - Fermat's little theorem](https://en.wikipedia.org/wiki/Fermat%27s_little_theorem#Pseudoprimes)
- [Wikipedia - Modular arithmetic](https://en.wikipedia.org/wiki/Modular_arithmetic)
- [Discrete logarithm modulo powers of a small prime - Stack Exchange](https://math.stackexchange.com/questions/1863037/discrete-logarithm-modulo-powers-of-a-small-prime)
