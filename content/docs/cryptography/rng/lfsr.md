---
title: Linear-Feedback Shift Register
linkTitle: LFSR
tags:
- cybersecurity
- cryptography
- lfsr
- rng
---

A [**linear-feedback shift register**](https://en.wikipedia.org/wiki/Linear-feedback_shift_register) (LFSR) is a shift register whose input bit is a linear function of its previous state. It is sometimes used as a pseudorandom number generator in some cryptographic applications.

## Galois LFSR

A Galois LFSR, also referred to as a binary LFSR, is a specific type of LFSR that operates in $\mathbb{GF}_2$. Here is a simple diagram illustrating how it works.

![Galois LFSR illustration](./lfsr.png)

---

Below is a simple Python implementation of a Galois LFSR. In this type, addition corresponds to the $XOR$ operation.

```python {linenos=table,filename="lfsr.py"}
import random

class LFSR:
    def __init__(self, size, taps):
        self._s = random.choices([0, 1], k=size)
        self._t = taps

    def _clock(self):
        b = self._s[0]
        c = 0
        for t in self._t:
            c ^= self._s[t]
        self._s = self._s[1:] + [c]
        return b

    def stream(self, length):
        return [self._clock() for _ in range(length)]


N = random.randint(10, 500)
NB_TAPS = random.randint(0, N - 2)
SECRET_TAPS = [0] + [random.randint(1, N - 1) for _ in range(NB_TAPS)]
BITSTREAM_SIZE = random.randint(1, N * 10)

lfsr = LFSR(N, SECRET_TAPS)
s0 = list(lfsr._s)
bit_stream = lfsr.stream(BITSTREAM_SIZE)
```

## Attacks

> [!note] Just so you know
> This section only refers to binary LFSRs (i.e [Galois LFSRs](https://en.wikipedia.org/wiki/Linear-feedback_shift_register#Galois_LFSRs))

In this section we'll cover possible attacks to recover the initial state **and** the feedback polynomial of the LFSR, thus allowing to us to predict its outputs.

### Recover the taps

To recover the taps of the LFSR, you can use the [**Berlekamp–Massey algorithm**](https://en.wikipedia.org/wiki/Berlekamp%E2%80%93Massey_algorithm), which will find the shortest LFSR for a given binary output sequence.

---

Using Sage and its implementation of the _Berlekamp–Massey algorithm_

```python {linenos=table,filename="recover_lfsr.py"}
from sage.all import GF
from sage.matrix.berlekamp_massey import berlekamp_massey

# The number of output values must be even
# for the algorithm, else it will throw an error
if len(bit_stream) % 2 != 0:
    P = berlekamp_massey([GF(2)(e) for e in bit_stream[:-1]])
else:
    P = berlekamp_massey([GF(2)(e) for e in bit_stream])

taps = [e for e in P.exponents()[:-1]]

print(taps)
# >>> [0, 86, 233, 314]
```

### Find initial state

Because the LFSR is a linear operation, we can define the state $S_k$ after $k$ operation of an LFSR, as the multuplicaiton of the transformation matrix by the initia state $S_0$

Let's write

$$
S_0 = \left(\begin{array}{cc}
a_0 \\
a_1 \\
a_2 \\
\vdots \\
a_{n-1}
\end{array}\right), \quad
S_k = \left(\begin{array}{cc}
a_k \\
a_{k+1} \\
a_{k+2} \\
\vdots \\
a_{k+n-1}
\end{array}\right)
$$

We then have :

$$
\begin{aligned}
S_k = \left(\begin{array}{cc}
a_k \\
a_{k+1} \\
a_{k+2} \\
\vdots \\
a_{k+n-1}
\end{array}\right) &=
\left(\begin{array}{cc}
c_{n-1} & 1 & 0 & \cdots & 0 \\
c_{n-2} & 0 & 1 & \ddots & \vdots  \\
\vdots & \vdots & \ddots & \ddots & 0 \\
c_1 & 0 & 0 & 0 & 1 \\
c_0 & 0 & 0 & \cdots & 0 \\
\end{array}\right)
\cdot
\left(\begin{array}{cc}
a_{k-1} \\
a_{k} \\
a_{k+1} \\
\vdots \\
a_{k+n-2}
\end{array}\right) \\
\\
&=\left(\begin{array}{cc}
c_{n-1} & 1 & 0 & \cdots & 0 \\
c_{n-2} & 0 & 1 & \ddots & \vdots  \\
\vdots & \vdots & \ddots & \ddots & 0 \\
c_1 & 0 & 0 & 0 & 1 \\
c_0 & 0 & 0 & \cdots & 0 \\
\end{array}\right)^k
\cdot
\left(\begin{array}{cc}
a_0 \\
a_1 \\
a_2 \\
\vdots \\
a_{n-1}
\end{array}\right)
\end{aligned}
$$

with $c_0, \ c_1, \cdots, \ c_{n-1}$ being the coefficients of the **feedback polynomial** that define the LFSR, and thus the **taps**.

> [!note]
> In the binary case, $c_0, c_1, \cdots, c_{n-1} \in \mathbb{F}_2$

We now define the matrix

$$
T = \left(\begin{array}{cc}
c_{n-1} & 1 & 0 & \cdots & 0 \\
c_{n-2} & 0 & 1 & \ddots & \vdots  \\
\vdots & \vdots & \ddots & \ddots & 0 \\
c_1 & 0 & 0 & 0 & 1 \\
c_0 & 0 & 0 & \cdots & 0 \\
\end{array}\right)
$$

and the relation simply becomes

$$
\begin{aligned}
&S_k = T^k \cdot S_0 \\
\Longleftrightarrow \quad &S_0 = T^{-k} \cdot S_k \\
\end{aligned}
$$

---



```python {linenos=table,filename="find_seed_lfsr.py"}
from sage.all import Matrix, vector

########################################
# Build the matrix T
########################################

T = [vector(GF(2), N) for i in range(N)]

for t in taps:
    T[t][N - 1] = 1
for i in range(N - 1):
    T[i + 1][i] = 1

T = Matrix(GF(2), T)

########################################
# Recover the seed (initial state)
# ######################################

Sk = vector(GF(2), bit_stream[-N:])
# We remove N of the power to take into account the shift
# due to the output sequence being a state of the LFSR in the past
S0 = (T ** (BITSTREAM_SIZE - N)).solve_left(Sk)

assert s0 == S0.list()
```

> [!warning] Reverse from output stream
> If, as in the code example, you want to recover the seed from the given **output sequence** (not **state**, as used in the formula), you must account for the size of your sequence, which is the size of your LFSR.

### Correlation attack

Suppose you have access to the bit stream of a PRNG $R$, whose outputs are a combination of the outputs of three separate LFSRs, namely $L_1$, $L_2$, and $L_3$.

Let's say, for example, that the combination looks like

$$
R = \left\{\begin{aligned}
&L_2 \quad \text{if} \ L_1 = 1 \\
&L_3 \quad \text{else} \\
\end{aligned}\right.
$$

If we examine the truth table produced by this relation, we can see that the output of $R$ is correlated with the output of $L_3$. Specifically, when $R = 1$, $L_3 = 1$ in 3 out of 4 cases, or $75 \%$ of cases.

<br>
<center>

| $L_1$ | $L_2$ | $L_3$ | $R$ |
| :---: | :---: | :---: | :-: |
|   0   |   0   |   0   |  0  |
|   1   |   0   |   0   |  0  |
|   0   |   1   |   0   |  0  |
|   1   |   1   |   0   |  1  |
|   0   |   0   |   1   |  1  |
|   1   |   0   |   1   |  0  |
|   0   |   1   |   1   |  1  |
|   1   |   1   |   1   |  1  |

</center>

In the case where the size of the state of this LFSR is only a fraction of a secret and small enough, you can brute-force the seed for this one by looking at the correlation percentage between $R$ and the output of the seed you're trying (given that you already know the taps). To do so, just keep the seed with the highest correlation factor.

Once recovered, you can now attack the two other LFSRs with this new information. In our case, you can start with $L_2$, because from the table above, you can also see that its zeroes are correlated with $R$'s.

---

> [!important]
> For speed reasons, this Python script makes use of the [**numba**](https://github.com/numba/numba) Python library to parallelize the work. There is probably a better or faster way to do this, but I didn't take the time to find one as this was good enough for me.

Here is how you can implement this attack in Python

```python {linenos=table,filename="correlation_attack.py"}
from numba import jit, prange

@jit()
def lfsr_next(state, taps):
    new_bit = 0
    for t in taps:
        new_bit ^= state[t]
    return state[1:] + [new_bit]


@jit(parallel=True)
def corre(out, taps, seed_bit_size, corr_pct):
    """
    Test all possible seeds and calcualte for each 
    the correlation % with he given bit stream
    :param out: Ouput bit stream
    :param taps: LFSR tap positions
    :param seed_bit_size: As its name suggest, the bit size of the state of
                          targeted LFSR
    :param corr_pct: THe correlation % we expect
    """
    for seed in prange(0, 2**seed_bit_size):
        if seed % (2**seed_bit_size // 10) == 0:
            print(seed)
        state = [(seed >> i) & 1 for i in range(27)]
        matches = 0
        s = state[:]
        _t = list(taps)
        for _, bit in enumerate(out):
            if s[0] == bit:
                matches += 1
            s = lfsr_next(s, _t)
        corr = matches / len(out)
        if corr > corr_pct - ((corr_pct - 0.5) // 4):
            print(corr, state)

# bit_stream = [0, 1, ... ]
# taps = [27, 26, 25, 22]

corre(bit_stream, taps, 27)
```

## Resources

- [Correlation attack - Wikipedia](https://en.wikipedia.org/wiki/Correlation_attack)
- [LFSR - CTF Wiki](https://ctf-wiki.org/crypto/streamcipher/fsr/lfsr/)
- [Multivariate Correlation Attacks and the Cryptanalysis of LFSR-based Stream Ciphers](https://eprint.iacr.org/2023/417.pdf)
