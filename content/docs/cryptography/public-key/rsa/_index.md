---
title: RSA Cryptosystem
linkTitle: RSA
tags:
- cybersecurity
- cryptography
- rsa
- public-key
prev: /docs/cryptography/public-key
next: /docs/cryptography/public-key/rsa/attacks
---

[**RSA**](https://en.wikipedia.org/wiki/RSA_%28cryptosystem%29) **(Rivest–Shamir–Adleman)** is a **public-key** cryptographic algorithm used to share data securely over a public channel. A **private key** is used to decrypt data, while a **public key**, derived from the private one, is used to encrypt data.

## Textbook definition

This section describes the *textbook* (i.e no padding) RSA implementation and details the three basic primitives of any public-key cryptosystem :

- [Key generation](#keys-generation)
- [Encryption](#encryption)
- [Decryption](#decryption)

### Parameters

| Name | Description |
| :--: | :---------- |
| $p, q$ | The prime factors of $N$ |
| $N$ | The public modulus: $N=p \cdot q$ |
| $e$ | The public exponent coprime to $N$ |
| $\phi(N)$ | Euler's totient of $N$: $\phi(N) = (p - 1)(q - 1)$ |
| $d$ | The private exponent:  $d = e^{-1} \mod \phi(N)$ |
| $M$ | The message to encrypt |
| $C$ | The encrypted message: $C = M^e \mod N$ |

### Key generation

1. Choose two large prime numbers $p$ and $q$.
2. Compute $N = p \cdot q$
3. Compute Euler's Totient $\phi(N) = (p - 1)(q - 1)$
4. Choose any integer $e$ such that $1 < e < \phi(N)$ and $gcd(e, \phi(N)) = 1$
5. Compute $d$, the modular multiplicative inverse of $e$, such that $ed = 1 \mod \phi(N)$

### Encryption

To encrypt a message $M$, we use the public key $(N, e)$ to compute :

$$
C = M^e \mod N
$$

### Decryption

To decrypt an encrypted message, we use the private key $(N, d)$ to compute :

$$
M = C^d \mod N
$$

---

Here is a simple implentation in Python

```python {linenos=table,filename="rsa.py"}
p, q = 61, 56
e = 65537 # 2^16 + 1

# Key generation
N = p * q
d = pow(e, -1, (p - 1)*(q - 1)) # Modular multiplicative inverse

# Encryption
M = 65
C = pow(M, e, N)
print("Encrypted message: ", C)

# Decryption
m = pow(C, d, N)
print("Decrypted message: ", M)
```

```bash
Encrypted message:  3217
Decrypted message:  65
```

## Key structure

### PEM format

- [ASN.1 vs DER vs PEM vs x509 vs PKCS#7 vs ....](https://www.cryptologie.net/posts/asn1-vs-der-vs-pem-vs-x509-vs-pkcs7-vs/)

Here is an [Online decoder](https://lapo.it/asn1js/) for PEM, DER and ASN.1

You can also read those file formats using the [Pycryptodome](https://pycryptodome.readthedocs.io/en/latest/src/public_key/rsa.html#Crypto.PublicKey.RSA.import_key) python library.

```python {linenos=table,filename="load_pem.py"}
from Crypto.PublicKey import RSA

with open('public.pem','r') as f:
    key = RSA.import_key(f.read())
```

## Decrypt using CRT

RSA decryption operation can be made significantly faster by using the **Chinese Remainder Theoreom**. To do that, the following values are precomputed and stored as part of the private key:

$$
\left\{\begin{aligned}
d_p &= d \mod p-1 \\
d_q &= d \mod q-1 \\
q_{inv} &= q^{-1} \mod p \\
\end{aligned}
\right.
$$

These values allow the recipient to compute the exponentiation $M = C^d \mod N$ more efficiently as follows:

$$
\begin{aligned}
M_1 &= C^{d_p} \mod p \\
M_2 &= C^{d_q} \mod q \\
h &= q_{inv}(M_1 - M_2) \mod p \\
M &= M_2 + h \cdot q \\
\end{aligned}
$$

## Recover parameters

In this section, I will present various methods to recover the different parameters of the RSA cryptosystem given partial information.

### Known P+Q or P-Q

Suppose you know $p -q$, you can find that $p^2 - (p - q)p = N$, which in turn give us :

$$
p^2 - (p - q)p - N = 0
$$

a quadratic polynomial that we can solve for $p$ !

> [!note] Calculus
> {{< details title="Check the formulas" closed="true" >}}

We compute $p$ as :

$$
p = \frac{-b + \sqrt{\Delta}}{2a}
$$

with

$$
\Delta = b^2 - 4ac = (p - q)^2 + 4N
$$

so that we have

$$
p = \frac{-(p - q) + \sqrt{(p - q)^2 + 4N}}{2}
$$

{{< /details >}}

Skipping the steps, we have

$$
p = \frac{-(p - q) + \sqrt{(p - q)^2 + 4N}}{2}
$$

> [!important]
> When we know $p + q$, we have $p^2 - (p + q)p + N = 0$, so in this case we compute $$p = \frac{-(p + q) + \sqrt{(p + q)^2 - 4N}}{2}$$

### Known Euler's Totient

Suppose you know $\phi$, then you may find that :

$$
\begin{aligned}
N + 1 - \phi &= pq + 1 - (p - 1)(q - 1) \\
&= pq + 1 - (pq - p - q + 1) \\
&= p + q \\
\end{aligned}
$$

Knowing this brings us back to [this case](#known-pq-or-p-q).

> [!tip] Another possibility
> Since you know $e$ and $\phi$, you could simply calculate $d = e^{-1} \mod \phi$

### Known private exponent

- [Calculate primes p and q from private exponent (d), public exponent (e) and the modulus (n)](https://stackoverflow.com/questions/2921406/calculate-primes-p-and-q-from-private-exponent-d-public-exponent-e-and-the)

Suppose you know $d$ and $e$, then you have:

$$
e*d \equiv 1 \mod \phi \quad \Rightarrow \quad e*d - 1 = k\phi
$$

Find the biggest number $x$ such that

$$
k\phi = 0 \mod (2^x) \quad \Leftrightarrow  \quad k\phi = r \cdot 2^x
$$

1. Choose $g \in [0, N-1]$
2. Repeat step 2 until found
3. For $t$ going from $0$ to $x$

    - Calculate $y = g^{\frac{k\phi}{2^t}} \mod N$
    - Calculate $p = gcd(y - 1, N)$
    - if $1 < p < N$ and $N = 0 \mod p$, then
      - You found $p$ and $q = \frac{N}{p}$

```python {linenos=table,filename="known_d.py"}
# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/rsa/known_d.py

from math import gcd
from random import randrange

def attack(N, e, d):
    """
    Recovers the prime factors from a modulus if the public exponent and private exponent are known.
    :param N: the modulus
    :param e: the public exponent
    :param d: the private exponent
    :return: a tuple containing the prime factors
    """
    k = e * d - 1
    t = 0
    while k % (2 ** t) == 0:
        t += 1

    while True:
        g = randrange(1, N)
        for s in range(1, t + 1):
            x = pow(g, k // (2 ** s), N)
            p = gcd(x - 1, N)
            if 1 < p < N and N % p == 0:
                return p, N // p
```

#### Another method

We know

$$
e*d - 1 = k\phi \quad \Rightarrow \quad k = \frac{e*d - 1}{\phi}
$$

Yet, we don't know $\phi$, but we can make the ***not so bad*** approximation $\phi \approx N$ to approximate $k$ as

$$
k \approx \left\lfloor\frac{e*d - 1}{N} \right\rfloor
$$

Rearranging the terms, we can calculate

$$
\phi = \frac{e*d - 1}{k}
$$

If the result is not an integer, increment $k$ until it is. That’s because of the approximation. You now can recover $p$ and $q$ [this way](#known-eulers-totient)

#### Small public exponent

Alternatively, if $e$ is small, then $ed = k\phi + 1$ where $k < e$.

```python {linenos=table}
from Crypto.Util.number import getPrime
import math

p = getPrime(1024)
q = getPrime(1024)
e = 0x10001
phi = (p - 1) * (q - 1)
d = pow(e, -1, phi)
n = p * q


def attack(n, e, d):
    # find k
    for k in range(1, 100000):
        phi = (e * d - 1) // k
        p_plus_q = n + 1 - phi
        p = (-p_plus_q + math.isqrt(p_plus_q**2 - 4 * n)) // -2
        q = n // p
        if p * q == n and (p - 1) * (q - 1) == phi:
            # found
            return p
    return None


res = attack(n, e, d)
assert res == p or res == q
```

### Known CRT exponent

> [!note]
> What follows works equally well for $d_q$ !

Suppose you know $d_p$, then we know that :

$$
e * d \equiv 1 \ (\text{mod} \ \phi) \quad \Rightarrow  \quad e * d_p \equiv 1 \ (\text{mod} \ p - 1)
$$

Choosing $e = 65537$ as usual, we can recover $p$ the following way :

$$
e * d_p = 1 + k_p(p - 1)
$$

for some integer $k_p$. AS $e$ is fairly small, so will $k_p$. We can rearrange the above for:

$$
p = \frac{e * d_p - 1}{k_p} + 1
$$

with the only unknown being $k_p$.

Using python, we find a potential prime very quickly:

```python {linenos=table,filename="known_crt.py"}
from Crypto.Util.number import isPrime

# Example values
e = 65537
q = 0xc28871e8714090e0a33327b88acc57eef2eb6033ac6bc44f31baeac33cbc026c3e8bbe9e0f77c8dbc0b4bfed0273f6621d24bc1effc0b6c06427b89758f6d433a02bf996d42e1e2750738ac3b85b4a187a3bcb4124d62296cb0eecaa5b70fb84a12254b0973797a1e53829ec59f22238eab77b211664fc2fa686893dda43756c895953e573fd52aa9bb41d22306135c81174a001b32f5407d4f72d80c5de2850541de5d55c19c1f817eea994dfa534b6d941ba204b306225a9e06ddb048f4e34507540fb3f03efeb30bdd076cfa22b135c9037c9e18fe4fa70cf61cea8c002e9c85e53c1eaac935042d00697270f05b8a7976846963c933dadd527227e6c45e1
dp = 0x878f7c1b9b19b1693c1371305f194cd08c770c8f5976b2d8e3cf769a1117080d6e90a10aef9da6eb5b34219b71f4c8e5cde3a9d36945ac507ee6dfe4c146e7458ef83fa065e3036e5fbf15597e97a7ba93a31124d97c177e68e38adc4c45858417abf8034745d6b3782a195e6dd3cf0be14f5d97247900e9aac3b2b5a89f33a3f8f71d27d670401ca185eb9c88644b7985e4d98a7da37bfffdb737e54b6e0de2004d0c8c425fb16380431d7de40540c02346c98991b748ebbc8aac73dd58de6f7ff00a302f4047020b6cd9098f6ba686994f5e043e7181edfc552e18bce42b3a42b63f7ccb7729b74e76a040055d397278cb939240f236d0a2a79757ba7a9f09

for kp in range(3, e):
    p_mul = dp * e - 1
    if p_mul % kp == 0:
        p = (p_mul // kp) + 1
        if isPrime(p):
            print(f"Possible p: {p}")
```

#### Known Dp and Dq

> [!note]
> What is described here is more for the Maths than anything else, because it requires you to already know $p$ and $q$, which are generally the numbers we're looking for.

If we know both $d_p$ and $d_q$, then by construction :

$$
\left\{\begin{aligned}
d_p &= d \mod p-1 \\
d_q &= d \mod q-1 \\
\end{aligned}
\right.
$$

which means we have

$$
\left\{\begin{aligned}
d &= d_p^{-1} \mod p-1 \\
d &= d_q^{-1} \mod q-1 \\
\end{aligned}
\right.
$$

and $d$ is the solution to this system of modular equations, and thus we can be calculated using the CRT.

```python {linenos=table,filename="known_dp_dq.py"}
d1 = pow(dp, -1, p - 1)
d2 = pow(dq, -1, q - 1)
d = crt([d1, d2], [p - 1, q - 1])
```

### Factorize of known bits

In this section, we'll see how in some cases it is possible to recover the prime factors $p$ and $q$ of $N = pq$ if we know some consecutive *high* or *low* bits of one of the primes.

The following attacks are based on or are variants of the [Coppersmith's method](https://en.wikipedia.org/wiki/Coppersmith_method)

#### Known MSB bits

> [!important] TODO

#### Known LSB bits

> [!important] TODO

#### References

- [A Coding-Theoretic Approach to Recovering Noisy RSA Keys](https://eprint.iacr.org/2012/724.pdf)
- [RSA private key reconstruction from random bits using SAT solvers](https://eprint.iacr.org/2013/026.pdf)

### Retrieve modulus

This section cover how to retrieve the modulus $N$, knowing the public exponent $e$ and given a cipher oracle.

#### Known public exponent

If you know $e$, simply choose at least two random messages $M_1, M_2$ and use the oracle to get $C_1, C_2$.

Now by definition, you know that :

$$
\begin{aligned}
C_1 \equiv M_1^e \mod N \quad \Rightarrow \quad C_1 = M_1^e + k_1N \\
C_2 \equiv M_2^e \mod N \quad \Rightarrow \quad C_2 = M_2^e + k_2N \\
\end{aligned}
$$

So, you can calculate

$$
gcd(C_1 - M_1^e, C_2 - M_2^e) = gcd(k_1N, k_2N) = k_3N
$$

with a small factor $k_3$

> [!caution]
> As we don't know the modulus, we're calculating the whole numbers $M_i^e$, which can be **very** intensive for big $e$, thus taking much time and memory to compute.

> [!important]
> By keeping this method and using more messages ($M_3, M_4, \cdots$), you increase the chances of $k_3$ being just $1$, hence giving you directly the modulus $N$ as a result of the last formula.

#### Unknown or Too big

In the more general case, if $e$ it is too big to use the first method or even **unknown**, you can use this one.

> [!note]
> As in the previous method, taking more messages increase the chances of getting exactly the correct modulus $N$ as the result of the calculations.

As before, take two random messages $M_1, M_2$, square them to get $M_1^{'} = M_1^2, M_2^{'} = M_2^2$ and finally use the oracle to get the values of $C_1, C_2, C_1^{'}$ and $C_2^{'}$.

Now, since $M_i^{'} = M_i^2$, it follows that $C_i^{'} \equiv C_i^2 \mod N$ and thus $C_i^2 - C_i^{'} = k_iN$. As a consequence, using the same arguments as in the firt method, $N$ can be factored from

$$
gcd(C_1^2 - C_1^{'}, C_2^2 - C_2^{'}) = kN
$$

## Tools

### Factorize

- [Integer factorization calculator - Online](https://www.alpertron.com.ar/ECM.HTM)
- [Cado-NFS, An Implementation of the Number Field Sieve Algorithm](https://github.com/cado-nfs/cado-nfs)
- [Factors online database](https://factordb.com/)

### CTF

- [RsaCtfTool](https://github.com/RsaCtfTool/RsaCtfTool)
- [RSA Calculator](https://www.tausquared.net/pages/ctf/rsa.html)

## Resources

- [RSA Cryptosystem - Wikipedia](https://en.wikipedia.org/wiki/RSA_cryptosystem)
- [CTF Writeups by @jiegec - Solving RSA Private Key](https://jia.je/ctf-writeups/misc/rsa.html#)
