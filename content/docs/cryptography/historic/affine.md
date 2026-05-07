---
title: Affine Cipher
linkTitle: Affine Cipher
---

The [affine cipher](https://en.wikipedia.org/wiki/Affine_cipher) is a type of monoalphabetic substitution cipher, where each letter in an alphabet is mapped to its numeric equivalent, encrypted using a simple mathematical function, and converted back to a letter

## Basics

Let's take the **alphabet** as our charset. We can then define our affine cipher in terms of parameters $a$, $b$, and a charset size $m$. The plaintext and ciphertext character at position $i \in \mathbb{N}$, respectively $P_i$ and $C_i$, can be expressed as follows:

$$
\begin{aligned}
C_i &= a \cdot P_i + b &\mod m \\
P_i &= a^{-1}(C_i - b) &\mod m \\
\end{aligned}
$$

with $a^{-1}$ the multiplicative inverse of $a$ modulo $n$.

The value $a$ must be chosen such that $a$ and $n$ are coprime. This is necessary for a multiplicative inverse to exist and thus make decryption uniquely possible.

---

```python {linenos=table,filename="affince_cipher.py"}
import string

# Maps integer to letter
D = dict(enumerate(string.ascii_lowercase, start=0))
# Maps letter to integer
E = {v: k for k, v in D.items()}
# Size of the charset
SIZE = len(string.ascii_lowercase)

def affine_encrypt(s, a, b) -> str:
    ret = ""
    for c in s:
        if c in E:
            ret += D[(a * E[c] + b) % SIZE]
        else:
            ret += c
    return ret

def affine_decrypt(s, a ,b):
    ret = ""
    a_inv = pow(a, -1, SIZE)
    for c in s:
        if c in E:
            ret += D[(a_inv * (E[c] - b)) % SIZE]
        else:
            ret += c
    return ret

ciphertext = affine_encrypt("this is a plaintext", 7, 3)
plaintext = affine_decrypt(ciphertext, 7, 3)
print(ciphertext)
print(plaintext)

# >>> gahz hz d ecdhqgfig
# >>> this is a plaintext
```

## Attacks

### Brute-force

Because $a$ must be coprime to $m$, there is a limited number of $a$ values in $[1, m-1]$ which are possible. As for the $b$ parameter, there $m$ possible values.

It means that if we take the largest upper bounds, you have a maximum of $m^2$ possible tuples of parameters $(a, b)$ that could have encrypted the cipertext.

```python {linenos=table,filename="brute_force_affine_cipher.py"}
# [...]
# Based on previous code

for a in range(1, SIZE):
    for b in range(SIZE):
        # Check if a is coprime to m
        if math.gcd(a, SIZE) == 1:
            print(affine_decrypt(ciphertext, a, b), a, b)

# >>> ...
# >>> iwxh xh p eapxcitmi 7 2
# >>> this is a plaintext 7 3
# >>> ...
```

### Known plaintext

Because there are only two unknown parameters, $a$ and $b$, and because the encryption relation is linear, if you know two pairs of plaintext-ciphertext characters $(P_1, C_1)$ and $(P_2, C_2)$, you can recover the parameters by solving a linear system of congruences.

More precisely, you have

$$
\begin{equation}
C_1 = aP_1 + b \mod m \tag{1}
\end{equation}
$$

$$
\begin{equation}
C_2 = aP_2 + b \mod m \tag{2}
\end{equation}
$$

By re-arranging (2), you get

$$
\begin{equation}
b = C_2 - aP_2 \mod m \tag{3}
\end{equation}
$$

that you can now inject in (1) to recover $a$

$$
\begin{aligned}
C_1 &= aP_1 + C_2 - aP_2 &\mod m \\
\Longleftrightarrow \quad C_1 &= a(P_1 - P_2) + C_2 &\mod m \\
\\
\Longleftrightarrow \quad a &= \frac{C_1 - C_2}{P_1 - P_2} &\mod m \\
\end{aligned}
$$

Finally, you recover $b$ by using (3)

```python {linenos=table,filename="known_plaintext_affine_cipher.py"}
# [...]

know = [("p", "e"), ("i", "h")]
a = (pow(E[know[0][0]] - E[know[1][0]], -1, M) * (E[know[0][1]] - E[know[1][1]])) % M
b = (E[know[1][1]] - a*E[know[1][0]]) % M

print(">>>", affine_decrypt(ciphertext, a, b), a, b)

# >>> this is a plaintext 7 3
```
