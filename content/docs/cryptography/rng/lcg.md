---
title: Linear Congruential Generator
linkTitle: LCG
tags:
- cybersecurity
- cryptography
- lcg
- rng
- prng
- random
---

A [**linear congruential generator**](https://en.wikipedia.org/wiki/Linear_congruential_generator) (LCG) is an algorithm that yields a sequence of pseudo-randomized numbers. This one one of the oldest and best-known [pseudorandom number generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) algorithms.

## Basics

The generator is defined by the recurrence relation:

$$
X_{n+1} \equiv (aX_n + c) \mod m
$$

where $X$ is the sequence of pseudo-random values, and

- $m$ is the **modulus** (usually a prime power)
- $a$, $0 < a < m$ is the **multiplier**
- $c$, $0 < c < m$ is the **increment**
- $X_0$, $0 < X_0 < m$ is the **seed** (or starting value)

### Python implementation

Here is a simple implementation of an LCG using Python classes

```python {linenos=table, filename="lcg.py"}
from random import randint
import json

class LCG:
    def __init__(self, A, C, M):
        self.A = A
        self.C = C
        self.M = M
        self.seed = randint(1, M - 1)
        self.state = int(self.seed)

    def get_num(self):
        self.state = (self.A * self.state + self.C) % self.M
        return self.state

M = 2**128
A = 268607174946894248140281324626881240237
C = 31900087321673369912687207546538209873

lcg = LCG(A, C, M)

x = []
for _ in range(4):
    x.append(lcg.get_num())

print(json.dumps(x, indent=4))
```

## Recover parameters

### Find the modulus

If you have access to at least $4$ consecutive outputs of the LCG, namely $X_1, X_2, X_3$ and $X_4$, you can recover the modulus used to generate those numbers.
But how ?

Let's define the recurrence $T_n = X_{n+1} - X_n$

We have

$$
\begin{aligned}
T_0 = X_1 - X_0 \equiv (aX_0 + c) - X_0 \mod m \\
T_1 = X_2 - X_1 \equiv (aX_1 + c) - X_1 \mod m \\
T_2 = X_3 - X_2 \equiv (aX_2 + c) - X_2 \mod m \\
T_3 = X_4 - X_3 \equiv (aX_3 + c) - X_3 \mod m \\
\end{aligned}
$$

Between consecutive elements in $T$, we can notice this pattern:

$$
\begin{aligned}
T_n &\equiv aS_n + c - S_n &\mod m \\
&\equiv a(aS_{n-1} + c) - (aS_{n-1} + c) &\mod m \\
&\equiv a^2S_{n-1} + ac + c - aS_{n-1} - c &\mod m \\
&\equiv a(S_{n-1} + c - aS_{n-1}) &\mod m \\
&\equiv aT_{n-1} &\mod m \\
\end{aligned}
$$

Meaning that $T$ forms its own LCG with the same modulus and multiplier but no increment. With this new LCG, we can now easily find the modulus by just multiplying different items in $T$ to get differences

We know

$$
\begin{aligned}
T_1 &\equiv aT_0 \mod m \\
T_2 &\equiv aT_1 \mod m \\
\end{aligned}
$$

and

$$
\begin{aligned}
T_1^2 &\equiv a^2 T_0^2 &\mod m \\
\\
T_2 T_0 &\equiv aT_1 T_0 &\mod m \\
&\equiv a(aT_0) T_0 &\mod m \\
&\equiv a^2 T_0^2 &\mod m \\
\end{aligned}
$$

Thus, we have

$$
\begin{aligned}
&T_1^2 - T_2 T_0 \equiv 0 &\mod m \\
\Longleftrightarrow \quad &T_1^2 - T_2 T_0 = k \cdot m \\
\end{aligned}
$$

for some integer $k \geqslant 1$.

> [!important] Remark
> Note that in this case, you only have a **multiple** of the modulus as the result. To recover $m$ from there, factor it, then divide it repeatedly by its factors until you find the correct one, which is the one with the correct bit size (we suppose you have this information).

Now, in most cases, $k \neq 1$, but if you have $5$ outputs, you can then calculate

$$
T_2^2 - T_3 T_1 = k^{'} \cdot m
$$

for some other integer $k^{'} \geqslant 1$.

You can now finally retrieve the modulus

$$
\begin{aligned}
m &= gcd(T_2^2 - T_3 T_1, \ T_1^2 - T_2 T_0) \\
&= gcd(k^{'} \cdot m, \ k \cdot m) \\
\end{aligned}
$$

---

Here is how it looks using Python

```python {linenos=table, filename="recover_lcg_modulus.py"}
# [...]
# Following previous code and implementation

from math import gcd
from sage.all import factor, is_prime_power, is_prime

def recover_modulus_lcg(x, m_bit_size=None):

    # We suppose you know the bit size of the modulus, but if you don't
    # we can make the hypothesis that it is the bit size of
    # the maximum output value plus one
    #
    # WARNING: It doesn't work every time
    if not m_bit_size:
        m_bit_size = max(x).bit_length() + 1

    m = 0
    for i in range(len(x) - 3):
        t0 = x[i + 1] - x[i]
        t1 = x[i + 2] - x[i + 1]
        t2 = x[i + 3] - x[i + 2]
        g = abs(t1 * t1 - t2 * t0)
        m = g if m is 0 else gcd(g, m)

    if not is_prime_power(m) and not is_prime(m):
        f = list(factor(m))
        while m.bit_length() > m_bit_size:
            if f[-1][1] == 1:
                m //= f[-1][0]
                f.pop(-1)
            else:
                m //= f[-1][0]
                f[-1] = (f[-1][0], f[-1][1] - 1)

    return m

m = recover_modulus_lcg(x)
assert M == m  # True
```

### Recover the multiplier

Now that you know the modulus $m$, you can recover the multiplier $a$ with only $3$ consecutive outputs of the LCG.

You have

$$
\begin{aligned}
X_1 &\equiv aX_0 + c \mod m \\
X_2 &\equiv aX_1 + c \mod m \\
X_3 &\equiv aX_2 + c \mod m \\
\end{aligned}
$$

and

$$
\begin{aligned}
X_2 - X_1 &\equiv (aX_1 + c) - (aX_0 + c) \equiv a(X_1 - X_0) \mod m \\
X_3 - X_2 &\equiv (aX_2 + c) - (aX_1 + c) \equiv a(X_2 - X_1) \mod m \\
\end{aligned}
$$

Thus, by re-arranging, you can calculate

$$
a \equiv \frac{X_3 - X_2}{X_2 - X_1} \mod m
$$

#### Not invertible ?

If $T_1$ is not co-prime to $m$, then $T_1$ is not invertible mod $m$ and you can't compute $(X_2 - X_1)^{-1} \mod m$.

> [!note]
> This can happen especially when $M$ is not prime.

You can still recover $a$ the following way. First calculate

$$
g = gcd(T_2, T_1, m)
$$

then, because $T_1 \equiv aT_0 \mod m$, you have

$$
\begin{aligned}
\frac{T_1}{g} &\equiv a\frac{T_0}{g} &\mod \frac{m}{g} \\
\Longleftrightarrow \quad a &\equiv \frac{T_1}{g} \left(\frac{T_0}{g}\right)^{-1} &\mod \frac{m}{g} \\
\end{aligned}
$$

> [!important] **Not the correct multiplier ?**
> If $a$ is too *small* or too *big* after this calculation, we can just add or subtract $\frac{m}{g}$ to it until it properly satisfies the $T$ LCG.

---

You can do all of this using Sage

```python {linenos=table, filename="recover_lcg_multiplier.py"}
# [...]
# Again, following what have been done previously

from sage.all import GF, Zmod

def recover_mulitplier_lcg(x, m):
    # Modulus is a prime number
    if is_prime(m):
        try:
            f = Zmod(m)
            x1 = f(x[0])
            x2 = f(x[1])
            x3 = f(x[2])
            a = int((x3 - x2) / (x2 - x1))

            if (x3 - x2) == a * (x2 - x1):
                return a
        except Exception:
            pass

    # Modulus is not a prime number
    t0 = (x[1] - x[0]) % m
    t1 = (x[2] - x[1]) % m
    g = gcd(m, gcd(t0, t1))

    m_g = m // g
    t1_g = t1 // g
    t0_g = t0 // g

    a = (t1_g * pow(t0_g, -1, m_g)) % m_g

    # Add mulitples of m // g if a is not correct
    i = 0
    while True:
        if ((a + i * (m // g)) * t0) % m == t1:
            return a + i * (m // g)
        if ((a - i * (m // g)) * t0) % m == t1:
            return a - i * (m // g)


a = recover_mulitplier_lcg(x, m)
assert a == A  # True
```

### Calculate the increment

Finally, knowing the modulus $m$ and the multiplier $a$, you can easily calculate the increment $c$ by using only two consecutive ouputs.

$$
\begin{aligned}
&X_2 \equiv aX_1 + c \mod m \\
\Longleftrightarrow \quad &c \equiv X_2 - aX_1 \mod m
\end{aligned}
$$

---

In Python, it is a simple as this

```python {linenos=table, filename="recover_lcg_increment.py"}
# [...]

def recover_lcg_increment(x, a, m):
    return (x[1] - a * x[0]) % m

c = recover_lcg_increment(x, a, m)
assert c == C  # True
```

### Going backward

Reversing the LCG is trivial now that we know all the parameters. Starting from the definition of $X_{n+1}$, we can calculate $X_n$.

$$
\begin{aligned}
X_{n+1} &\equiv (aX_n + c) &\mod m \\
\Longleftrightarrow \quad X_n &\equiv a^{-1}(X_{n+1} - c) &\mod m \\
\end{aligned}
$$

---

```python {linenos=table, filename="lcg_backward.py"}
# [...]

seed = x[-1]
for _ in range(4):
    seed = ((seed - c) * pow(a, -1, m)) % m

assert seed == lcg.seed  # True
```

## Attacks

### Truncated LCG

- [On Stern’s Attack Against Secret Truncated Linear Congruential Generators](https://link.springer.com/content/pdf/10.1007/11506157_5.pdf)

#### Parameter recovery

- [truncated_parameter_recovery.py](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/lcg/truncated_parameter_recovery.py)

> [!important] TODO

#### State recovery

- [truncated_state_recovery.py](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/lcg/truncated_state_recovery.py)

> [!important] TODO

## Resources

- [Recover Linear Congruential Generator (LCG) Parameters](https://jia.je/ctf-writeups/misc/lcg.html)
- [Stack Exchange - Problem with LLL reduction on truncated LCG schemes](https://crypto.stackexchange.com/questions/37836/problem-with-lll-reduction-on-truncated-lcg-schemes)
- [LCG](https://dexterjie.github.io/2024/07/16/%E6%B5%81%E5%AF%86%E7%A0%81/%E6%B5%81%E5%AF%86%E7%A0%81-LCG/#%E5%8E%9F%E7%90%86%E7%AE%80%E4%BB%8B)
