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

### Modular (Multiplicative) Inverses

A modular inverse of $a$ modulo $m$ is a number $b$ such that:

$$
ab \equiv 1 \mod m
$$

An inverse exists **if and only if (iff)** $\gcd(a, m) = 1$ (i.e $a$ and $m$ are coprime).

**Uses**

Division is done via inverses:

$$
a \div b \equiv a \cdot b^{-1} \mod m
$$

## Rings

In modular arithmetic we work modulo some modulus $m$, and we can think of the numbers we are able to use this way as a group of numbers:

$$
\mathbb{Z}/m\mathbb{Z} = \{0,1,2,...,m-1\}
$$

This ring $\mathbb{Z}/m\mathbb{Z}$ is the _ring of integers modulo m_. We are able to add and multiply elements of this ring, then divide by $m$ and take the remainder to obtain an element in $\mathbb{Z}/m\mathbb{Z}$. There are [general rules which define this as a ring](https://www.britannica.com/science/ring-mathematics), including the need for associative addition and multiplication.

### Units of a Ring

As we discussed, $a \in \mathbb{Z}/m\mathbb{Z}$ has a modular multiplicative inverse if $gcd(a,m)=1$. The set of all numbers with modular inverses are denoted as $(\mathbb{Z}/m\mathbb{Z})^*$ - this is called the _group of units modulo_ $m$. Number which have inverses are called **units**.

For example:

$$
(\mathbb{Z}/12\mathbb{Z})^* = \{1,5,7,11\}
$$

You can think of the group of units modulo $12$ as essentially a set containing all numbers less than $12$ which are coprime with it.

### Fields

If every number in $\mathbb{Z}/m\mathbb{Z}$ has a modular inverse, it is promoted from a **ring** to a **field** (a field is a ring in which division is possible). Note that the only values of $m$ where this are possible are values which are prime, which is why these fields are usually denoted $\mathbb{F}_p$.

A **finite field** (also called a **Galois field**) is a field with a finite number of elements, such as those used in modular arithmetic. As a result, the term finite field will come up quite often to describe $\mathbb{F}_p$.


## Euler's Totient Function

[Euler's totient function](https://en.wikipedia.org/wiki/Euler%27s_totient_function) returns the number of elements in the group of units modulo $m$ . Mathematically, this means:

$$
\phi(m) = (\mathbb{Z}/m\mathbb{Z})^* = \{0 \leq a < m : gcd(a,m) = 1\}
$$

### Computing the Euler Totient

Because of the [Fundamental theorem of arithmetic](https://en.wikipedia.org/wiki/Fundamental_theorem_of_arithmetic), we know that any number $n > 1$ can be written as the product of powers of primes numbers, that is $n=p_1^{e_1} \cdot p_2^{e_2} \cdot (c\cdots)\cdot p_k^{e_k}$.

We then have

$$
\phi(n) = n \prod_{p \mid n} (1-\frac{1}{p})
$$

> [!tip]
> Note that if $p$ is prime, $\phi (p) = p-1$.

### Euler's Theorem

[Euler's theorem](https://en.wikipedia.org/wiki/Euler%27s_theorem) states that if $gcd(a,p)=1$ (i.e $a$ and $p$ are coprime) then

$$
a^{\phi(n)} \equiv 1 \mod n
$$

### Fermat's Little Theorem


Since $\phi(p)=p-1$, Fermat's Little Theorem states that:

$$
a^{p-1} \equiv 1 \mod p
$$

This was stated by Fermat over **100 years** before Euler's Theorem. In a sense, Euler's Theorem is a generalization of Fermat's Little Theorem.

You may note that this also gives us a quick way to compute the **modular multiplicative inverse** of $a$ in $\mathbb{F}_p$:

$$
\begin{aligned}
a^{p-1} &\equiv 1 \mod p \\
a^{p-1} \cdot a^{-1} &\equiv 1 \cdot a^{-1} \mod p \\
a^{p-2} &\equiv a^{-1} \mod p \\
\end{aligned}
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

When $p \equiv 1 \mod 4$, we can use a more general approach like the [Tonelli-Shanks algorithm](https://en.wikipedia.org/wiki/Tonelli%E2%80%93Shanks_algorithm) to find the square root of $a$ mod $p$.

You can directly use this algorithm with Sage like so

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

There is a unique solution $x \equiv a \mod N$ where $N=n_1 \cdot n_2 \cdot (\cdots) \cdot n_n$.

> [!note]
> Note "pairwise coprime integers" means that if we have a set of integers $\{n_1, n_2, \cdots, n_n\}$, all pairs of integers selected from the set are coprime (i.e $gcd(n_i,n_j)=1$ for $i \neq j$).

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
