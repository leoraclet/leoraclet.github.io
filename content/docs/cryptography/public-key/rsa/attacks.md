---
title: RSA Attacks
linkTitle: Attacks
tags:
- cybersecurity
- cryptography
- rsa
- attacks
- public-key
prev: /docs/cryptography/public-key/rsa
---

<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD013 -->

## Summary

All the attacks presented below are grouped by category according to their type, what they target, or where the flaw lies. Here are the main ones :

- [Choice of primes](#choice-of-primes)
- [Public Exponent](#public-exponent)
- [Small private exponent](#small-private-exponent)
- [Bad implementations](#bad-implementations)
- [Oracles](#oracles)
- [Signature forgery](#signature-forgery)

## Choice of primes

This section covers attacks that are made possible by the wrong generation of the prime numbers $p$ and $q$, thus facilitating the factorization of the modulus $N$ or the decryption process.

### N is prime

When $N$ is prime, $\phi(N) = N - 1$.
This simplifies decryption, since we can compute $d$ as the multiplicative inverse of $e$ modulo $\phi(N) = N - 1$, using the known public values $N$ and $e$.

$$
d \equiv e^{-1} \pmod{N - 1}
$$

```python {linenos=table,filename="n_is_prime.py"}
import gmpy2

N = 101

if gmpy2.is_prime(N):
    d = pow(e, -1, N - 1)
```

### P = Q

If $p = q$, then $N = p \cdot q = p^2$, and you can use functions such as `isqrt` in Python to retrieve $p$.

Note that in the situation $N = p^2$, $\phi(N) \neq (p-1)^2$ due to the full definition of Euler's totient function:

$$
\phi(n) = n \prod_{p|n} \left(1 - \frac{1}{p}\right)
$$

The key here is that $p \mid n$ are **distinct** prime factors, so we only use $p$ once in the equation:

$$
\phi(n) = n \left(1 - \frac{1}{p}\right) = n - p
$$

Thus, as before, you can calculate $d$ as the multiplicative inverse of $e$, this time modulo $\phi(N) = n - p = p^2 - p = p(p-1)$:

```python {linenos=table,filename="p_is_q.py"}
from math import isqrt

p = isqrt(N)
d = pow(e, -1, p * (p - 1))
```

### Mersenne Primes

[Mersenne Primes](https://en.wikipedia.org/wiki/Mersenne_prime) are special prime numbers of the form $p = 2^k - 1$.

#### When P or Q is a Mersenne Prime

To check if either $p$ or $q$ is a Mersenne prime, iterate through known Mersenne primes and compare. This is straightforward in Sage:

```python {linenos=table,filename="mersenne-prime.py"}
from sage.combinat.sloane_functions import A000668

mersenne = A000668()
# Access the nth Mersenne prime with mersenne(n)
```

#### Both primes are Mersenne Primes

You can use the same approach as before,
or observe that:

$$
N = p \cdot q = (2^{k_1} - 1)(2^{k_2} - 1) = 2^{k_1 + k_2} - 2^{k_1} - 2^{k_2} + 1
$$

Thus,

$$
N + 1 = 2^{k_1 + k_2} - 2^{k_1} - 2^{k_2} + 2
$$

Assume without loss of generality that $k_1 > k_2$. Then:

$$
N + 1 = 2^{k_2} \cdot (2^{k_1} - 2^{k_1 - k_2} - 1)
$$

> [!note]
> If $k_2 > k_1$, the factorization would instead use $2^{k_1}$,
> but the process remains identical—only the order of factors changes.

This means you can divide $N + 1$ by $2$ at most $k_2$ times before it becomes odd.
Counting these divisions reveals $k_2$.

Once $k_2$ is known, compute $p = 2^{k_2} - 1$ and $q = \frac{N}{p}$.
Finally, calculate $d$ as usual.

### Square-Free number - RSA Backdoor

Given the system:

$$
\left\{
\begin{array}{l}
N = p \cdot q \\
T = Ds^2 = 4p - 1 \\
D \equiv 3 \pmod{8}
\end{array}
\right.
$$

$D$ is a square-free number, and $N$ can be factored using this relationship.

For a practical implementation of this attack, refer to this [GitHub repository](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/factorization/complex_multiplication.py).

### P and Q are Close

#### Fermat’s Factorization

When the primes $p$ and $q$ are close to each other, [Fermat’s factorization method](https://en.wikipedia.org/wiki/Fermat%27s_factorization_method) can be used to efficiently factor $N$.

```python {linenos=table,filename="fermat_factor.py"}
def fermat_factor(n):
    tmin = floor(sqrt(n)) + 1

    for a in range(tmin, n):
        b = sqrt(a * a - n)
        if floor(b) == b:
            return [a + b, a - b]

    return [0, 0]
```

#### Cherkaoui-Semmouni

- [cherkaoui_semmouni.py](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/rsa/cherkaoui_semmouni.py)
- [Cryptanalysis of RSA Variants with Primes Sharing Most Significant Bits](https://eprint.iacr.org/2021/1632.pdf)

> [!important] TODO

### Many small Primes

#### Elliptic Curve Method (ECM)

When $N$ is the product of many primes (around 30 or more), the [Elliptic Curve Method (ECM)](https://en.wikipedia.org/wiki/Lenstra_elliptic_curve_factorization) is highly effective for factorization.

```python {linenos=table,filename="many_primes.py"}
# Uses Sage's built-in ECM implementation
# Reference: https://doc.sagemath.org/html/en/reference/interfaces/sage/interfaces/ecm.html

def many_primes(n):
    ecm = ECM()
    factors = ecm.factor(n)
    return factors
```

### ROCA Vulnerability

- [Explanation of the attack (GitHub Gist)](https://gist.github.com/zademn/6becc979f65230f70c03e82e4873e3ec)
- [Implementation of the attack (GitLab Repository)](https://gitlab.com/jix/neca)

The *“Return of Coppersmith’s Attack”* (ROCA) vulnerability arises when generated primes follow the form:

$$
p = k \cdot M + (65537^a \mod M)
$$

where $ M $ is the product of $ n $ successive primes, also known as a [primorial](https://en.wikipedia.org/wiki/Primorial).

### Common Prime

If you have a list of moduli $\{N_1, N_2, \ldots, N_n\}$, and the prime generator accidentally reuses the same prime for two different moduli, you can exploit this to factorize both moduli and recover the private keys.

**Steps to Exploit:**

1. **Identify Common Prime:**
   Find a pair of moduli $N_1$ and $N_2$ such that $\gcd(N_1, N_2) \neq 1$. This indicates a shared prime factor.

2. **Factorize the Moduli:**
   Compute the common prime as $p = \gcd(N_1, N_2)$.
   Then, calculate the remaining factors:
   $q_1 = \frac{N_1}{p}$ and $q_2 = \frac{N_2}{p}$.

3. **Recover Private Keys:**
   Compute the private keys using the modular inverse:
   $d_1 = \text{modinverse}(e, (p-1)(q_1-1))$ and
   $d_2 = \text{modinverse}(e, (p-1)(q_2-1))$,
   where $\text{modinverse}(a, b)$ is the modular multiplicative inverse of $a$ modulo $b$.

### Twin primes

[Twin primes](https://en.wikipedia.org/wiki/Twin_prime) are two prime numbers $p$ and $q$, such that $q = p + 2$.
If $N$ is calculated as the product of those two prime, then factorization is trivial.

Let $N = p \cdot q = p(p + 2) = p^2 + 2p$, then, by rearranging the terms, we have $p^2 + 2p - N = 0$, which mean we can compute $p$ as one of the roots of this quadratic polynomial.

The formula gives us
$$
p = \frac{-b \pm \sqrt{\Delta}}{2a}
$$

avec

$$
\Delta = b^2 - 4ac
$$

Replacing by our values, we have :

$$
\Delta = b^2 - 4ac = 4 + 4N = 4(1 + N) > 0 \quad\text{as}\quad N > 0
$$

then

$$
p = \frac{-b \pm \sqrt{\Delta}}{2a} = \frac{-2 \pm \sqrt{4(1 + N)}}{2} = \frac{-2 \pm 2\sqrt{N + 1}}{2}
$$

Now, because $p > 0$, we're only interested in the positive root, which gives us :

$$
p = \frac{-2 + 2\sqrt{N + 1}}{2} = \sqrt{N + 1} - 1
$$

```python {linenos=table,filename="twin_primes.py"}
import gmpy2

# From https://oeis.org/A077800/list
N = 617 * 619

p = gmpy2.sqrt(N + 1) - 1
q = n // p
assert p * q == N
```

### Powersmooth primes

If one of the prime factors of $N$ is a [powersmooth](https://en.wikipedia.org/wiki/Smooth_number#Powersmooth_numbers) number, then one can use the [Pollard's p − 1 algorithm](https://en.wikipedia.org/wiki/Pollard%27s_p_%E2%88%92_1_algorithm) to efficiently factorize it.

### Low Hamming weight

- [Google CTF 2020 - YAFM](https://github.com/google/google-ctf/tree/main/2020/quals/crypto-yafm)

In this section we present a method to factorize a modulus $N$ that is the product of two primes $p$ and $q$ with a low [hamming weight](https://en.wikipedia.org/wiki/Hamming_weight).

> [!important] TODO

## Public Exponent

This section covers attacks that are based on bad choices or uses of the public exponent $e$ used in the target system.

### Small public exponent

#### Case: e = 1

When $e = 1$, encryption is ineffective:

$$
c = M^e = M^1 = M \pmod{N}
$$

The ciphertext $c$ is identical to the plaintext $M$, rendering it unencrypted.

---

#### Case: Small e - unpadded message

If $e$ is small and $m$ is unpadded, encryption may be weak:

- **If $m^e < N$:**
  The ciphertext $c$can be decrypted by taking the $e$-th root:
  $m = \sqrt[e]{c}$.
  For example, if $e = 3$, then $m = \sqrt[3]{c}$.

- **If $m^e > N$:**
  The attack requires adding multiples of $N$ to $c$ until the $e$-th root yields a valid plaintext:
  $m = \sqrt[e]{c + kN}$, where $k$ is a positive integer.

```python {linenos=table,filename="small_e.py"}
from sage.all import *

def small_e(e, ct, n=None):
    ct = Integer(ct)

    if n is None:
        try:
            pt = ct.nth_root(e)
        except ValueError:
            return None

        if pow(pt, e) == ct:
            return pt
        else:
            return None

    k = 0
    while True:
        try:
            pt = ct.nth_root(e)
        except ValueError:
            k += 1
            ct += n
            if k % 1000 == 0:
                print("Trying k={}...".format(k))
            continue

        if pow(pt, e) == ct:
            return pt

        k += 1
        ct += n
```

### Non-coprime exponent

When $e$ is not coprime to $\phi$, then $gcd(e, \phi) \ne 1$, so you can't take the modular inverse, and hence can't calculate $d$ and decrypt any ciphertext.

If you happen to know $\phi$, you can calculate $\phi_2 = \frac{\phi}{e}$ and find $g$ such that $g^{\phi_2} \equiv 1 \mod N$.

Once done, calculate

$$
\left\{\begin{aligned}
d &= e^{-1} \mod \phi_2 \\
a &= C^d \mod N \\
\end{aligned}
\right.
$$

and all *possible* plaintexts are the set of integers $\{M_0, M_1, \cdots, M_i\}$ such that

$$
M_i = a \cdot g^{i \phi_2} \mod N
$$

with $i \in [0, e-1]$

## Small private exponent

### Wiener’s Attack

- [Wikipedia - Wiener's attack](https://en.wikipedia.org/wiki/Wiener%27s_attack)

When $e$ is **very large**, the corresponding $d$ becomes small (since $ed \equiv 1 \pmod{\phi(N)}$). This makes the system vulnerable to [**Wiener’s attack**](https://en.wikipedia.org/wiki/Wiener%27s_attack).

```python {linenos=table,filename="wiener_attack.py"}
from sage.all import *

# Implemented from https://en.wikipedia.org/wiki/Wiener's_attack
def wiener(e, n):
    m = 13371337      # Random message
    c = pow(m, e, n)  # Encrypted random message

    # Compute the convergents of the continued fraction
    lst = continued_fraction(Integer(e) / Integer(n))
    conv = lst.convergents()

    # For each k/d, check if d is correct
    for i in conv:
        k = i.numerator()
        d = int(i.denominator())
        try:
            m1 = pow(c, d, n)
            if m1 == m:
                return d
        except:
            continue
    return -1
```

> [!tip]
> Now that you know $d$, you recover the prime factors $p$ and $q$ like [this](../#known-private-exponent)

### Variant of Wiener's Attack

- [extended_wiener_attack.py](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/rsa/extended_wiener_attack.py)

Wiener’s Attack is effective when $d < N^{1/4}$. However, this attack can be extended to cases where $d$ is slightly larger than $N^{1/4}$.

In such scenarios, candidates for the private key exponent $d$ take the form:
$$d = rq_{m+1} + sq_m,$$
where $q_{m+1}$ and $q_m$ are the $(m+1)$th and $m$th convergents of the continued fraction expansion of $\frac{e}{N}$.

This approach allows us to exploit the relationship even when $d$ exceeds $N^{1/4}$ by a few bits.

```python {linenos=table,filename="wiener_variant.py"}
#########################################################################
# https://github.com/ashutosh1206/Crypton/tree/master/RSA-encryption/Attack-Wiener-variant
#########################################################################

from sage.all import *

def wiener(e, n):
    m = 12345  # Example plaintext
    c = pow(m, e, n)
    q0 = 1

    list1 = continued_fraction(Integer(e) / Integer(n))
    conv = list1.convergents()

    for i in conv:
        k = i.numerator()
        q1 = i.denominator()

        for r in range(30):
            for s in range(30):
                d = r * q1 + s * q0
                m1 = pow(c, d, n)
                if m1 == m:
                    return d
        q0 = q1

    return None
```

For a deeper dive into an advanced variant of Wiener’s Attack, refer to the following paper:

[**A variant of Wiener's Attack on RSA - Andrej Dujella**](https://www.math.tugraz.at/~cecc08/abstracts/cecc08_abstract_20.pdf) which discusses this and much more in greater details.

### Extended Wiener’s Attack

- [Extending Wiener’s Attack in the Presence of Many Decrypting Exponents](https://dunkirkturbo.github.io/2020/05/04/WriteUp-De1CTF2020-Crypto/howgrave-graham1999.pdf)

### Boneh and Durfee Attack

The Boneh and Durfee attack further improves upon the exploitation of small private exponents in RSA.

For a practical implementation, see:

- [**boneh_durfee.sage**](https://github.com/mimoo/RSA-and-LLL-attacks/blob/master/boneh_durfee.sage)

### Others

#### Fixed points

These challenges can be spotted when the input is not changed with encrypted/decrypted.

A fixed point in RSA encryption is a number K such that

$$
K^e \equiv K \mod N
$$

There are 6 non-trivial fixed points in RSA encryption that are always there, caracterized by $m$ mod $p \in \{0,1,−1\}$ and $m$ mod $q \in \{0,1,−1\}$

Given a fixed point, it is possible to deduce one of the prime factors of $n$, since $gcd(m-1, n)$, $gcd(m, n)$ and $gcd(m+1, n)$ are $1$, $p$ and $q$
in a different order depending on the values of $m$ mod $p$ and $m$ mod $q$.

However, it is also possible to find other fixed points that are not these 6 non-trivial ones.

## Bad implementations

### Coppersmith's Attack

Let a monic polynomial $f \in \mathbb{Z}_N[X]$ of degree $d$ with integer coefficients and integers $X$ and $N$ be given. Suppose $X = N^{\frac{1}{d} - \epsilon}$ for some $\epsilon > 0$. There is an algorithm to find all $x_0 < X$ satisfying $f(x_0) \equiv 0 \mod N$.

#### Stereotyped message

> [!note] Other name
> This attack is also known as the **"Known High Bits Message Attack"**

- [Finding Small Roots of Univariate Modular Equations Revisited](https://link.springer.com/chapter/10.1007/BFb0024458)
- [Finding Small Solutions to Small Degree Polynomials](https://cr.yp.to/bib/2001/coppersmith.pdf)
- [Wikipedia- Coppersmith's Method](https://en.wikipedia.org/wiki/Coppersmith_method)
- [Wikipedia - Coppersmith's Attack](https://en.wikipedia.org/wiki/Coppersmith%27s_attack)

In this scenario, we know the most significant bits of the message. This happens in cases where the message is something like: `"The secret is: XXXXXXXX"`. We don't know `XXXXXXXX`, and by Coppersmith's theorem we can recover it.

Coppersmith states that if we are looking for $N^{\frac{1}{e}}$ of the message, then it is a `small root`, and we will be able to find it efficiently.

Let us formulate our $f(x)$ in such situations:

$f(x) = (m + x)^e - c$. Here, $m$ is the part of the message known to us, $c$ is the corresponding ciphertext of the entire message, $e$ is the public key exponent, and $x$ is a **polynomial over the ring of integers** modulo $N$.

We can now write:

```python {linenos=table,filename="stereotyped_message.py"}
P.<x> = PolynomialRing(Zmod(N))
beta = 1
dd = f.degree()    # Degree of the polynomial
epsilon = beta/7
XX = ceil(N**((beta**2/dd) - epsilon))
f.small_roots(XX, beta, epsilon)
```

#### Short Pad attack

- [Stack Overflow - Short padding + known prefix RSA attack](https://crypto.stackexchange.com/questions/80087/short-padding-known-prefix-rsa-attack)
- [Coppersmith's short-pad attack](https://en.wikipedia.org/wiki/Coppersmith%27s_attack#Coppersmith%E2%80%99s_short-pad_attack)

Suppose Bob sends a message $M$ to Alice using a small random padding before encrypting it. An attacker, Eve, intercepts the ciphertext and prevents it from reaching its destination. Bob decides to resend $M$ to Alice because Alice did not respond to his message. He randomly pads $M$ again and transmits the resulting ciphertext. Eve now has two ciphertexts corresponding to two encryptions of the same message using two different random pads.

Even though Eve does not know the random pad being used, she still can recover the message $M$ by using the following theorem, if the random padding is too short.

Mathematically, with a padding of length $P$, we have

$$
\begin{align}
C_1 \equiv (2^P M + R_1)^e \mod N \\
C_2 \equiv (2^P M + R_2)^e \mod N \\
\end{align}
$$

Which allows us to define the polynomials

$$
\begin{align}
&g_1(X) = X^e &\mod N \\
&g_2(X) = (X + (R_2 - R_1))^e &\mod N
\end{align}
$$

that both share the root $M_1 = 2^P M + R_1$. We're now back to the case of [Franklin-Reiter related-message](<attacks#Franklin-Reiter related-message>) with $a = 1$ and $b=R_2 - R_1$

### Hastad's Broadcast Attack

Suppose Alice sends an **unpadded** message $M$ to $k$ people $P_1, P_2, ..., P_k$, each using the same small public key exponent $e$ and different moduli $N_i$ for the $i$th individual. The public key for the $i$th individual is $(N_i, e)$.

The attack states that as soon as $k \geq e$, the message $M$ is no longer secure, and we can recover it easily using [Chinese Remainder Theorem](/cryptography/public-key/modular-arithmetic/#chinese-remainder-theorem).

#### Example

Alice sends a message $M$ to $3$ different people using the same public key exponent $e = 3$. Let the ciphertext received by the $i$th receiver be $C_i$, where $C_i = M^3 \mod N_i$.

We must assume that $gcd(N_i, N_j) = 1$ for $i \neq j$ (otherwise, it would be a [Common Prime Attack](/docs/cryptography/public-key/rsa/attacks/#common-prime).

We can now write:

$$
\begin{align}
M^3 &\equiv C_1 \mod N_1 \\
M^3 &\equiv C_2 \mod N_2 \\
M^3 &\equiv C_3 \mod N_3 \\
\end{align}
$$

Thus, by solving using the Chinese Remainder Theorem, we obtain:

$$
M^3 = \sum^{3}_{i=1} C_i b_i b_i^{'} \mod N
$$

where $b_i = \frac{N}{N_i}$, $b_i^{'} = b_i^{-1}$, and $N = N_1 \cdot N_2 \cdot N_3$.

Since we know that $M < N_i$, it follows that $M < N$. Therefore, we can directly recover $M$ by taking the integer cube root of $M^3$.

```python {linenos=table,filename="hastad_unpadded.py"}
from sage.all import *
from gmpy2 import iroot

def hastad_unpadded(N, e, c):
    c, _ = crt(c, N)
    return iroot(c, e)
```

### Common Modulus

When there are multiple public exponents $e1$ and $e2$, for multiple $c1$ and $c2$, with the same moduli $N$, you can use **Bézout’s identity** to compute $m$.

Using **Bézout’s algorithm**, you can find $a$ and $b$ such that $ae_1 + be_2 = 1$.

Then you can compute $m$ with:

$$
c_1^a c_2^b = m^{ae_1} m^{be_2} = m^{ae_1 + be_2 } = m^1 \equiv 1 \mod N
$$

```python {filname="common_modulus.py"}
from sage.all import ZZ
from sage.all import xgcd

def common_modulus(n, e1, c1, e2, c2):
    g, u, v = xgcd(e1, e2)

    p1 = pow(c1, u, n) if u > 0 else pow(pow(c1, -1, n), -u, n)
    p2 = pow(c2, v, n) if v > 0 else pow(pow(c2, -1, n), -v, n)

    return int(ZZ(int(p1 * p2) % n).nth_root(g))
```

### Small CTR exponents

Remember that in order to decrypt RSA using the CRT, you have to compute :

$$
\left\{\begin{aligned}
d_p &= d \mod p-1 \quad \Leftrightarrow \quad d_p = e^{-1} \mod p-1 \\
d_q &= d \mod q-1 \quad \Leftrightarrow \quad d_q = e^{-1} \mod q-1 \\
\end{aligned}
\right.
$$

If the value of $e$ is poorly chosen it’s possible that $d_p$ or $d_q$ is so small that you can find it with pure brute force. Let's see how.

From the definition of $d_p$, we have :

$$
d_p*e \equiv 1 \mod p - 1 \quad \Leftrightarrow \quad d_p*e = 1 + k(p - 1)
$$

Given any random number $m$ coprime to $p$, we can calculate

$$
\begin{aligned}
m^{e*d_p} &= m^{1 + k(p - 1)} \\
&= m * m^{k(p - 1)} \\
&\equiv m \mod p \quad \text{(*)}\\
\end{aligned}
$$

(*) by [Fermat’s little theorem](https://en.wikipedia.org/wiki/Fermat%27s_little_theorem)

We now have

$$
m^{e*d_p} \equiv m \mod p \quad \Leftrightarrow \quad m^{e*d_p} - m = kp
$$

As an attacker, you know $e$ and $N$ and you guess $d_p$. To verify your guess, you can choose any random number $m < N$ and compute :

$$
gcd(m^{e*d_p} - m, N) = p
$$

for a correct value of $d_p$, else $1$ or $N$. Guessing $d_p$ (or $d_q$, it works the same way) correctly successfully leaks a factor of $N$.

### Franklin-Reiter related-message

- [Wikipedia - Franklin Reiter's related message attack](https://en.wikipedia.org/wiki/Coppersmith%27s_attack#Franklin-Reiter_related-message_attack)

Suppose there are two messages $M_1$ and $M_2$ where $M_1 \neq M_2$, both less than $N$ and related to each other as $M_1 = f(M_2) \mod N$ for some linear polynomial equation where $b \neq 0$. These two messages are to be sent by encrypting using the public key $(N, e)$, thus giving ciphertexts $C_1$ and $C_2$ respectively. Then, given $(N, e, C1, C2, f)$, the attacker can recover messages M1 and M2. Let'ss see how :

We can write :

$$
\begin{aligned}
&C_1 \equiv M_1^e \equiv (f(M_2) \mod N)^e &\mod N \\
&C_2 \equiv M_2^e &\mod N \\
\end{aligned}
$$

From this, we can write the polynomials $g_1(X)$ and $g_2(X)$ as

$$
\begin{aligned}
&g_1(X) = f(X)^e - C_1 \in \mathbb{Z}_N[X] \\
&g_1(X) = X^e - C_2 \in \mathbb{Z}_N[X] \\
\end{aligned}
$$

We can clearly see that $M_2$ is a root of both the polynomials above and hence they have a common factor $x - M_2$ (since $g_1(M_2) = g_2(M_2) = 0$). Therefore, we can simply calculate GCD of $g_1$ and $g_2$ and if the resultant polynomial is linear, then we get out $M_2$ and hence $M_1$.

```python {linenos=table,filename="franklin_reiter.py"}
from sage.all import *

def gcd(a, b):
    while b:
        a, b = b, a % b
    return a.monic()

def franklinreiter(C1, C2, e, N, a, b):
    P.<X> = PolynomialRing(Zmod(N))

    g1 = (a*X + b)^e - C1
    g2 = X^e - C2

    # The GCD returns x - M2, which is -M2 + x
    # So we take an negate the rsit coefficient to get M2
    return  -gcd(g1, g2).coefficients()[0]
```

> [!note] Attack time
> As $e$ grows, this attacks take more and more time, but it should still be doable for small enought values. On my PC, it took less than 30 minutes for $e = 65537$

### Nitaj CRT

- [nitaj_crt_rsa.py](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/rsa/nitaj_crt_rsa.py)
- [A new attack on RSA and CRT-RSA](https://nitaj.users.lmno.cnrs.fr/rsa21.pdf)

> [!important] TODO

## Oracles

This section covers attacks based on you having access to some form of encryption or decryption oracle, allowing you to perform variants of chosen plaintext or ciphertext attacks.

### LSB Oracles

#### Parity Oracle

Suppose you have a ciphertext $C = M^e \mod N$ of a message $M$ that you want to find. Let's also suppose that you have access to an oracle that can decrypt what you send him, but only reveals to you the last bit.

You now have a parity oracle that tells whether $M^{'} = (C^{'})^d  \mod N$ is even or odd.

You also know that, because $N$ is odd, if $2^k m < N$, then $2^k m$ is even, because the modulus has no effect, else it will be odd, because $N$ is.

> [!note]
> $N$ is odd because it is the product of two prime numbers, which are always odd by definition (except for 2, which would be a very bad factor of $N$ for obvious security reasons).

Increment $k$ and query the oracle until $2^k m $ is odd, then you have :

$$
\begin{align}
2^k \cdot m &< N \\
\Leftrightarrow \frac{N}{2^{k}} < m &< \frac{N}{2^{k-1}} \\
\end{align}
$$

Now can keep going as in a binary search, adjusting left bound when odd nad right one when even.

```python {linenos=table,filename="lsb_oracle.py"}
from sage.all import *

left = ZZ(0)
right = ZZ(N)
k = pow(2, e, N)

while right - left > 1:
    c = (c * k) % N
    if oracle(c) == 0:
        right = (right + left) / 2
    else:
        left = (right + left) / 2

m = int(right)
```

#### Attack variant

> [!note]
> This variant method has the advantage of being independent of the modulus $N$, meaning that we can still continue to retrieve the message $M$ event if $N$ changes half-way through, without starting over.

In this method, we want to directly retrieve the bits of the message $M$ one by one. To do this, we will send a chosen ciphertext, such that when decrypted, it *right-shifts* the message $M$ by an offset $i$, thus revealing the bit $b_i$.

You know that you can do a *right-shift* of $i$ by multiplying by $2^{-i}$. So, given $C = M^e \mod N$, calculate $C_i = C \cdot (2^{-ie} \mod N) \mod N$ and send it to the oracle.

It will calculate and return

$$
M_i = (C_i^d \mod N) \mod 2 \equiv M \cdot (2^{-ie} \mod N) \mod 2
$$

{{< details title="Here are the details of the following calculations" closed="true" >}}

To know why those calculations are necessary, go check out the section on [modular bit shifts](docs/cryptography/math-fundamentals/modular-arithmetic/#right-shift) from a previous note.

> [!important] TODO

{{< /details >}}

Skipping the details here, we have :

$$
\begin{aligned}
&M \cdot (2^{-ie} \mod N) \mod 2 \\
\quad \Rightarrow \quad &\{((M \cdot 2^{-i}) \mod 2) - ((b_{i-1}2^{i-1} + \cdots + b_02^0) \cdot 2^{-i} \mod N) \} \equiv b_i \mod 2 \\
\end{aligned}
$$

It means we can successfully recover the bit $b_i$ of $M$ at position $i$ if we already know the previous $i - 1$ bits of $M$. Since we know $b_0$ at the start, we can retrieve $b_1$, and knowing $b_0$ and $b_1$, we can retrieve $b_2$ and so on so, we can keep going from there until we've retrieved all the bits of $M$.

```python {linenos=table,filename="lsb_oracle_variant.py"}
from Crypto.Util.number import long_to_bytes, bytes_to_long

def oracle(ciphetext: int):
    # return the last bit / byte
    #
    # [...]
    #
    if res:
        return 1
    else:
        return 0

def lsb_oracle_variant(c: int, decrypt_oracle, e, N, message_bit_len=None):

   out = decrypt_oracle(c)
   m = str(out)

   i = 1
   while True:
       inv_pow2 = pow(2**i, -1, N)
       out = decrypt_oracle(c * pow(inv_pow2, e, N))

       m_lsb = (out - (int(m, 2) * inv_pow2) % N) % 2
       m = str(m_lsb) + m
       # print(m)
       if len(m) % 8 == 0:
           print(long_to_bytes(int(m, 2)))

       if message_bit_len:
           if message_bit_len == i:
               break
       else:
           if m[:8] == "0" * 8:
               m = m[8:]
               break
       i += 1

   m = long_to_bytes(int(m, 2))
   print(m)

   return m
```

#### Byte oracle

- [RSA Byte Oracle](https://github.com/mahaloz/ctf-wiki-en/blob/master/docs/crypto/asymmetric/rsa/rsa_chosen_plain_cipher.md#rsa-byte-oracle)

Here is an example for a *"last byte"* oracle, which is an oracle that only reveals the last byte of the decrypted chosen ciphertext.

```python {linenos=table,filename="last_byte_oracle.py"}
def lsb_oracle_variant(c: int, decrypt_oracle, e, N, message_byte_len):
    out = decrypt_oracle(c)
    m = bytes([out])

    i = 1
    while True:
        inv_pow2 = pow(2 ** (8 * i), -1, N)
        out = decrypt_oracle(c * pow(inv_pow2, e, N))

        m_lsbs = (out - (bytes_to_long(m) * inv_pow2) % N) % 2**8
        m = bytes([m_lsbs]) + m
        print(m)

        if message_byte_len:
            if message_byte_len == i:
                print(m)
                break
        else:
            if m[0] == 0:
                m = m[1:]
                print(m)
                break

        i += 1

    return m
```

> [!note]
> You can also find $M$ by using the binary search method presented earlier but using $256^i$ this time as the multiplier instead of $2^i$.

### Decipher oracle

Suppose you're given an encrypted ciphertext $C = M^e \mod N$ and access to a decipher oracle. This oracle will decrypt the messages you send him but will check that you don't ask him to decrypt $C$ exactly.

In this case, just compute $C_2 = C \cdot 2^e \mod N$ and send it to the oracle.
It will decrypt it as

$$
\begin{aligned}
M_2 &= (C_2)^d \mod N \\
&= (C \cdot 2^e)^d \mod N \\
&= (M^e \cdot  2^e)^d \mod N \\
&= M^{ed} \cdot 2^{ed} \mod N \\
&= 2M \mod N \\
\end{aligned}
$$

You can now recover $M$ by multiplying $M_2$ with the multiplicate inverse of $2$ mod $N$.

### Padding oracle

#### Bleichenbacher’s attack on PKCS#1 v1.5

> [!important] TODO

#### Manger's attack on OAEP

- [manger.py](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/rsa/manger.py)

> [!important] TODO

## Fault attacks

### Faulty signature

When signing a message the usual way, we calculate $s = m^d \mod N$. Suppose now that you have a valid signature $s_v$ for a message $m$, and a set of faulty signatures $\{s_{f0}, s_{f1}, \cdots, s_{fi}\}$ for this same message, with each $s_{fi}$ being the result of a faulty signing process with a bit-flip in $d$ at position $b_i$. Let's see how we can recover bits of $d$ from those faulty signatures.

If $d$ has suffered a bit-flip, then there is one more or one less power of $2$, such that $d_f = d \pm 2^{b_i}$, is our faulty $d$.

> [!important] Precision
> $$d_f = d + \left\{\begin{aligned}&2^{b_i} \quad \text{for bit-flip} \quad 0 \longrightarrow  1 \\ -&2^{b_i} \quad \text{for bit-flip} \quad 1 \longrightarrow  0\end{aligned}\right.$$

So now, when we use $d_f$ to sign our message, we calculate

$$
\begin{aligned}
s_f &= m^{d_f} &\mod N \\
&= m^{d \pm 2^{b_i}} &\mod N \\
&= m^d \cdot m^{\pm 2^{b_i}} &\mod N \\
&= s_v \cdot m^{\pm 2^{b_i}} &\mod N \\
\end{aligned}
$$

We can then isolate the *bit-flip related* part by calculating

$$
\frac{s_{fi}}{s_v} \mod N = \left\{\begin{aligned}&m^{+ 2^{b_i}} \mod N \quad \text{for bit-flip} \quad 0 \longrightarrow  1 \\ &m^{- 2^{b_i}} \mod N \quad \text{for bit-flip} \quad 1 \longrightarrow  0\end{aligned}\right.
$$

As we know $N$, $s_v$ and $m$, we can precompute the $m^{+ 2^{b_i}}$ and $m^{- 2^{b_i}}$ for all $b_i$ possible bit-flip positions in $d$ (that we know from $N$ because $d$ is of the same order).

You can now find the bit-flip position **and** original bit value in $d$ by comparing $\frac{s_{fi}}{s_v} \mod N$ with the pre-computed values.

```python {linenos=table,filename="faulty_d_sig.py"}
d_bits = [None] * n.bit_length()
m = 2

# Pre-compute values
mi = {}
for i in range(n.bit_length())
    mi[pow(m, +2 ** i, n)] = (i, 0)
    mi[pow(m, -2 ** i, n)] = (i, 1)

# sf is the list of faulty signatures
for sfi in sf:
    di = pow(sv, -1, n) * sfi % n
    if di in mi:
        d_bits[mi[di][0]] = mi[di][1]
```

### Faulty CRT signature

#### Known message

Remember that when signing with CRT, we calculate :

$$
\left\{\begin{aligned}
s_p = m^{d_p} + k_1 p \Leftrightarrow s_p \equiv m^{d_p} \mod p \\
s_q = m^{d_q} + k_2 q \Leftrightarrow s_q \equiv m^{d_q} \mod q \\
\end{aligned}
\right.
\quad \Rightarrow \quad s = m^d + k_3 pq
$$

Without faults during the calculation of the partial signatures $s_p$ and $s_q$, we can do the following observations when verifying the final signature $s$ :

$$
\left\{\begin{aligned}
s^e \equiv m \mod p \\
s^e \equiv m \mod q \\
\end{aligned}
\right.
$$

$$
\left\{\begin{aligned}
s^e - m \equiv 0 \mod p \\
s^e - m \equiv 0 \mod q \\
\end{aligned}
\right.
$$

$$
\left\{\begin{aligned}
s^e - m = k_1 p \\
s^e - m = k_2 q \\
\end{aligned}
\right.
\quad \Rightarrow \quad s^e - m = k_3 pq
$$

Thus, $gcd(s^e - m, N) = N$

Now, imagine an error occurred on one or more bits during the calculation of $s_p$. We can observe something interesting :

$$
\left\{\begin{aligned}
s^e \not\equiv m \mod p \\
s^e \equiv m \mod q \\
\end{aligned}
\right.
$$

$$
\left\{\begin{aligned}
s^e - m \not\equiv 0 \mod p \\
s^e - m \equiv 0 \mod q \\
\end{aligned}
\right.
$$

$$
\left\{\begin{aligned}
s^e - m \neq k_1 p \\
s^e - m = k_2 q \\
\end{aligned}
\right.
\quad \Rightarrow \quad s^e - m = k_3q
$$

We now have $gcd(s^e - m, N) = q$, which gives us $q$

```python {linenos=table,filename="faulty_signature.py"}
from math import gcd

q = gcd(pow(s, e, N) - m, N)
if 1 < q N:
    p = N // q
    print(p, q)
```

#### Unknown message

If you don't know the message $m$ associated with faulty signature $s_f$, but you know a valid signature $s_v$ of $m$, then you calculate :

$$
gcd(s_v - s_f, N) = p
$$

> [!note] Remark
> To stay consistent with previous statements, you can also calculate $$gcd(s_v^e - s_f^e, N) = p$$

## Signature forgery

### Chosen suffix for odd e

- [The 9 Lives of Bleichenbacher’s CAT: New Cache Attacks on TLS Implementations](https://eprint.iacr.org/2018/1173.pdf)

If the public exponent $e$ is odd and small enough, you can forge a signature $S$ such that $S^e < N$ ends with a chosen suffix.

```python {linenos=table,filename="suffix_sig_forgery.py"}
def chosen_suffix_sig_forgery(suffix, e):
    # Returns a number s for which s^e ends with the provided suffix.

    assert suffix % 2 == 1, "Target suffix must be odd"
    assert e % 2 == 1, "Exponent must be odd"

    s = 1
    for i in range(suffix.bit_length()):
        if (((s**e) >> i) & 1) != ((suffix >> i) & 1):
            s |= 1 << i

    return s
```

{{< details title="Proof" >}}

Let's take $e = 3$ for the demonstration purposes.

We want to find the bits $s_i$ of $S$ such that $S^3 = r + C$ for a chosen suffix $C$ and a random *garbage* number $r$.

We can express these numbers in binary as

$$
\begin{aligned}
S = s_i 2^i + \cdots + s_0 2^0 \\
C = c_i 2^i + \cdots + c_0 2^0 \\
\end{aligned}
$$

> [!warning] Work in progress ...

{{< /details >}}

### Desmedt-Odlyzko attack

- [desmedt_odlyzko.py](https://github.com/jvdsn/crypto-attacks/blob/master/attacks/rsa/desmedt_odlyzko.py)
- [Practical Cryptanalysis of ISO/IEC 9796-2 and EMV Signatures](https://eprint.iacr.org/2009/203.pdf)

> [!important] TODO ...
