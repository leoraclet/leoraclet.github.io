---
title: Shamir's secret sharing (SSS)
linkTitle: SSS
tags:
- cybersecurity
- cryptograhy
- sss
- public-key
prev: /docs/cryptography/public-key
next: /docs/cryptography/public-key/sss/attacks
---

[**Shamir's secret sharing**](https://en.wikipedia.org/wiki/Shamir%27s_secret_sharing) (SSS) is an efficient secret sharing algorithm for distributing private information among a group, first developed by [Adi Shamir](https://en.wikipedia.org/wiki/Adi_Shamir) in 1979.

## Basics

Assume that the secret $S$ can be represented as an element $a_0$ of a finite field $\mathbb{GF}(p)$ (where $q$ is greater than the number $n$ of shares being generated). Randomly choose $k-1$ elements, $a_1, \dots, a_{k-1}$, from $\mathbb{GF}(p)$ and construct the polynomial:

$$f(x) = a_0 + a_1 x + a_2 x^2 + \cdots + a_{k-1} x^{k-1} \mod p$$

Compute any $n$ points on the curve, for instance, set $i = 1, \dots, n$ to find points $(i, f(i))$ and every participant is given a point (a non-zero input to the polynomial, and the corresponding output). Given any subset of $k$ of these pairs, $a_0$ can be obtained using interpolation, with one possible formula for doing so being:

$$
a_0 = f(0) = \sum_{j=0}^{k-1} y_j \prod_{\substack{m=0 \\ m \neq j}}^{k-1} \frac{x_m}{x_m - x_j} \mod p
$$

where the list of points on the polynomial is given as $k$ pairs of the form $(x_i, y_i)$. Note that $f(0)$ is equal to the first coefficient of the polynomial $f(x)$, which is our secret $S$.

---

Here is the Python implementation, directly taken from [Wikipedia's page](https://en.wikipedia.org/wiki/Shamir's_secret_sharing#Python_code)

```python {linenos=table,filename="shamir_secret_sharing.py"}
"""
The following Python implementation of Shamir's secret sharing is
released into the Public Domain under the terms of CC0 and OWFa:
https://creativecommons.org/publicdomain/zero/1.0/
http://www.openwebfoundation.org/legal/the-owf-1-0-agreements/owfa-1-0

See the bottom few lines for usage. Tested on Python 2 and 3.
"""

from __future__ import division
from __future__ import print_function

import random
import functools

# 12th Mersenne Prime
_PRIME = 2 ** 127 - 1

_RINT = functools.partial(random.SystemRandom().randint, 0)

def _eval_at(poly, x, prime):
    """Evaluates polynomial (coefficient tuple) at x, used to generate a
    shamir pool in make_random_shares below.
    """
    accum = 0
    for coeff in reversed(poly):
        accum *= x
        accum += coeff
        accum %= prime
    return accum

def make_random_shares(secret, minimum, shares, prime=_PRIME):
    """
    Generates a random shamir pool for a given secret, returns share points.
    """
    if minimum > shares:
        raise ValueError("Pool secret would be irrecoverable.")
    poly = [secret] + [_RINT(prime - 1) for i in range(minimum - 1)]
    points = [(i, _eval_at(poly, i, prime))
              for i in range(1, shares + 1)]
    return points

def _extended_gcd(a, b):
    """
    Division in integers modulus p means finding the inverse of the
    denominator modulo p and then multiplying the numerator by this
    inverse (Note: inverse of A is B such that A*B % p == 1). This can
    be computed via the extended Euclidean algorithm
    http://en.wikipedia.org/wiki/Modular_multiplicative_inverse#Computation
    """
    x = 0
    last_x = 1
    y = 1
    last_y = 0
    while b != 0:
        quot = a // b
        a, b = b, a % b
        x, last_x = last_x - quot * x, x
        y, last_y = last_y - quot * y, y
    return last_x, last_y

def _divmod(num, den, p):
    """Compute num / den modulo prime p

    To explain this, the result will be such that:
    den * _divmod(num, den, p) % p == num
    """
    inv, _ = _extended_gcd(den, p)
    return num * inv

def _lagrange_interpolate(x, x_s, y_s, p):
    """
    Find the y-value for the given x, given n (x, y) points;
    k points will define a polynomial of up to kth order.
    """
    k = len(x_s)
    assert k == len(set(x_s)), "points must be distinct"
    def PI(vals):  # upper-case PI -- product of inputs
        accum = 1
        for v in vals:
            accum *= v
        return accum
    nums = []  # avoid inexact division
    dens = []
    for i in range(k):
        others = list(x_s)
        cur = others.pop(i)
        nums.append(PI(x - o for o in others))
        dens.append(PI(cur - o for o in others))
    den = PI(dens)
    num = sum([_divmod(nums[i] * den * y_s[i] % p, dens[i], p)
               for i in range(k)])
    return (_divmod(num, den, p) + p) % p

def recover_secret(shares, prime=_PRIME):
    """
    Recover the secret from share points
    (points (x,y) on the polynomial).
    """
    if len(shares) < 3:
        raise ValueError("need at least three shares")
    x_s, y_s = zip(*shares)
    return _lagrange_interpolate(0, x_s, y_s, prime)

def main():
    """Main function"""
    secret = 1234
    shares = make_random_shares(secret, minimum=3, shares=6)

    print('Secret:                                                     ',
          secret)
    print('Shares:')
    if shares:
        for share in shares:
            print('  ', share)

    print('Secret recovered from minimum subset of shares:             ',
          recover_secret(shares[:3]))
    print('Secret recovered from a different minimum subset of shares: ',
          recover_secret(shares[-3:]))

if __name__ == '__main__':
    main()
```

## Attacks

### Share forgery

Assuming the attacker has one correct share $(x_1, y_1)$, know the $x$-coordinates of everyone ($x_1, x_2, \dots, x_k$) and the secret $S$, he can then modify his share to make the recombined secret any secret $S'$ he wants.

To do so, he modifies his share as follows:

$$y'_1 = y_1 + (S' - S)\prod_{j=2}^{k}\frac{x_j - x_1}{x_j}$$

It works because of how the secret is recovered, given the shares, using [Lagrange basis polynomials](https://en.wikipedia.org/wiki/Lagrange_polynomial). The recombination can be expressed as:

$$
S = \sum_{i=1}^k y_i \prod_{j=1, j \ne i}^{k}\frac{x_j}{x_j - x_i} \mod p
$$

By including their modified share, the attacker changes this to:

$$
\left(y_1 + (S' - S)\prod_{j=2}^{k}\frac{x_j - x_1}{x_j}\right)\prod_{j=2}^{k}\frac{x_j}{x_j - x_1} + \sum_{i=2}^k y_i \prod_{j=1, j \ne i}^{k}\frac{x_j}{x_j - x_i} \mod p
$$

This simplifies to :

$$(S' - S)\prod_{j=2}^{k}\frac{x_j - x_1}{x_j}\prod_{j=2}^{k}\frac{x_j}{x_j - x_1} + \sum_{i=1}^k y_i \prod_{j=1, j \ne i}^{k}\frac{x_j}{x_j - x_i}$$

which ultimately simplifies to $S'$, our target secret.

```python {linenos=table,filename="share_forgery"}
# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/shamir_secret_sharing/share_forgery.py
def attack(p, s, s_, x, y, xs):
    """
    Forges a share to recombine into a new shared secret, s', if a single share and the x coordinates of the other participants are given.
    :param p: the prime used for Shamir's secret sharing
    :param s: the original shared secret
    :param s_: the target shared secret, s'
    :param x: the x coordinate of the given share
    :param y: the y coordinate of the given share
    :param xs: the x coordinates of the other participants (excluding the x coordinate of the given share)
    :return: the forged share
    """
    const = 1
    for i in xs:
        const *= i * pow(i - x, -1, p)

    return ((s_ - s) * pow(const, -1, p) + y) % p
```

### Deterministic coefficients

If the coefficients of the underlying polynomial are deterministic (i.e., predictable), then you can easily recover all the coefficients given that you know at least the first coefficient $a_1$ (not $a_0$, because it's the secret we're looking for) and the way they are generated.

Now, if you happen to know one correct share $(x, y)$ and $k$, the number of shares needed to unlock the secret, you can recover the latter by calculating:

$$
S = y - \sum_{i=1}^{k} f(a_{i-1}) \cdot x^i \mod p
$$

with $f(x)$ being an oracle that, given a coefficient, returns the next generated one.

```python {linenos=table,filename="deterministic_coefficients.py"}
# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/shamir_secret_sharing/deterministic_coefficients.py
def attack(p, k, a1, f, x, y):
    """
    Recovers the shared secret if the coefficients are generated deterministically, and a single share is given.
    :param p: the prime used for Shamir's secret sharing
    :param k: the amount of shares needed to unlock the secret
    :param a1: the first coefficient of the polynomial
    :param f: a function which takes a coefficient and returns the next coefficient in the polynomial
    :param x: the x coordinate of the given share
    :param y: the y coordinate of the given share
    :return: the shared secret
    """
    s = y
    a = a1
    for i in range(1, k):
        s -= a * x ** i
        a = f(a)

    return s % p
```

### Small coefficients

If the coefficients $a_0, a_1, \cdots, a_{k-1}$ of the polynomial are *small* in $\mathbb{F}_p$, then given $i$ shares out of the $k$ minimum necessary to reconstruct the polynomial, one can use the [**LLL**](https://fr.wikipedia.org/wiki/Algorithme_LLL) algorithm to recover those coefficients, and thus the secret.

Given those shares, you can write the following system of linear equations

$$
\begin{aligned}
\left\{\begin{aligned}
y_1 = a_0 + a_1 x_1 + a_2 x_1^2 + &\cdots + a_{k-1} x_1^{k-1} \mod p \\
y_2 = a_0 + a_1 x_2 + a_2 x_2^2 + &\cdots + a_{k-1} x_2^{k-1} \mod p \\
&\vdots \\
y_i = a_0 + a_1 x_i + a_2 x_i^2 + &\cdots + a_{k-1} x_i^{k-1} \mod p \\
\end{aligned}\right. \\
\\
\Longleftrightarrow \quad \left\{\begin{aligned}
y_1 - a_0 + a_1 x_1 + a_2 x_1^2 + &\cdots + a_{k-1} x_1^{k-1} + h_1 p = 0 \\
y_2 - a_0 + a_1 x_2 + a_2 x_2^2 + &\cdots + a_{k-1} x_2^{k-1} + h_2 p = 0 \\
&\vdots \\
y_i - a_0 + a_1 x_i + a_2 x_i^2 + &\cdots + a_{k-1} x_i^{k-1} + h_i p = 0 \\
\end{aligned}\right. \\
\end{aligned}
$$

From those equations, we can build our *base* for the LLL algorithm in the form of the following block matrix :

$$
L = \left[\begin{array}{c|c}
\begin{matrix}
-y_1 & -y_2 & \cdots & -y_i \\
1 & 1 & \cdots & -1 \\
x_1 & x_2 & \cdots & x_i \\
x_1^2 & x_2^2 & \cdots & x_i^2 \\
\vdots & \vdots & \ddots & \vdots \\
x_1^{k-1} & x_2^{k-1} & \cdots & x_i^{k-1} \\
\end{matrix} &
\begin{matrix}
1 &  & & & &  \\
& 1 & & & & \\
&  & 1 & & & \\
&  &  & 1 & & \\
&  &  & & \ddots & \\
&  &  & &  & 1 \\
\end{matrix} \\
\hline
\begin{matrix}
p & & & & & \\
 & p & & & & \\
 &  & p & & & \\
 &  & & \ddots & & \\
  &  & & & & p \\
\end{matrix} &
\begin{matrix}
0 & 0 & \cdots & & & 0 \\
0 & 0 & \cdots & & & 0 \\
\vdots & \vdots  & \ddots & & & \\
\\
0 & 0 & \cdots & & &  0\\
\end{matrix} \\
\end{array}
\right]
$$

Then, we apply weights to this matrix to account for the size differences between the coefficients and the secret.

To do so, we multiply $L$ by a special diagonal matrix $W$ representing the weights, defined as:

$$
W = \begin{bmatrix}
w_1 & 0 & \cdots & 0 \\
0 & w_2 & \cdots & 0 \\
\vdots & \vdots  & \ddots & \\
0 & 0 & \cdots & w_n \\
\end{bmatrix}
$$

> [!note]- Proof
> It's because, for matrices in any dimension, the following equality holds
> $$
\begin{bmatrix}
a & b & \cdots & c \\
d & e & \cdots & f \\
\vdots & \vdots  & \ddots & \\
g & h & \cdots & i \\
\end{bmatrix} \cdot
\begin{bmatrix}
w_1 & 0 & \cdots & 0 \\
0 & w_2 & \cdots & 0 \\
\vdots & \vdots  & \ddots & \\
0 & 0 & \cdots & w_n \\
\end{bmatrix} =
\begin{bmatrix}
w_1 a & w_2 b & \cdots & w_n c \\
w_1 d & w_2 e & \cdots & w_n f \\
\vdots & \vdots  & \ddots & \\
w_1 g & w_2 h & \cdots & w_n i \\
\end{bmatrix}
$$

We now have

$$
L^{'} = L \cdot W
$$

which, once in its reduced form, should contain the vector

$$
\begin{bmatrix}
0 \\
0 \\
\vdots \\
S \\
a_1 \\
a_2 \\
\vdots \\
a_{k-1} \\
h \\
\end{bmatrix} \cdot W
$$

thus, giving the coefficients after multiplying by $W^{-1}$

```python {linenos=table, filename="small_coefficients.py"}
from sage.all import *

def attack(x, y, p, k, coeff_ub=None, all_row=False):
    """
    Recovers the shared secret and the coefficients of the polynomial from given shares.
    :param p: the prime used for Shamir's secret sharing
    :param k: the amount of shares needed to unlock the secret
    :param x: the list of x coordinates of the given shares
    :param y: the list of y coordinates of the given shares
    :param coeff_ub: the upper bound for the values of the coefficients
    :return: the shared secret, or a generator returning all the row of the reduced base
    """
    if not coeff_ub:
        coeff_ub = p.bit_length() // 2

    P = PolynomialRing(ZZ, names=[f'a{i}' for i in range(k)])
    a = P.gens()  # a[0] = a0, a[1] = a1, ..., a[k-1] = a_{k-1}

    eqs = []
    for xi, yi in zip(x, y):
        # Dynamically build the polynomial equation for each (xi, yi)
        poly = -yi + a[0]
        for i in range(1, k):
            poly += a[i] * xi**i
        eqs.append(poly)

    # Get the coefficient matrix and monomials
    A, mons = Sequence(eqs).coefficients_monomials(sparse=False)

    # Construct the block matrix
    L = block_matrix(ZZ, [
        [A.T, 1],  # 1 is a column vector of ones
        [p, 0]     # p is a diagonal matrix or scalar, 0 is a zero matrix
    ])

    # Define the weight matrix
    ws = diagonal_matrix([1] * len(eqs) + [p.bit_length()] + [coeff_ub] * (k-1) + [1], sparse=False)

    # Apply LLL reduction
    L = (L / ws).LLL() * ws

    for row in L:
        if all_rows:
            yield row
        else:
            if (
                l[:len(eqs)].list() == [0] * len(eqs) and
                l[len(eqs) + 1:].list() != [0] * k
            ):
                return l.list()
```

## Resources

- [Wikipedia - Shamir's secret sharing](https://en.wikipedia.org/wiki/Shamir%27s_secret_sharing)
- [How to use LLL to solve linear systems of equations](https://magicfrank00.github.io/writeups/posts/lll-to-solve-linear-equations/)
- [GitHub - crypto-attacks](https://github.com/jvdsn/crypto-attacks/tree/master/attacks/shamir_secret_sharing)
- [How to forge a Shamir secret share?](https://crypto.stackexchange.com/questions/54578/how-to-forge-a-shamir-secret-share)
