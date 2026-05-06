---
title: Number Theory
tags:
- cybersecurity
- cryptography
- number-theory
- math
---

## Divisibility


A number $a$ is said to be divisible by $b$ if there is another integer $c$ such that $a=b \cdot c$. In this case, $b$ is said to be a **factor** of $a$.

This is denoted by $a \mid b$ if $a$ divides $b$, and $a \nmid b$ if it does not.

### Greatest Common Divisor

The [**Greatest Common Divisor**](https://en.wikipedia.org/wiki/Greatest_common_divisor) (GCD), sometimes known as the highest common factor, is the largest number which divides two positive integers $(a,b)$.

We say that for any two integers $a$ and $b$, if $gcd(a,b)=1$ then $a$ and $b$ are coprime.

If $a$ and $b$ are prime, they are also coprime. If $a$ is prime and $b<a$, then $a$ and $b$ are coprime.

You can easily compute the GCD in Python using [Euclid's Algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm)

```python {linenos=table}
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a
```

### Extended GCD

> [!note] [Bézout's identity](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_identity)
> Let $a$ and $b$ be positive integers, and $d$ their GCD such that $d = gcd(a, b)$.
>
> Then there exist integers $x$ and $y$ such that $ax + by = d$. Moreover, the integers of the form $az + bt$ are exactly the multiples of $d$.

We can use the [extended Euclidean algorithm](https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm) to find the $x$ and $y$ coefficients.

## Continued Fractions

**Continued Fractions** are a way of representing real numbers as a sequence of positive integers. Let's say we have a real number $\alpha_1$. We can form a sequence of positive integers from $\alpha_1$ in this way:

$$
\alpha_1 = a_1 + \frac{1}{\alpha_2}, \text{where } a_1=\left \lfloor{\alpha_1}\right \rfloor
$$

The trick here is that if $\alpha_2\not\in \mathbb{Z}$, we can continue this exact process with $\alpha_2$ and keep the **continued fraction** going.

$$
\alpha_1 = a_1 + \frac{1}{a_2 + \frac{1}{a_3 + \frac{1}{\ddots}}}
$$

### Convergents

The $k$th convergent of a continued fraction is the approximation of the fraction we gain by truncating the continued fraction and using only the first $k$ terms of the sequence.

For example the 2nd convergence of $\frac{17}{11}$ is $1 + \frac{1}{1} = \frac{2}{1} = 2$​ while the 3rd would be $1 + \frac{1}{1 + \frac{1}{1}} = 1 + \frac{1}{2} = \frac{3}{2}$.

One of the obvious applications of these convergents is as **rational approximations to irrational numbers**.

#### Properties of Convergences

- As a sequence, they have a limit
  - This limit is $\alpha_1$, the real number you are attempting to approximate
- They are alternately greater than and less than $$\alpha_1$$

### Sage

In Sage, we can define a continue fraction very easily:

```python {linenos=table}
f = continued_fraction(17/11)
print(f)
# >>> [1; 1, 1, 5]
```

And the convergents are even calculated for us:

```python {linenos=table}
print(f.convergents())
# >>> [1, 2, 3/2, 17/11]
```

## Resources

- [Sagemath Docs - Continued fractions](https://doc.sagemath.org/html/en/reference/diophantine_approximation/sage/rings/continued_fraction.html)
- [Wikipedia - Continued fractions](https://en.wikipedia.org/wiki/Continued_fraction)
- [Wikipedia - Extended Euclidean algorithm](https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm)
