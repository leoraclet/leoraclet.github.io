---
title: Elliptic-curve cryptography
linkTitle: ECC
tags:
- cybersecurity
- cryptography
- ecc
- public-key
---

For the moment, this [GitHub repository](https://github.com/elikaski/ECC_Attacks) covers nearly all the essentials of Elliptic Curve Cryptography and its associated attacks.

I will only add here information that are not explicitly covered by this repo.

## Parameters

| Name | Description |
| :--: | :---------- |
| $p$ | The prime defining the curve's field $\mathbb{F}_p$ |
| $a$ | The coefficient for $x$ in the equation $y^2 = x^3 + ax + b$ |
| $b$ | The constant term of the equation |
| $G$ | A point on the curve that generates a subgroup of large prime order $n$ |
| $n$ | Integer order of $G$, means that $nG=\mathcal{O}$, where $\mathcal{O}$ is the identity element |

## Parameters recovery

**Remainder:** An elliptic curve is defined over a finite field $\mathbb{F}_p$ as

$$
Y^2 = X^3 + aX + b \mod p \quad \forall a, b \in \mathbb{F}_p
$$

Let's suppose that you don't the parameters $a$ and $b$, and only have access to two points on this curve $P_1 = (X_1, Y_1)$ and $P_2 = (X_2, Y_2)$, then you can uniquely recover those parameters using the following formulas

Given our two points, we have

$$
\begin{equation}
Y_1^2 = X_1^3 + aX_1 + b \mod p \tag{1}
\end{equation}
$$

$$
\begin{equation}
Y_2^2 = X_2^3 + aX_2 + b \mod p \tag{2}
\end{equation}
$$

which means, that by re-arranging (2), we get

$$
\begin{equation}
b = Y_2^2 - X_2^3 - aX_2 \mod p \tag{3}
\end{equation}
$$

thus, by replacing in (1)

$$
\begin{aligned}
Y_1^2 &= X_1^3 + aX_1 + Y_2^2 - X_2^3 - aX_2 &\mod p \\
\Longleftrightarrow \quad Y_1^2 &= X_1^3 - X_2^3 + Y_2^2 + a(X_1 - X_2) &\mod p \\
\\
\Longleftrightarrow \quad a &= \frac{Y_1^2 - Y_2^2 + X_1^3 - X_2^3}{X_1 - X_2} &\mod p \\
\end{aligned}
$$

Now that we know $a$, we can easily recover $b$ by using (3)

```python {linenos=table,filename="ecc-parameters-recovery.py"}
# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/ecc/parameter_recovery.py
def attack(p, x1, y1, x2, y2):
    """
    Recovers the a and b parameters from an elliptic curve when two points are known.
    :param p: the prime of the curve base ring
    :param x1: the x coordinate of the first point
    :param y1: the y coordinate of the first point
    :param x2: the x coordinate of the second point
    :param y2: the y coordinate of the second point
    :return: a tuple containing the a and b parameters of the elliptic curve
    """
    a = pow(x1 - x2, -1, p) * (pow(y1, 2, p) - pow(y2, 2, p) - (pow(x1, 3, p) - pow(x2, 3, p))) % p
    b = (pow(y1, 2, p) - pow(x1, 3, p) - a * x1) % p
    return int(a), int(b)
```

## Resources

- [Sage Doc - Elliptic curves](https://doc.sagemath.org/html/en/reference/arithmetic_curves/index.html)
- [Elliptic Curve Points | Desmos](https://www.desmos.com/calculator/ialhd71we3)
