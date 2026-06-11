---
title: "404CTF 2026 - Crypto Write-Ups"
date: 2026-06-10
tags:
- ctf
- 404ctf
- 2026
- crypto
- blog
- writeup
- rsa
- dlp
- polhig-hellman
- hellman
- dhke
- python
- prng
---

<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD013 -->

Welcome back 👋 ! In this new post, I’ll again present my write-ups for all the challenges listed in the crypto category that I've solved, this time for 2026 edition of the 404CTF, ordered by difficulty rating.

<!--more-->

> [!tip] Another Write-Up ?
> You can find the write-up for `Pas functional encryption` in a [dedicated blog post](../404ctf-2026-crypto-2)

Those challenges are :

1. [Dur à CERNer](#dur-à-cerner)
2. [Déjeuner à l'ANSSI](#déjeuner-à-lanssi)
3. [Too big or too small](#too-big-or-too-small)
4. [2B or not to be](#2b-or-not-to-be)
5. [Le Tour de RSA en quatre-vingts seize jours](#le-tour-de-rsa-en-quatre-vingts-seize-jours)
6. [What the hellman](#what-the-hellman)
7. [Pas très discret](#pas-très-discret)
8. [CHAesT](#chaest)

> [!note]
> You can find the original sources for all the challenges in [the official GitHub repository](https://github.com/HackademINT/404CTF-2026) of the event.

---

Here is the difficulty rating legend:

| Symbol | Difficulty | Base Points |
|:------:|:----------:|:-----------:|
| 😇     | Intro      | 100         |
| 🙂     | Easy       | 500         |
| 😑     | Medium     | 500         |
| 😡     | Hard       | 500         |
| 😈     | Insane     | 500         |

> [!note] Information
> The **base points** represent the points that were valued for challenges at the beginning of the CTF, before any solves.

## Dur à CERNer

| Points | Difficulty | Solves |
| :----: | :--------: | :----: |
| **100**  |  😇   | **478**     |

**Description**

> Le [CERN](https://fr.wikipedia.org/wiki/Organisation_europ%C3%A9enne_pour_la_recherche_nucl%C3%A9aire) tente une nouvelle manière d'obtenir des collisions de particules en les envoyant une par une. Si cette méthode marchait, cela permettrait de drasiquement réduire le coût des opérations ! Malheureusement, les chances d'obtenir une collision semblent astronomiquement faibles...
>
> `nc challenge.404ctf.fr 10007`

**Code**

The following source code was provided :

```python {linenos=table,filename="dur-à-cerner.py"}
import os
import hashlib

def logo():
    print("""
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀                                                                                             ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡾⠋⠙⢷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀                                                                                             ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡾⠋⠙⢷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⡿⠁⠀⠀⠈⢿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀                                                                                             ⠀⠀⠀⠀⠀⠀⠀⠀⢀⡿⠁⠀⠀⠈⢿⡀⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣀⣤⣤⣀⣀⡀⠀⢸⠃⠀⠀⠀⠀⠘⡇⠀⢀⣀⣀⣤⣤⣀⡀⠀⠀⠀                                                                                             ⢀⣀⣤⣤⣀⣀⡀⠀⢸⠃⠀⠀⠀⠀⠘⡇⠀⢀⣀⣀⣤⣤⣀⡀
⢸⠉⠀⠀⠉⠉⠛⠻⣿⣤⣀⠀⠀⣀⣤⣿⠟⠛⠉⠉⠁⠈⠉⡇⠀⠀⠀ mmmmmm     mmmmmm   mmmmmmmm  mmm   mm  mm    mm  mmmmmmmm  mmm   mm  mm    mm  mmmmmmmm    ⢸⠉⠀⠀⠉⠉⠛⠻⣿⣤⣀⠀⠀⣀⣤⣿⠟⠛⠉⠉⠁⠈⠉⡇
⠘⣧⡀⠀⠀⠀⠀⠀⣇⣀⣽⠿⠿⣯⣀⣸⠀⠀⠀⠀⠀⢀⣼⠃⠀⠀⠀ ##\"\"\"\"##   \"\"##\"\"   ##\"\"\"\"\"\"  ###   ##  \"##  ##\"  ##\"\"\"\"\"\"  ###   ##  ##    ##  ##\"\"\"\"\"\"    ⠘⣧⡀⠀⠀⠀⠀⠀⣇⣀⣽⠿⠿⣯⣀⣸⠀⠀⠀⠀⠀⢀⣼⠃
⠀⠈⠻⣦⡀⠀⣠⣴⡟⠉⠀⢀⡀⠀⠉⢻⣦⣄⠀⢀⣴⠟⠁⠀⠀⠀⠀ ##    ##     ##     ##        ##\"#  ##   ##  ##   ##        ##\"#  ##  ##    ##  ##          ⠀⠈⠻⣦⡀⠀⣠⣴⡟⠉⠀⢀⡀⠀⠉⢻⣦⣄⠀⢀⣴⠟⠁⠀
⠀⠀⠀⢈⣿⣿⣉⠀⡇⠀⢰⣿⣿⠆⠀⢸⠀⣉⣿⣿⡁⠀⠀⠀⠀⠀⠀ #######      ##     #######   ## ## ##   ##  ##   #######   ## ## ##  ##    ##  #######     ⠀⠀⠀⢈⣿⣿⣉⠀⡇⠀⢰⣿⣿⠆⠀⢸⠀⣉⣿⣿⡁⠀⠀⠀
⠀⢀⣴⠟⠁⠀⠙⠻⣧⣀⠀⠉⠉⠀⣀⣼⠟⠋⠀⠈⠻⣦⡀⠀⠀⠀⠀ ##    ##     ##     ##        ##  #m##    ####    ##        ##  #m##  ##    ##  ##          ⠀⢀⣴⠟⠁⠀⠙⠻⣧⣀⠀⠉⠉⠀⣀⣼⠟⠋⠀⠈⠻⣦⡀⠀
⢠⡟⠁⠀⠀⠀⠀⠀⡏⠉⣻⣶⣶⣟⠉⢹⠀⠀⠀⠀⠀⠈⢻⡄⠀⠀⠀ ##mmmm##   mm##mm   ##mmmmmm  ##   ###    ####    ##mmmmmm  ##   ###  \"##mm##\"  ##mmmmmm    ⢠⡟⠁⠀⠀⠀⠀⠀⡏⠉⣻⣶⣶⣟⠉⢹⠀⠀⠀⠀⠀⠈⢻⡄
⢸⣀⠀⠀⣀⣀⣤⣴⣿⠛⠉⠀⠀⠉⠛⣿⣦⣤⣀⣀⠀⠀⣀⡇⠀⠀⠀ \"\"\"\"\"\"\"    \"\"\"\"\"\"   \"\"\"\"\"\"\"\"  \"\"   \"\"\"    \"\"\"\"    \"\"\"\"\"\"\"\"  \"\"   \"\"\"    \"\"\"\"    \"\"\"\"\"\"\"\"    ⢸⣀⠀⠀⣀⣀⣤⣴⣿⠛⠉⠀⠀⠉⠛⣿⣦⣤⣀⣀⠀⠀⣀⡇
⠈⠉⠛⠛⠉⠉⠁⠀⢸⡄⠀⠀⠀⠀⢠⡇⠀⠈⠉⠉⠛⠛⠉⠁⠀⠀⠀                                                                                             ⠈⠉⠛⠛⠉⠉⠁⠀⢸⡄⠀⠀⠀⠀⢠⡇⠀⠈⠉⠉⠛⠛⠉⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠈⣷⡀⠀⠀⢀⣾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀                                                                                             ⠀⠀⠀⠀⠀⠀⠀⠀⠈⣷⡀⠀⠀⢀⣾⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢷⣄⣠⡾⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀                                                                                             ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢷⣄⣠⡾⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀                                                                                             ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁""")

def accélérateur_de_particules(particule_a : str, particule_b : str) -> bool:
    sha256 = hashlib.sha256()
    sha256.update(bytes.fromhex(particule_a))
    position_particule_a = sha256.digest()

    sha256 = hashlib.sha256()
    sha256.update(bytes.fromhex(particule_b))
    position_particule_b = sha256.digest()

    return position_particule_a == position_particule_b

if __name__ == "__main__":
    logo()

    print("Bienvenue au CERN ! Veuillez entrer les coordonnées de départ de deux particules et nous tenterons de les faire entrer en collision")
    print("Position de la première particule (format hexadecimal) : ")
    print("> ", end="")
    particule_a = input()

    print("Position de la deuxième particule (format hexadecimal) : ")
    print("> ", end="")
    particule_b = input()

    if particule_a == particule_b:
        print("Une seule particule ne peut pas produire de collisions !")
        exit(1)

    try:
        resultat = accélérateur_de_particules(particule_a, particule_b)
    except ValueError:
        print("Il semblerait qu'il y ait eu une erreur dans vos données...")
        exit(1)

    print("Accélérateur de particules en cours...")

    if resultat:
        print("Bien joué ! Voici le résultat de l'analyse des données :")
        print(os.getenv("FLAG", "404CTF{Fake_Flag}"))
    else:
        print("Malhereusement vos particules ont échoué à se rencontrer...")
```

After a quick observation, we see that the server asks for two hexadecimal inputs that should be different, then calculates the **SHA256** hash for each. If their hashes are equal, you **get the flag !**

At first sight, it looks like we have to find a hash collision on SHA256. Now, there are two things:

1. First, to my knowledge and the internet's knowledge, there is no known hash collision on SHA256 as of today.
2. This is an introductory challenge and the first of this category.

So we're either about to make a breakthrough in cryptanalysis, or there is something fishy here. As you've probably guessed, it's not the first option.

**Solving**

The only function that is applied to our inputs before hashing is `bytes.fromhex()`, and the equality check for the inputs happens **before** this transformation.
So my guess is that there must be a way to pass two different inputs to this function that will result in the same output (bytes).

I'm used to Python, but I don't know any way to do this $\dots$ It's therefore time to read [the documentation](https://docs.python.org/3/library/stdtypes.html#bytes.fromhex).

Now, if we read carefully, we will find:

> This bytes class method returns a bytes object, decoding the given string object. The string must contain two hexadecimal digits per byte, **with ASCII whitespace being ignored**.

What this means is that the two inputs `aaaa` and `aa aa` will output the same thing. And indeed, this is the information we need to solve this first challenge.

```python
particule_a = "aa aa"
particule_b = "aaaa"

assert particule_a != particule_b  # True
assert bytes.fromhex(particule_a) == bytes.fromhex(particule_b)  # True
```

---

Here is the final script to solve this challenge :

```python {linenos=table,filename="solve-dur-à-cerner.py"}
from pwn import *

particule_a = "aa aa"
particule_b = "aaaa"

io = remote("challenge.404ctf.fr", 10007)
io.recvuntil(b"> ")
io.sendline(particule_a.encode())
io.recvuntil(b"> ")
io.sendline(particule_b.encode())
io.recvuntil(b":\n")
print(io.recvline())
```

**`404CTF{P4rt1cl35_g0_brrrrrrrrr!}`**

## Déjeuner à l'ANSSI

| Points | Difficulty | Solves |
| :----: | :--------: | :----: |
| **100**  |  🙂   | **338**     |

**Description**

> Pendant la pause déjeuner, vous vous êtes introduits à l'ANSSI et avez trouvés une machine dont le but est de chiffrer des données privées. Malhereusement pour vous, un filtre empêche les données les plus sensibles d'être leakées. En plus, il faut vous dépêcher avant que les cryptologues reviennent : vous n'avez le temps de faire qu'un seul essai. Saurez vous récupérer le flag ?..
>
> `nc challenge.404ctf.fr 10005`

**Code**

The following source code was provided :

```python {linenos=table,filename="déjeuner-à-lanssi.py"}
from Crypto.PublicKey import RSA
from Crypto.Util.number import long_to_bytes
import os

def encrypt(key, pl):
    return pow(pl, key.e, key.n)

def decrypt(key, ct):
    return pow(ct, key.d, key.n)

if __name__ == "__main__":
    key = RSA.generate(2048)

    flag = os.getenv("FLAG", "404CTF{Fake_Flag}").encode()

    print("[INFO] Bienvenue dans le système interne de récupération des données. Voici les paramètres publiques :")

    print(str({
        "n": key.n,
        "e": key.e,
        "encrypted_flag": encrypt(key, int(flag.hex(), 16))
    }))

    print("[SAISIE] Veuillez entrer un message à déchiffrer :")

    try:
        userinput = int(input("> "))
    except ValueError:
        print("[ERREUR] Entrée invalide. Veuillez entrer un entier.")
        exit(1)

    result = decrypt(key, userinput)

    if flag in long_to_bytes(result):
        print("[ALERTE] Tentative d'accès à des données sensibles détectée.")
    else:
        print("[SUCCÈS] Voici le résulat du calcul :")
        print(str(result))
```

This server implements a simple RSA cryptosystem and, upon connection, gives us the public key $(N, e)$, the encrypted flag $c$, and a decryption oracle $D$.

The challenge here is that because of the following check, we can't directly decrypt the flag $f$ (it would be too simple, not much of a challenge otherwise 🙃):

```python {linenos=table,linenostart=34,hl_lines=[1],filename="déjeuner-à-lanssi.py"}
if flag in long_to_bytes(result):
    print("[ALERTE] Tentative d'accès à des données sensibles détectée.")
else:
    print("[SUCCÈS] Voici le résultat du calcul :")
    print(str(result))
```

**Solving**

To solve this challenge, we're going to use a technique called **masking** that makes use of the **multiplicative homomorphic** property of RSA.

Indeed, for a chosen number $k$, we have:

$$
D(k \cdot c) = D(k) \cdot D(c)
$$

> [!note]
> You can check [my notes on RSA](/docs/cryptography/public-key/rsa/attacks/#decipher-oracle) if you want to know the details of why this is true.

Because of that, we can send to the decryption oracle the number $(k^e \mod N) \cdot c$, which we can calculate, and the server will send us:

$$
\begin{aligned}
D((k^e \mod N) \cdot c) &= D(k^e \mod N) \cdot D(c) \\
&= k \cdot f
\end{aligned}
$$

Now, because we know $k$, we can calculate $k^{-1} \mod N$ and recover the flag by calculating:

$$
\begin{aligned}
&k^{-1} \cdot D((k^e \mod N) \cdot c) &\mod N \\
= \; &k^{-1} \cdot k \cdot f &\mod N \\
= \; &f &\mod N
\end{aligned}
$$

---

Here is the final script to solve this challenge :

```python {linenos=table,filename="solve-déjeuner-à-lanssi.py"}
import ast

from Crypto.Util.number import long_to_bytes

from pwn import *

io = remote("challenge.404ctf.fr", 10005)
io.recvline()
data = ast.literal_eval(io.recvline().decode().strip())

e = data["e"]
N = n = data["n"]
c = data["encrypted_flag"]

io.recvuntil(b"> ")
io.sendline(str((pow(2, e, N) * c) % N).encode())
io.recvline()
d = int(io.recvline().decode().strip())
log.success(long_to_bytes((d * pow(2, -1, N)) % N).decode())

io.close()
```

**`404CTF{Luncht1m3_4tt4ck_b35t_4tt4ck}`**

## Too big or too small

| Points | Difficulty | Solves |
| :----: | :--------: | :----: |
| **100**  |  🙂   | **170**     |

**Description**

> J'ai pas suivi mes cours de maths, la loi des grands nombres cite que plus le nombre est grand plus c'est compliqué à cracker c'est ça ?

**Code**

The following source code was provided :

```python {linenos=table,filename="too-big-or-too-small.py"}
from sympy import nextprime
import random
import json
import sys

sys.set_int_max_str_digits(10000000)

flag = b"404CTF{???????????????????????????????????????}"
k = random.randint(1,2**128)
N = 1

for _ in range(4000):
    k = nextprime(k)
    N *= k

e = 0x10001

ct = pow(int.from_bytes(flag), e, N)

with open("output.txt", "w") as file:
    file.write(json.dumps({"ct": ct, "N": N, "e": e}))
```

```json {base_url="/blog/404ctf-2026-crypto-wu/",filename="too-big-or-too-small-output.txt"}
{"ct": [...], "N": [...], "e": 65537}
```

Again, we're facing an RSA cryptosystem, but this time, the modulus $N$ is the product of 4000 128-bit prime numbers, and is therefore **VERY large**.

**Solving**

To understand how to solve this challenge, I send you to [my notes](/docs/cryptography/public-key/rsa/attacks/#successive-primes) on this exact problem.

The key insight here is that by taking the 4000-th root of $N$, we get a very good approximation of one of the factors of $N$. From there, we can use the function `nextprime()` used in the source file to recover one of the prime factors of $N$. Now that we know one, it is trivial to find all the others.

Once we've found all the factors of $N$, we can calculate $\phi(N)$ as usual. But if you do so, you'll calculate a very large $d$, and the decryption process will take **FOREVER**. So how can we accelerate things ?

The trick here is that if we calculate a new number $N_1$ as the product of a subset of the factors of $N$ such that $f < N_1$ (with $f$ being the flag), then the decryption process works equally well by calculating $\phi(N_1)$ and $d = e^{-1} \mod \phi(N_1)$ according to those subset factors.

The question is now: how many factors should you take? You can just try all possibilities one by one, or, in this case, because the flag format and length are given, you can take as many factors as needed until the bit length of $N_1$ is greater than the bit length of the potential flag.

---

Here is the final script to solve this challenge :

```python {linenos=table,filename="solve-too-big-or-too-small.sage"}
import json
import random
import sys

from sympy import nextprime, prevprime
from Crypto.Util.number import long_to_bytes, bytes_to_long

with open("output.txt", "r") as file:
    data = json.load(file)

N = n = int(data["N"])
ct = int(data["ct"])
e = 65537

r = int(real_nth_root(N, 4000))

# Find the first prime factor of N by repeatdly taking previous primes
# from the calculated approximation
while N % prevprime(r) == 0:
    r = prevprime(r)

assert N % r == 0

# Recover all primes factors of N
factors = [r]
while True:
    r = nextprime(r)
    if N % r == 0:
        factors.append(r)
    else:
        break

# Calculate new N, phi and d
# In this case, onyl the 4 first factors are needed for it to works
phi = 1
new_N = 1
for i in factors[:4]:
    phi *= i - 1
    new_N *= i

# Calculate private exponent
d = pow(e, -1, phi)

# Decrypt ciphertext using calculated values
print(long_to_bytes(pow(ct % new_N, d, new_N)).decode())
```

**`404CTF{uN_c3rvEau_v4ut_M!lL3_c4rTe5_GraPhIqU3S}`**

## 2B or not to be

| Points | Difficulty | Solves |
| :----: | :--------: | :----: |
| **100**  |  🙂   | **222**     |

**Description**

> Inspiré par les travaux de Blaise Pascal sur la statique des fluides, votre mentor a conçu un système cryptographique en quête d'un équilibre parfait. Pour garantir la robustesse de ses clés, il a instauré cinq règles rigoureuses que chaque bit doit satisfaire. Il est convaincu que cette complexité structurelle rend son secret inviolable. Montrez lui que vous n'êtes absolument pas démuni face à sa logique.

**Code**

The following source code was provided :

```python {linenos=table,filename="2b-or-not-to-be.py"}
import os
from pwn import xor

SIZE = 128
FLAG = os.environ.get("flag", "404CTF{fake_flag_for_testing}").encode()
RAW_KEY = os.environ.get("super_key", os.urandom(16).hex())
K = [int(b) for b in format(int(RAW_KEY, 16), f'0{SIZE}b')]


class Verify:
    def __init__(self, bits):
        self.k = bits
        self.n = len(bits)

    def verify_all(self):
        assert all(sum(self.k[i:i + 4]) % 2 == 1 for i in range(0, self.n, 4)), "E1"

        assert all(self.k[2 * i + 2] for i in range(self.n // 4) if not (self.k[i] == self.k[4 * i])), "E2"

        assert all(len(set(self.k[i:i + 3])) > 1 for i in range(self.n - 2)), "E3"

        assert all(sum(self.k[i:i + 8]) == 4 for i in range(self.n - 7)), "E4"

        assert all(self.k[i] ^ self.k[self.n - 1 - i] for i in range(self.n // 2)), "E5"


if __name__ == '__main__':
    try:
        v = Verify(K)
        v.verify_all()

        key_bytes = int(''.join(map(str, K)), 2).to_bytes(SIZE // 8, 'big')
        ciphertext = xor(FLAG, key_bytes)

        print(f"C: {ciphertext.hex()}")
    except AssertionError as e:
        print(f"Validation failed at {e}")
```

```text {filename="ciphertext.txt"}
868286f1e6f4c9e182dff7c683ffd796ed80eddfe7f186ed83c1ed8582fdedffc7f1dacf
```

**Solving**

This one was very easy for me because I was lazy. I knew it was just a XOR, and I didn't want to read nor understand the `verify_all()` function, so the first thing I did was to XOR the known part of the flag (`404CTF{`, given by the flag format of the event) with the given ciphertext to see if I could spot a pattern. And indeed, if you do so, you find repeating `b2` bytes.

```python {linenos=table}
from pwn import xor

c = bytes.fromhex(
    "868286f1e6f4c9e182dff7c683ffd796ed80eddfe7f186ed83c1ed8582fdedffc7f1dacf"
)
print(xor(c, b"404CTF{"))  # b'\xb2\xb2\xb2\xb2\xb2\xb2\xb2'
```

So I just tried to decrypt using a long chain of these same bytes to see if it would successfully decrypt the ciphertext, and I was indeed correct.

> [!tip] Observation
> If you were literally a genius, you could have realized that the **key** was even given in the **name** of the challenge, just reversed.

---

Here is the final script to solve this challenge :

```python {linenos=table,filename="solve-2b-or-not-to-be.py.py"}
from pwn import xor

c = bytes.fromhex("868286f1e6f4c9e182dff7c683ffd796ed80eddfe7f186ed83c1ed8582fdedffc7f1dacf")
print(xor(c, b"\xb2" * 16).decode()
```

**`404CTF{S0mEt1Me$_2_mUC4_1s_70O_MuCh}`**

## Le Tour de RSA en quatre-vingts seize jours

| Points | Difficulty | Solves |
| :----: | :--------: | :----: |
| **100**  |  🙂   | **141**     |

**Description**

> Votre ami Jules Verne vous a envoyé de façon "sécurisée" une partie de son nouveau roman six fois pour être certain que vous le receviez entièrement. Peut-être que la science-fiction n'égale pas la science en sécurité...

**Code**

The following source code was provided :

```python {linenos=table,filename="le-tour-de-rsa-en-quatre-vingts-seize-jours.py"}
from Crypto.Util.number import bytes_to_long, getStrongPrime

text = "......".encode("utf-8")

e = 96

moduli = []
ciphers = []


def to_send(text, e, n, moduli, ciphers):
    text_long = bytes_to_long(text)
    cipher = pow(text_long, e, n)
    moduli.append(n)
    ciphers.append(cipher)


for k in range(3):
    p = getStrongPrime(1024)
    q = getStrongPrime(1024)
    n = p * q
    to_send(text, e, n, moduli, ciphers)

    q = getStrongPrime(1024)
    n = p * q
    to_send(text, e, n, moduli, ciphers)

with open("output.txt", "w") as f:
    f.write("moduli = " + f"{moduli}\n")
    f.write("ciphers = " + f"{ciphers}")
```

```text {base_url="/blog/404ctf-2026-crypto-wu/",filename="tour-rsa-output.txt"}
moduli = [...]
ciphers = [...]
```

Again, RSA, but one thing should strike your attention if you're familiar with it: the value of the parameter $e = 96$, because:

1. It is rather small (compared to the more usual $65537$).
2. And it is even $\dots$ not odd, so it is probably not coprime with $\phi(N)$ (and indeed it isn't, as we'll see), hence we can't calculate $d$ to decrypt the ciphertexts.

**Solving**

One first important observation that we can make is that two consecutive moduli share a common prime factor $p$, so we can recover the two prime factors of both moduli by taking their **gcd**.

Now that we know the factors of $N$, we can calculate $\phi(N)$ as usual, but as stated before, we can't calculate $d$ because $gcd(e, \phi(N)) \neq 1$.

From that knowledge, we compute a new $\phi_1$ by repeatedly dividing $\phi$ by the common factors between $\phi$ and $e$ until we get $\phi_1$ coprime to $e$.

Using this new value $\phi_1$, what we can do is find the $e$-th **roots of unity** and calculate a *"partial"* private exponent $d = e^{-1} \mod \phi_1$.

> [!important] Some math knowledge
> A root of unity in this case is any number $r$ such that $r^e \equiv 1 \mod N$.

Using $d$, we can *"partially"* decrypt $c_1$ by calculating:

$$
f_p = c_1^d \mod N
$$

$f_p$ is probably not the correct plaintext, or the one we're looking for, but using the roots of unity, we can calculate:

$$
f_p \cdot r_i \mod N \quad \forall i \in \mathbb{N}^{*}
$$

until we find the correct plaintext, which we can easily check because we know that it contains the `404CTF{`
string once converted from number to bytes, due to the flag format of the event.

---

Here is the final script to solve this challenge :

```python {linenos=table,filename="solve-le-tour-de-rsa-en-quatre-vingts-seize-jours.py"}
from math import gcd

from Crypto.Util.number import long_to_bytes

moduli = [
    25892739754667065467395795349908306049131626815004690765424490855596713896930090385937658558400755922937071887679354888778764932708889477170408748186807397775440529842217945495773627134361060226042529046422944272432802310939981063049000976598277816195423147959857737422140579864316815959494782048760303606023601366455526778542304004667500806593253836928970092022845210278264914764009964192560749597325460329229886740434229853786475814832078509107650284248986865267502074223403967240743248018371747858497754261551687193086718022291632352483148058428648051834487755406545289176557976398278601123968846227172580617998381,
    23376074755677239684889840624587253938305496006648067291741491841768791312183579969010009839096923217255556677645237116421359987718771218652790629870047194776224984575862009060014427684429641138423418186093412035662330471733732132770558702393471707372714264328527101389818542030744072687365302723671422508872230678586231641051631131151247897145266339406981110686486343159253619149087892127775188289343456932431439184403180836277202930030730222589603013896939575753072568219063398103502215858582213109620398650509220342294859440579834446873876333695727785652116682133620617200529624556669274465890790124198145414608347,
    23316019092190902714006031988992251977432009945856235736325922254331214451685268282723287315013629617369861685290585069714946482805933866937621269287313815354234136621065456184716987033187828898791257800487524658956890543941869877673462480313355539789908953750448048567680246436441225752820973639456060361883509805898742364107413413901071099321470914325595282137982515041042523142651221423479840775612421789518291336959001731482261427070249616067314975656721857044617476796742981307966475825624266220320590207805531463474935400328596855272596643934093676744344283289249018144100645002483049234971459198743337939727601,
    19456678466996259650677528904007586360736958010186414703625771488438960910885896795664400470321480292792767441474922695891058203969169489988736644215633840263871357217436278633436287183461325416762164252349378520419270595033337178871460489604245489967026908647356629332043313207817226714299665455028333870428120699433342579304976475355855447684256550311678364851954885877875588353214307932906023478827977876442086334147435417481543126646500944960874201448281990111884222197722201449939859301404816544842700419873675077114380013637616989609401698643691983461415280651178392393638034705522839966353532054200143159203583,
    26764215927969684145531476166023737609754790360849602070080149884099433321555936839989910641159363575573130522341315373859577870996139204771717412046302870373992196679703994531671058226844039009205093143507497455997800648711569739386638981981216674336305619060610970181215242881215356891198518627803661054038448890502496525180049539361816471249410087900652965225455965065778718305877324947762919049519574516676762571580539299478966048333140310808143749615540869496434427967743555215315931711828395168967244077695911759705932241941717242523878139324364379284223793737404132083434843707810724570671892340608665350346121,
    28505726967775146869327137390191214375588075531520022319849037311033726969793937298084406382512290788667560301880895365573500465066534225763329728670596970886716933558308765083420117505640204238958939357232225939628110547872204608621503550661426337926315743365502511004604764662824724662111136300080436518795202085054554653662862170615699194360046140498124152727134725770558238148130919848235457761652430944311536940189560447147404814058492555647041539124432123176647054784366630460044225022040748620410271655729253717447289020724771929960891316208833982745356210038560333811280884709065993394101774977624213840593281,
]
ciphers = [
    8291449451277675772473092524318700546193421404668585105681974145142348970339281772457901027155668830916500205457295573968041803578930890513722755178666335887317065387985432789200314027858630701069869857529377653067991203611257826093795728926439358156016530720764190119160875962165773054683663026286754061186649884592212121131597577931209249415825770344395229642696224373082792157204280730205323332003411360420892354884826295694626072585411906919966689019227509446215477010603805567139295916386044219646363190450726657564093728544697229665361931787697061956492313166647985167794239989615348404396350540667164770944596,
    18745406202469826940786850586819647473604000482312496334543139440329404978394465199016103359216112142604907172432213907796371261158904795612780601989877418142952898544631573811576139993360898028044634153588694865850031480562018068962371004538685053820848320207296299832560459858763062344574740054554437975186047904129145906062473873742787604801197280721564189114343367111960800644427465606609787010054836923172062133573120343543359217400343197768647667757989168700670054909010812254090898449127711246322101328042428154939872616073116826640739532091143924797009213835382464741849252242103953619332681541389638672431661,
    18460243780142126792516364608345468880003017598374408865679257894044987497801188184082831558235462256666574921681213858140085841970389828288871696037595746789488308582417082938603476627204587910661946869714407626835276092857545745562899805144726278224160471422668547547466972704682608592816912879202349321947191481760523356583963749790745164682313563397912204084139348473155265735990238485607033070015667959961332993004589857276996939132459793192722666791391308633159622368212434872689545932914765207721125231035778053025866423632116983335645091332023984717863209599256267569634199801267992509156601448548907849754917,
    15579393520262484333346505031102179460129260045335532509488388665134609859173934616109838609054252095588719914706865648420541105975015538920051452800393437743741273132246825594098430876597218745808267846999107191676713460631388852209229519132821305131583243359628045857135182159833664773192308167737209459580203011533067582876268514134932515659264738403086509576982654280388509233288686217646689620750110521778583389805402110273326276699500130318511286972292582896073800232370280387523221744613359440355284396984350136806860139171533362314766371909185976309086509097743169347383525990192752964892737389890135681031755,
    7723947669055813549547327912429787719924622038233265793606884967290722100251112229914723792235125631282714828210126830648429285879481286759276554320841363832572665056813724303093257087071949316756017862288114404490793018093923112227124552745141670217341188875881678032265902549273577073057673214396235559388919122535177820311505589318677441022947862555630335086830071024688789845957856155823916748430697223000027147704401845946964143889212563895844088939787975131123111782586897940684861574804267473456272412335519647857528270657029358925345302870578643183541400683489887723801216002886197950984002505032070361311692,
    8947936055642633102775778723051790802692916258104874482357519341063477951894458135693748270713107949857117114868847737624295425821328358297359296980391297023680582953354257665132750346719293631869923620405938450827415874481539132657396289298758868527656636753023412539342839277793814563083657152288535114847658750915793203518553472800894404592994934070608758636510875355071871674275362552476685662771892909192951530401236495957582815778540843510977258299091315111984213302312804965021965721448778810276299450406295501791395049994398189380743822496359469841745675623544124299816457577783629070602116530429511287168508,
]


def roots_of_unity(e, phi, n, rounds=250):
    # Divide common factors of `phi` and `e` until they're coprime.
    phi_coprime = phi
    while gcd(phi_coprime, e) != 1:
        phi_coprime //= gcd(phi_coprime, e)

    # Don't know how many roots of unity there are, so just try and collect a bunch
    roots = set(pow(i, phi_coprime, n) for i in range(1, rounds))

    assert all(pow(root, e, n) == 1 for root in roots)
    return roots, phi_coprime


e = 96
c1 = ciphers[0]
c2 = ciphers[1]

for i in range(0, len(moduli) - 1, 2):
    n1 = moduli[i]
    n2 = moduli[i + 1]
    p = gcd(n1, n2)
    q1 = n1 // p
    phi1 = (p - 1) * (q1 - 1)

    ct = c1
    roots, phi_coprime = roots_of_unity(e, phi1, n1)

    d = pow(e, -1, phi_coprime)
    pt = pow(ct, d, n1)
    assert pow(pt, e, n1) == ct

    # Use the roots of unity to get all other possible plaintexts
    pts = [(pt * root) % n1 for root in roots]
    for x in [long_to_bytes(pt) for pt in pts]:
        if b"404CTF{" in x:
            print(x.decode())
            exit()
```

**`404CTF{96_jours_cest_vraiment_trop_long_et_surtout_pas_premier}`**

## What the hellman

| Points | Difficulty | Solves |
| :----: | :--------: | :----: |
| **100**  |  🙂   | **120**     |

**Description**

> Descartes et Fermat se sont fait reverse regressioned dans le présent mais ne maîtrisent pas encore toutes les technologies modernes. Montrez leur que ce n'était pas une bonne idée d'utiliser des mots de passes pour le protocole Diffie-Hellman. P.S : Les mots de passes ont été générés avec os.urandom.

**Code**

The following source code was provided :

```python {linenos=table,filename="what-the-hellman.py"}
from Crypto.Util.number import *
import hashlib
import os
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import json

FLAG = os.getenv("FLAG", "404CTF{fakeflag}").encode()

def encrypt_flag(shared_secret: int):
    # Derive AES key from shared secret
    sha1 = hashlib.sha1()
    sha1.update(str(shared_secret).encode('ascii'))
    key = sha1.digest()[:16]
    # Encrypt flag
    iv = os.urandom(16)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    ciphertext = cipher.encrypt(pad(FLAG, 16))
    # Prepare data to send
    data = {}
    data['iv'] = iv.hex()
    data['encrypted_flag'] = ciphertext.hex()
    return data

file = open("output.txt", "w")

p = 13612606613985599256675278930068094538579224531235420791577034083547284094867111104869648580521710726604431822112579082474246451334033675308157542753240096037402065211066447540112253463
g = 2


# Descartes choisit sa clé privée et calcule sa clé publique
mdp_descartes = b"???????????????????"
d = bytes_to_long(hashlib.sha256(mdp_descartes).digest())
D = pow(g, d, p)

file.write("Descartes envoie les paramètres ainsi que sa clé publique : " + json.dumps({"p": hex(p), "g": hex(g), "D": hex(D)}) + "\n")

# Fermat choisit sa clé privée et calcule sa clé publique
mdp_fermat = b"????????????????????????"
f = bytes_to_long(hashlib.sha1(mdp_fermat).digest())
F = pow(g, f, p)

file.write("Fermat envoie sa clé publique : " + json.dumps({"F": hex(F)}) + "\n")


# Chacun calcul le secret caché de son côté
shared_secret_Descartes = pow(F, d, p)
shared_secret_Fermat = pow(D, f, p)

assert shared_secret_Descartes == shared_secret_Fermat

shared_secret = shared_secret_Descartes

file.write(json.dumps(encrypt_flag(shared_secret)) + "\n")
```

```text {filename="output.txt"}
Descartes envoie les paramètres ainsi que sa clé publique : {"p": "0xcd08773b828bb3e7c6d497cdb10190b2b1160bee5a49e50cf8762bb974ca15c9b36748f8adc4ec2a2015c1d3cd29d6ef0a6877f3b47a1a8c2cd7a6eb34f912087720e1170a367033c60a2e217", "g": "0x2", "D": "0x901e8aaa158492419c319d541f49f3f43db529681b201423ff46b1a90e38108ae95b5acaac8946fd816f06feabec4a0bca035812d765e60960290dc782f01209272589ab4f7ef8ddad77eba3a"}
Fermat envoie sa clé publique : {"F": "0x9209b8bf4ab54fa06f3ac4bbf5e17541415250e142b8572d2dafe6bd5e18c1e1849cbf2c9d7d902fd6943c878cbc3a2f34fc501e28fc86763db288af8999d8ec39fb967e98089f2b62644933d"}
{"iv": "0cbdc451ad48c5529d4adab554a1e1e0", "encrypted_flag": "77a7543d73bd3b2c622e7f5346242caa4892e629ea0dc2cb84cf8481786d58de"}
```

This time we're facing a **[Diffie–Hellman Key Exchange](/docs/cryptography/public-key/dhke/)** used to generate a shared secret that serves as the key to encrypt the flag. The goal is therefore to find a way to solve the **[Discrete Logarithm Problem](/docs/cryptography/math/dlp/)** to recover the shared secret and then decrypt the flag.

**Solving**

The important observation we have to make here is about how the secret coefficients $f$ and $d$ are generated, using a hash function, and a different one for both. $d$ is generated by converting to a number the output of a SHA256 hash, whereas $f$ uses SHA1.

The main difference that we find between those two hash functions is their output length, which is 256 bits for SHA256, while it is only 160 bits for SHA1.

Now, from the challenge, we know that the prime used is a 256-bit number, so it means that our secret exponent $f$ is many orders of magnitude smaller than the order of the group we're operating in. This is the flaw we're going to exploit.

The name of the challenge and some research on the internet should point you towards the **[Pohlig–Hellman algorithm](https://en.wikipedia.org/wiki/Pohlig%E2%80%93Hellman_algorithm)**, which is powerful for solving the DLP when $p-1$ is a smooth number.

More precisely in this challenge, we'll use a variant of this algorithm. Because $f$ is "small", we can solve the DLP in a subgroup, as long as $p - 1$ has enough "small" factors.

Using this very great [Integer factorization calculator](https://www.alpertron.com.ar/ECM.HTM), you can quickly get all "small" factors of $p-1$, and if we take their product, we get a 229-bit number $n$:

$$
n = \prod_{p_i \in P} p_i
$$

```python
factors = [2, 11, 13, 43, 109, 409, 499, 541, 907, 2579, 2887, 3607, 3847, 4373, 5737, 23819, 27551, 34361, 356561, 457673, 555767]
x = 1
for e in factors:
    x *= e

print(x.bit_length())  # 229
```

which is a large enough subgroup to solve our DLP for $f$ because, as we've said earlier, $f$ is only of the order of 160 bits.

**One last problem ?**

The thing is that, from what I've tested and depending on your implementation of this algorithm, if we take this value of $n$, we won't get the correct value of $f$ because the size of th subgroup is too much bigger than the value of $f$.

The trick is therefore to take a subset of these factors such that their product is as close as possible to the maximum order of $f$ while still being bigger. One good approach, and the one I took, is to progressively discard the smaller factors until you get there.

> [!note]
> In this case, I've found that discarding only the two first factors was enough for this implementation.
>
> But to respect and get as close as possible to the order of $f$, you should discard the first 10 factors.

---

Here is the final script to solve this challenge :

```python {linenos=table,filename="solve-what-the-hellman.py"}
import hashlib

from Crypto.Cipher import AES
from Crypto.Util.number import GCD, inverse
from Crypto.Util.Padding import unpad

flag = {
    "iv": "0cbdc451ad48c5529d4adab554a1e1e0",
    "encrypted_flag": "77a7543d73bd3b2c622e7f5346242caa4892e629ea0dc2cb84cf8481786d58de",
}
pk_H = {
    "F": "0x9209b8bf4ab54fa06f3ac4bbf5e17541415250e142b8572d2dafe6bd5e18c1e1849cbf2c9d7d902fd6943c878cbc3a2f34fc501e28fc86763db288af8999d8ec39fb967e98089f2b62644933d"
}
params = {
    "p": "0xcd08773b828bb3e7c6d497cdb10190b2b1160bee5a49e50cf8762bb974ca15c9b36748f8adc4ec2a2015c1d3cd29d6ef0a6877f3b47a1a8c2cd7a6eb34f912087720e1170a367033c60a2e217",
    "g": "0x2",
    "D": "0x901e8aaa158492419c319d541f49f3f43db529681b201423ff46b1a90e38108ae95b5acaac8946fd816f06feabec4a0bca035812d765e60960290dc782f01209272589ab4f7ef8ddad77eba3a",
}


def decrypt_flag(shared_secret: int, lol, iv):
    # Derive AES key from shared secret
    sha1 = hashlib.sha1()
    sha1.update(str(shared_secret).encode("ascii"))
    key = sha1.digest()[:16]
    # Encrypt flag
    cipher = AES.new(key, AES.MODE_CBC, iv)
    plaintext = unpad(cipher.decrypt(lol), 16)
    # Prepare data to send
    return plaintext


iv = bytes.fromhex(flag["iv"])
encrypted_flag = bytes.fromhex(flag["encrypted_flag"])

F = int(pk_H["F"], 16)
p = int(params["p"], 16)
g = int(params["g"], 16)
D = int(params["D"], 16)


factors = [
    2,
    11,
    13,
    43,
    109,
    409,
    499,
    541,
    907,
    2579,
    2887,
    3607,
    3847,
    4373,
    5737,
    23819,
    27551,
    34361,
    356561,
    457673,
    555767,
]


def crt(list_a, list_m):
    try:
        assert len(list_a) == len(list_m)
    except:
        print("[+] Length of list_a should be equal to length of list_m")
        return -1
    for i in range(len(list_m)):
        for j in range(len(list_m)):
            if GCD(list_m[i], list_m[j]) != 1 and i != j:
                print("[+] Moduli should be pairwise co-prime")
                return -1
    M = 1
    for i in list_m:
        M *= i
    list_b = [M // i for i in list_m]
    assert len(list_b) == len(list_m)
    try:
        assert [GCD(list_b[i], list_m[i]) == 1 for i in range(len(list_m))]
        list_b_inv = [int(inverse(list_b[i], list_m[i])) for i in range(len(list_m))]
    except:
        print(
            "[+] Encountered an unusual error while calculating inverse using gmpy2.invert()"
        )
        return -1
    x = 0
    for i in range(len(list_m)):
        x += list_a[i] * list_b[i] * list_b_inv[i]
    return x % M


def brute_dlp(g, y, p):
    sol = pow(g, 2, p)
    if y == 1:
        return 0
    if y == g:
        return 1
    if sol == y:
        return 2
    i = 3
    while i <= p - 1:
        sol = sol * g % p
        if sol == y:
            return i
        i += 1
    return None


def pohlig_hellman_pp(g, y, p, q, e):
    try:
        # Assume q is a factor of p-1
        assert (p - 1) % q == 0
    except:
        print("[-] Error! q**e not a factor of p-1")
        return -1

    # a = a_0*(q**0) + a_1*(q**1) + a_2*(q**2) + ... + a_(e-1)*(q**(e-1)) + s*(q**e)
    # where a_0, a_1, a_2, ..., a_(e-1) belong to {0,1,...,q-1} and s is some integer
    a = 0

    b_j = y
    alpha = pow(g, (p - 1) // q, p)
    for j in range(e):
        y_i = pow(b_j, (p - 1) // (q ** (j + 1)), p)
        a_j = brute_dlp(alpha, y_i, p)
        assert a_j >= 0 and a_j <= q - 1
        a += a_j * (q**j)

        multiplier = pow(g, a_j * (q**j), p)
        assert GCD(multiplier, p) == 1
        b_j = (b_j * inverse(multiplier, p)) % p
    return a


def pohlig_hellman(g, y, p, list_q):
    x_list = [pohlig_hellman_pp(g, y, p, list_q[i], 1) for i in range(len(list_q))]
    mod_list = [list_q[i] for i in range(len(list_q))]
    return crt(x_list, mod_list)


f = pohlig_hellman(g, F, p, factors[5:])

S = pow(D, f, p)
print(decrypt_flag(S, encrypted_flag, iv).decode())
```

**`404{sM0otH_w4y_oF_s0lV!ng}`**

## Pas très discret

| Points | Difficulty | Solves |
| :----: | :--------: | :----: |
| **162**  |  😑   | **80**     |

**Description**

> Pour sécuriser les communications stratégiques des chercheurs de l'institut, un développeur un peu trop confiant a mis au point VaultChat, une application de messagerie à première vue solide mais qui cache plus d'un flop. À vous d'enchaîner de petites pirouhettes pour lui montrer l'étendu de son erreur.
>
> `nc challenge.404ctf.fr 10006`

**Code**

The following source code was provided :

```python {linenos=table,filename="pas-tres-discret.py"}
import random
import os
from Crypto.Util.number import getStrongPrime

class WRandom:
    def __init__(self):
        self.random_string = ""
        self._add_random_bits(1000)

    def _add_random_bits(self, n):
        for i in range(0, n, 32):
            self.random_string += f"{random.getrandbits(32):032b}"

    def getrandbits(self, n):
        if n > len(self.random_string):
            self._add_random_bits(n)
        p = self.random_string[:n]
        self.random_string = self.random_string[n:]
        return int(p, 2)

FLAG = os.getenv("FLAG", "404CTF{FakeFlag}")

p = getStrongPrime(2048)
def challenge():
    rng = WRandom()
    m = rng.getrandbits(2048)

    print("Essaye de trouver mon nombre secret très secret que j'ai caché avec la magie des mathématiques. Voici les p et m utilisés dans ce script : ")
    print(p)
    print(m)

    while True:
        print("Combien de bits ?")
        try:
            option = int(input("> "))
        except:
            print("Un nombre pliz")
            exit(1)

        if option < 8:
            print("Pas assez grand")
            exit(1)
        if option >= 2048:
            print("Calme toi mon gourmand ça fait trop de bits")
            exit(1)

        exp = rng.getrandbits(option) % p
        print(pow(m, exp, p))

        try:
            guess = int(input("> "))
        except:
            print("une erreur est survenue")
            exit(1)

        if guess == exp:
            print("Bonne réponse !")
            if option == 2047:
                print("Vous l'avez mérité : " + FLAG)
                exit(0)
        else:
            print("Mauvaise réponse")

if __name__ == "__main__":
    challenge()
```

This challenge implements a custom random number generator that uses Python's standard PRNG under the hood.

The goal is to make use of the infinite loop and the given outputs to aggregate information until you have enough
to be able to predict the next $2047$-bits output of this custom generator, which will then give you the flag if correct.

At the beginning of the program, we're given the prime $p$ and the base $m$.

**Solving**

I know from [my notes](/docs/cryptography/rng/mersenne-twister/) on the subject (and previous experiences) that it is possible to predict the output of the
Python standard PRNG given 624 consecutive [32-bit outputs](/docs/cryptography/rng/mersenne-twister/#known-32-bit-outputs), which is what the custom
class do by calling `getrandbits(32)`.

```python {linenos=table,linenostart=10,hl_lines=[3],filename="pas-tres-discret.py"}
def _add_random_bits(self, n):
    for i in range(0, n, 32):
        self.random_string += f"{random.getrandbits(32):032b}"
```

The server lets us generate as many outputs as we want with a size we choose between 8 and 2047 bits.
The tricky part is that the values are not directly given to us but are "masked" as a [discrete logarithm problem](http://localhost:1313/docs/cryptography/math/dlp/), with $p$ a **strong** prime.

```python {linenos=table,linenostart=47,hl_lines=[1],filename="pas-tres-discret.py"}
exp = rng.getrandbits(option) % p
print(pow(m, exp, p))
```

It means that if we query the server for 32-bit outputs, we can't solve the DLP and hence can't access the hidden underlying generated random value.

The solution is simply to break down those words of 32 bits we need into 4 chunks of 8 bits. So we ask the server to generate 8-bit random values, and it sends us:

$$
m^e \mod p
$$

Now, because $e$ is only 8 bits, we only have 256 numbers to test to find the correct one. Doing this 4 consecutive times gives us one complete 32-bit word.

The strategy to solve this challenge is:

- Repeat the above 624 times, by querying the server $624 \times 4 = 2496$ times.
- Use the 624 32-bit outputs to recover the initial state of Python's standard PRNG with known attacks.
- Simulate locally from this original state all the interactions you just had with the server to put your random generator in the same state as the server now.
- Ask the server to generate a 2047-bit value, generate it on your side, send it, and **get the flag !**

> [!tip] Improvement
> Because $m$ is created using the first $2048$ output bits of the custom random generator, we can actually reduce our number of needed requests because $m$ already gives us $\frac{2048}{32} = 64$ of the 624 needed words.

---

> [!note] Optimization
> Because having that many exchanges with the server can take quite some time, I first send all the requests and data before I receive all the server's responses at the same time.
>
> I then parse all of it to extract what is needed before moving on to the last step.

```python {base_url="https://github.com/StackeredSAS/python-random-playground/blob/main/",filename="functions.py"}
# Utilities and functions to recover initial states of PRNG
# Taken from: https://github.com/StackeredSAS/python-random-playground/blob/main/functions.py
```

```python {linenos=table,filename="solve-pas-tres-discret.py"}
import random

# See file above
from functions import *

from pwn import *


class WRandom:
    def __init__(self):
        self.random_string = ""
        self._add_random_bits(1000)

    def _add_random_bits(self, n):
        for i in range(0, n, 32):
            self.random_string += f"{random.getrandbits(32):032b}"

    def getrandbits(self, n):
        if n > len(self.random_string):
            self._add_random_bits(n)
        p = self.random_string[:n]
        self.random_string = self.random_string[n:]
        return int(p, 2)


# Receive parameters
io = remote("challenge.404ctf.fr", 10010)
io.recvuntil(b"script : \n")
p = int(io.recvline().decode().strip())
m = int(io.recvline().decode().strip())

#################################################
# Extract 32-bits words from the value of m
#################################################
m_bits = f"{m:02048b}"
nums = []
for i in range(0, len(m_bits), 32):
    nums.append(int(m_bits[i : i + 32], 2))

#################################################
# Send all queries to generate our values
#################################################
option = 8

for j in range(624 - len(nums)):
    for _ in range(32 // option):
        io.sendline(str(option).encode())
        io.sendline(b"0")

#################################################
# Receive all data, parse it, recover the
# generated values and reconstruct all 32-bits words
#################################################
data = io.clean(0.5).split(b"?\n> ")
data = [e.split(b"\n> ")[0] for e in data]
data = [int(e) for e in data[1:-1]]

assert len(data) == (624 - 64) * (32 // option)

for j in range(624 - len(nums)):
    bit_num = ""
    for i in range(32 // option):
        res = data[j * (32 // option) + i]
        for k in range(2**option + 1):
            if pow(m, k, p) == res:
                # assert i == exp
                bit_num += f"{k:08b}"
                break

    nums.append(int(bit_num, 2))

io.sendline(b"2047")
TARGET_RES = int(io.recvline().decode().strip())

#################################################
# Recover initial seed of the server's PRNG
#################################################
S = [untemper(e) for e in nums]
seed = seedArrayToInt(seedArrayFromState(rewindState(S)))

#################################################
# Simulate interactions locally
#################################################
random.seed(seed)
rng = WRandom()
M = rng.getrandbits(2048)
assert M == m

for j in range(624 - 64):
    for _ in range(32 // option):
        _ = rng.getrandbits(option) % p

#################################################
# Predict and get the flag
#################################################
guess = rng.getrandbits(2047)
if TARGET_RES == pow(m, guess, p):
    io.recvuntil(b"> ")
    io.sendline(str(guess).encode())
    io.recvline()
    log.success(io.recvline().decode())

io.close()
```

**`404CTF{L0g4r1thm3_d15cr3t_Scr3t}`**

## CHAesT

| Points | Difficulty | Solves |
| :----: | :--------: | :----: |
| **205**  |  😑   | **74**     |

**Description**

> Pour sécuriser les communications stratégiques des chercheurs de l'institut, un développeur un peu trop confiant a mis au point VaultChat, une application de messagerie à première vue solide mais qui cache plus d'un flop. À vous d'enchaîner de petites pirouhettes pour lui montrer l'étendu de son erreur.
>
> `nc challenge.404ctf.fr 10006`

**Code**

The following source code was provided :

```python {linenos=table,filename="chaest.py"}
import os, json, hmac, hashlib
from sympy import nextprime
from Crypto.PublicKey import RSA
from Crypto.Cipher import AES, PKCS1_OAEP
from Crypto.Util.number import inverse

FLAG = os.getenv('FLAG') or '404CTF{Fake_flag_for_testing_purposes}'
FIRST_100_PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
                    73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
                    157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
                    239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
                    331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419,
                    421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
                    509, 521, 523, 541]


def _primorial():
    p = 1
    for x in FIRST_100_PRIMES: p *= x
    return p


M = _primorial()


def aes_gcm_encrypt(key: bytes, iv: bytes, plaintext: bytes, aad: bytes = b'') -> tuple:
    cipher = AES.new(key, AES.MODE_GCM, nonce=iv)
    cipher.update(aad)
    ciphertext, tag = cipher.encrypt_and_digest(plaintext)
    return ciphertext, tag


class User:
    def __init__(self, uid: int, name: str):
        self.id = uid
        self.name = name
        self.rsa_key = None
        self._gen_key()

    def _gen_key(self):
        seed = int.from_bytes(os.urandom(64), 'big') | (1 << 511) | 1
        p = int(nextprime(seed))
        q = int(nextprime(p + M))
        n = p * q
        e = 65537
        d = inverse(e, (p - 1) * (q - 1))
        self.rsa_key = RSA.construct((n, e, d, p, q))

    def pub(self) -> tuple[int, int]:
        return self.rsa_key.n, self.rsa_key.e

    def wrap(self, aes_key: bytes) -> bytes:
        cipher = PKCS1_OAEP.new(self.rsa_key.publickey())
        return cipher.encrypt(aes_key)

    def unwrap(self, wrapped: bytes) -> bytes:
        cipher = PKCS1_OAEP.new(self.rsa_key)
        return cipher.decrypt(wrapped)


class Chat:
    def __init__(self, u1: User, u2: User):
        self.u1 = u1
        self.u2 = u2
        self.messages = []

        self._key = os.urandom(32)
        self._wk1 = u1.wrap(self._key)
        self._wk2 = u2.wrap(self._key)
        self._iv = os.urandom(12)
        self._ct = self._tag = None

    def add(self, sender: User, text: str):
        self.messages.append((sender.id, text))

    def seal(self):
        pt = json.dumps([{"from": s, "msg": m} for s, m in self.messages]).encode()
        aad = f"chat:{self.u1.id}:{self.u2.id}".encode()
        self._ct, self._tag = aes_gcm_encrypt(self._key, self._iv, pt, aad)

    def blob(self, uid: int) -> dict[str, dict[str, str] | str]:
        match uid:
            case self.u1.id:
                wk = self._wk1
                n, e = self.u1.pub()
            case self.u2.id:
                wk = self._wk2
                n, e = self.u2.pub()
            case _:
                raise PermissionError("not a participant")
        return {"rsa_public_key": {"n": hex(n), "e": hex(e)},
                "wrapped_aes_key": wk.hex(),
                "encrypted_flag": self._ct.hex(),
                "auth_tag": self._tag.hex(),
                "iv": None,
                "aad": f"chat:{self.u1.id}:{self.u2.id}"}


class Server:
    def __init__(self):
        self._users = {}
        self._chats = {}
        self._uid_counter = self._cid_counter = 0
        self._session_secret = os.urandom(32) and b'server_secret'
        self._init()

    def _init(self):
        print("[server] Generating keys (~10s remaining)...")
        admin = self._create_user("admin")
        flagbot = self._create_user("flag_bot")
        _ = self._create_user("guest_seed")

        print(self._session_secret)

        chat = Chat(admin, flagbot)
        chat.add(admin, "Did you store the secret safely?")
        chat.add(flagbot, "Yes. IV discarded after sealing.")
        chat.add(admin, f"Perfect. Here it is: {FLAG}")
        chat.add(flagbot, "Vault sealed. End-to-end encrypted.")
        chat.seal()

        cid = self._store_chat(chat)
        print(f"[server] cid={cid} sealed\n")

    def _create_user(self, name: str) -> User:
        uid = self._uid_counter
        user = User(uid, name)
        self._users[uid] = user
        self._uid_counter += 1
        print(f"  uid={uid}  '{name}'  RSA-2048 key generated")
        return user

    def _store_chat(self, chat: Chat) -> int:
        cid = self._cid_counter
        self._chats[cid] = chat
        self._cid_counter += 1
        return cid

    def _generate_access_token(self, uid: int, cid: int) -> str:
        data = f"{uid}:{cid}".encode()
        token = hmac.new(self._session_secret, data, hashlib.sha256).hexdigest()
        return f"{uid}:{cid}:{token}"

    def _verify_access_token(self, token: str) -> tuple[int, int] | None:
        try:
            parts = token.split(":")
            if len(parts) != 3:
                return None

            uid, cid, provided_hmac = int(parts[0]), int(parts[1]), parts[2]
            data = f"{uid}:{cid}".encode()
            expected_hmac = hmac.new(self._session_secret, data, hashlib.sha256).hexdigest()

            if provided_hmac == expected_hmac:
                return (uid, cid)
            return None
        except (ValueError, IndexError):
            return None

    def register(self, name: str) -> int:
        u = self._create_user(name)
        return u.id

    def list_users(self) -> list[dict[str, str]]:
        return [{"uid": str(u.id), "name": u.name} for u in self._users.values()]

    def get_chat(self, access_token: str) -> dict[str, dict[str, str] | str]:
        result = self._verify_access_token(access_token)
        if not result:
            return {"error": "invalid access token"}

        uid, cid = result
        chat = self._chats.get(cid)
        if not chat: return {"error": "not found"}
        try:
            return chat.blob(uid)
        except PermissionError as ex:
            return {"error": str(ex)}

    def create_chat(self, uid1: int, uid2: int, initial_message: str = "") -> tuple[int, str]:
        u1 = self._users.get(uid1)
        u2 = self._users.get(uid2)
        if not u1 or not u2:
            raise ValueError("Invalid user ID")

        chat = Chat(u1, u2)
        if initial_message:
            chat.add(u1, initial_message)
        chat.seal()
        cid = self._store_chat(chat)

        token = self._generate_access_token(uid1, cid)
        return cid, token


def interactive_menu(server: Server, my_uid: int):
    max_interactions = 50
    interaction_count = 0

    while interaction_count < max_interactions:
        interaction_count += 1

        print("┌──────────────────────────────┐")
        print("│      VaultChat  —  Menu      │")
        print("└──────────────────────────────┘\n")
        print("  [1] List users")
        print("  [2] View a chat (requires access token)")
        print("  [3] Start a new chat")
        print("  [4] Export encrypted blob to JSON")
        print("  [5] Exit\n")

        try:
            choice = int(input("Choice: ").strip())
        except ValueError as v:
            print(f"[!] Invalid input {v}")
            continue

        match choice:
            case 1:
                print("Registered users:")
                for u in server.list_users():
                    print(f"uid={u['uid']} - name={u['name']}")
            case 2:
                try:
                    token = input("Access token: ").strip()
                    blob = server.get_chat(token)

                    if "error" in blob:
                        print(f"[!] Error: {blob['error']}")
                    else:
                        print("[+] Encrypted blob retrieved:")
                        display = {}
                        for k, v in blob.items():
                            if isinstance(v, str) and len(v) > 60:
                                display[k] = v[:60] + "..."
                            else:
                                display[k] = v
                        print(json.dumps(display, indent=2))
                except (ValueError, Exception) as e:
                    print(f"[!] Error: {e}")
            case 3:
                try:
                    uid2 = int(input(f"\nStart chat with uid (you are uid={my_uid}): ").strip())
                    msg = input("Initial message: ").strip()

                    cid, token = server.create_chat(my_uid, uid2, msg)
                    print(f"[+] Chat created with cid={cid}")
                    print(f"[+] Your access token: {token}")
                    print("[i] Save this token to access the chat later!")
                except (ValueError, Exception) as e:
                    print(f"[!] Error: {e}")
            case 4:
                try:
                    token = input("Access token: ").strip()
                    blob = server.get_chat(token)

                    if "error" in blob:
                        print(f"[!] Error: {blob['error']}")
                    else:
                        print(json.dumps(blob, indent=2))

                except (ValueError, Exception) as e:
                    print(f"[!] Error: {e}")
            case 5:
                print("\n[*] Goodbye!")
                break
            case _:
                print("[!] Invalid choice")


def run():
    srv = Server()

    print("┌──────────────────────────────┐")
    print("│  VaultChat  —  Registering   │")
    print("└──────────────────────────────┘\n")

    name = str(input("Please register yourself (name): ").strip())
    if not name:
        name = "anonymous"

    my_uid = srv.register(name)
    print(f"[+] registered as uid = {my_uid}\n")

    interactive_menu(srv, my_uid)


if __name__ == "__main__":
    run()
```

For this challenge, because there is quite some code and I'm lazy and don't want to go through all of it in writing, I encourage you to take the time to read and understand this code as I will only point out the key points to solve it.

That being said, let's get to it.

**Solving**

First things first, what we're looking for (the **FLAG**) is in a chat session that is pre-made and stored by the server.

```python {linenos=table,linenostart=115,hl_lines=[4],filename="chaest.py"}
chat = Chat(admin, flagbot)
chat.add(admin, "Did you store the secret safely?")
chat.add(flagbot, "Yes. IV discarded after sealing.")
chat.add(admin, f"Perfect. Here it is: {FLAG}")
chat.add(flagbot, "Vault sealed. End-to-end encrypted.")
chat.seal()
```

To access it, we'll need to forge a valid access token for this chat session.

We know that those tokens are cryptographically created using the session key, itself generated like so:

```python {linenos=table,linenostart=104,hl_lines=[2],filename="chaest.py"}
# ...
self._session_secret = os.urandom(32) and b'server_secret'
```

If you test this line of code locally, you'll find that it always evaluates to `server_secret`.

Knowing the secret key, we can now forge the correct token by reading how the server handles its format to give you access to the corresponding stored chat.

Once you get the stored chat session, its content is encrypted using AES-GCM with a random 32-byte key and a random 12-byte IV.

```python {linenos=table,linenostart=76,hl_lines=[4],filename="chaest.py"}
def seal(self):
    pt = json.dumps([{"from": s, "msg": m} for s, m in self.messages]).encode()
    aad = f"chat:{self.u1.id}:{self.u2.id}".encode()
    self._ct, self._tag = aes_gcm_encrypt(self._key, self._iv, pt, aad)
```

The encryption key used is given in the plain data but encrypted with RSA.

```python {linenos=table,linenostart=91,hl_lines=[2],filename="chaest.py"}
return {"rsa_public_key": {"n": hex(n), "e": hex(e)},
                "wrapped_aes_key": wk.hex(),
                "encrypted_flag": self._ct.hex(),
                "auth_tag": self._tag.hex(),
                "iv": None,
                "aad": f"chat:{self.u1.id}:{self.u2.id}"}
```

If we look more closely, the way the primes are generated for this RSA implementation seems weird, so we'll focus our attention on this to try to recover the key.

```python {linenos=table,linenostart=40,filename="chaest.py"}
def _gen_key(self):
        seed = int.from_bytes(os.urandom(64), 'big') | (1 << 511) | 1
        p = int(nextprime(seed))
        q = int(nextprime(p + M))
        n = p * q
        e = 65537
        d = inverse(e, (p - 1) * (q - 1))
        self.rsa_key = RSA.construct((n, e, d, p, q))
```

It first generates a prime $p$ from a seed, then computes $q$ as the next prime after $p + M$ with $M$ being a primorial, that is the product of the first 100 primes.

Because of that, we can express $q$ as $p + M + x$ for a small number $x$, hence we have:

$$
\begin{aligned}
N &= p \cdot q \\
&= p (p + M + x) \\
&= p^2 + pM + px \\
&= p^2 + p(M + x)
\end{aligned}
$$

which we can rewrite as the following equation:

$$
\begin{equation}
p^2 + p(M + x) - N = 0 \tag{1}
\end{equation}
$$

Because $x$ is rather small, we can increment it and solve the equation for $p$ until we get $p \mid N$.
From there, we can easily recover $q$, compute the RSA private key, and decrypt the encrypted encryption key.

Finally, to decrypt the content, we need to know the IV, and this information is not available anymore.
But because we know the beginning of the encrypted content and the key used, we can recover the IV by XORing the AES-GCM encrypted content that we're given with our own AES-**ECB** encrypted content of the known plaintext.

Once we know the IV, we just have to decrypt the **flag !**

---

Here is the final script to solve this challenge :

```python {linenos=table,filename="solve-chaest.py"}
import hashlib
import hmac
import json
import math

from challenge import _primorial
from Crypto.Cipher import AES, PKCS1_OAEP
from Crypto.PublicKey import RSA
from Crypto.Util.number import inverse

from pwn import *


######################################################
# UTILS
######################################################

def xor(x, y):
    return bytes([a ^ b for a, b in zip(x, y)])


def generate_access_token(uid: int, cid: int) -> str:
    data = f"{uid}:{cid}".encode()
    token = hmac.new(b"server_secret", data, hashlib.sha256).hexdigest()
    return f"{uid}:{cid}:{token}"


######################################################
# RECOVER DATA
######################################################

token = generate_access_token(0, 0)
M = _primorial()

io = remote("challenge.404ctf.fr", 10006)
io.recvuntil(b"yourself (name): ")
io.sendline(b"lol")
io.recvuntil(b"[5] Exit\n")
io.sendline(b"4")
io.recvuntil(b"Access token: ")
io.sendline(token.encode())
data = json.loads(io.recvuntil(b"[5] Exit\n").decode().split("\n┌──")[0].strip())

io.close()

######################################################
# RECOVER ENCRYPTION KEY
######################################################

N = int(data["rsa_public_key"]["n"], 16)
e = int(data["rsa_public_key"]["e"], 16)
c = bytes.fromhex(data["wrapped_aes_key"])
encrypted_flag = bytes.fromhex(data["encrypted_flag"])
tag = bytes.fromhex(data["auth_tag"])

diff = 1
while True:
    b = M + diff
    delta = b**2 + 4 * N
    p = (-b + math.isqrt(delta)) // 2
    if 1 < p < N and N % p == 0:
        break

    diff += 1

q = int(N // p)
assert p * q == N

d = int(inverse(e, (p - 1) * (q - 1)))
rsa_key = RSA.construct((N, int(e), int(d), int(p), int(q)))

cipher = PKCS1_OAEP.new(rsa_key)
key = cipher.decrypt(c)

######################################################
# RECOVER NONCE AND DECRYPT PLAINTEXT
######################################################

pt = b""
for i in range(500):
    messages = [
        (0, "Did you store the secret safely?"),
        (1, "Yes. IV discarded after sealing."),
        (0, f"Perfect. Here it is: {'X' * i}"),
        (1, "Vault sealed. End-to-end encrypted."),
    ]
    pt = json.dumps([{"from": int(s), "msg": m} for s, m in messages]).encode()
    if len(pt) == len(encrypted_flag):
        break

first_enc_block = xor(encrypted_flag[:16], pt[:16])
cipher = AES.new(key, AES.MODE_ECB)
nonce = cipher.decrypt(first_enc_block)[:12]

cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
cipher.update(b"chat:0:1")
log.success(cipher.decrypt_and_verify(encrypted_flag, tag).decode())
```

**`404CTF{07aafdab5919b7a013b45466d0d18e87c29fa2e4953d767e55275ebc0c5396aa}`**

## Final Word

In the end, I really liked the crypto challenges that were proposed this year, and I almost cleared the category this time, except for one challenge 😞, the hardest one, which was only solved by a few people.

Great CTF as always, looking forward to next year!
