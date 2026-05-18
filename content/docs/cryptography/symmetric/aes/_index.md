---
title: Advanced Encryption Standard (AES)
linkTitle: AES
---

## Modes of Operation

![Block Cipher Modes of Operation](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/BlockCipherModesofOperation.svg/1920px-BlockCipherModesofOperation.svg.png "Block Cipher Mode of Operation")

Because block ciphers work on fixed-size blocks, they are combined with **modes of operation** to handle arbitrary-length data. Here are the most common ones with their associated potential flaws.

| Mode Name   | Description                                        | Common Weakness in CTFs                                        |
| :--------: |----------------------------------------------------|----------------------------------------------------------------|
| [**ECB**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Electronic_codebook_(ECB)) | Each block encrypted independently.                | Leaks patterns, identical plaintexts -> identical ciphertexts. |
| [**CBC**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Cipher_block_chaining_(CBC)) | XORs each block with previous ciphertext.          | Padding oracle attacks via IV or padding error oracle, Bit-flip.         |
| [**CTR**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Counter_(CTR))  | Turns block cipher into stream cipher via counter. | Key/nonce reuse causes keystream leakage.                      |
| [**GCM**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Galois/counter_(GCM))  | Authenticated encryption (AEAD).                   | Nonce reuse, Forbidden Attack.                      |
| [**IGE**](https://crypto.stackexchange.com/questions/43841/cbc-mode-infinite-garble-extension) | XORs each block with previous ciphertext AND plaintext                   | Padding oracle.                     |
|  [**CFB**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#CFB-1,_CFB-8,_CFB-64,_CFB-128,_etc.)    | Very similar to **OFB**  | ZeroLogon Vulnerability (CFB-8)|
| [**OFB**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Output_feedback_(OFB))  | XORs each block with repeated encryptions of IV | Symmetry + Encryption / Decryption oracle |

## Attacks

### Linear SBox

- [StackExchange - How to find linear equations of a SBox?](https://crypto.stackexchange.com/questions/113743/how-to-find-linear-equations-of-a-sbox)
- [StackExchange - Consequences of AES without any one of its operations](https://crypto.stackexchange.com/questions/20228/consequences-of-aes-without-any-one-of-its-operations)
- [StackExchange - Linear AES : expression of K in AES(P) = AP+K](https://crypto.stackexchange.com/questions/89596/linear-aes-expression-of-k-in-aesp-apk/89607#89607)

Out of the four main operations of the **AES cipher**, the `SubBytes` operation is the only **non-linear** operation.
If the S-box is poorly constructed and **linear**, the entire cipher becomes **linear** (and more precisely, **affine**).

In such a case, the encrypted message **$c$** can be expressed as:

$$
c = A \cdot p + k
$$

where:
- **$k$** is a vector dependent on the key,
- **$p$** is the plaintext message,
- **$A$** is a constant matrix dependent only on the cipher's operations.

Now, in a white-box scenario, because you know the implementation of the AES cipher, you can calculate the $i$-th column of the matrix $A$ by choosing

$$
\begin{aligned}
p_i &= (0, 0, \dots, \overbrace{1}^{i\text{th}}, \dots, 0, 0) \\
k_i &= (0, 0, \dots, 0)
\end{aligned}
$$

so that you have

$$
c_i = A \cdot p_i = A_i
$$

with $A_i$ the $i$-th column of the matrix $A$.

---

Here is a Sage code to analyze the linearity of an S-box using [Gröbner basis](https://en.wikipedia.org/wiki/Gr%C3%B6bner_basis).

```python {linenos=table,filename="sbox_analysis.py"}
from sage.crypto.sbox import SBox

# Example SBox
s = [
    105,121,73,89,41,57,9,25,233,249,201,217,169,185,137,153,104,120,72,88,40,56,8,24,232,248,200,216,
    168,184,136,152,107,123,75,91,43,59,11,27,235,251,203,219,171,187,139,155,106,122,74,90,42,58,10,
    26,234,250,202,218,170,186,138,154,109,125,77,93,45,61,13,29,237,253,205,221,173,189,141,157,108,
    124,76,92,44,60,12,28,236,252,204,220,172,188,140,156,111,127,79,95,47,63,15,31,239,255,207,223,
    175,191,143,159,110,126,78,94,46,62,14,30,238,254,206,222,174,190,142,158,97,113,65,81,33,49,1,17,
    225,241,193,209,161,177,129,145,96,112,64,80,32,48,0,16,224,240,192,208,160,176,128,144,99,115,67,
    83,35,51,3,19,227,243,195,211,163,179,131,147,98,114,66,82,34,50,2,18,226,242,194,210,162,178,130,
    146,101,117,69,85,37,53,5,21,229,245,197,213,165,181,133,149,100,116,68,84,36,52,4,20,228,244,196,
    212,164,180,132,148,103,119,71,87,39,55,7,23,231,247,199,215,167,183,135,151,102,118,70,86,38,54,6,
    22,230,246,198,214,166,182,134,150
]

# Taken from
# https://gmogoat.fr/posts/splhash/#fun-with-the-anf
def anf(s):
    """
    Compute the Algebraic normal form of an SBox
    https://en.wikipedia.org/wiki/Algebraic_normal_form
    """
    result = []
    for i in range(4):
        result.append(s.component_function(1 << i).algebraic_normal_form())
    return result

# Compute SBox inverse
s_inv = [0] * len(s)
for e in s:
    s_inv[s[e]] = e

s = SBox(s)
s_inv = SBox(s_inv)

print(s.has_linear_structure())
print(s.polynomials(groebner=True))

print(s_inv.has_linear_structure())
print(s_inv.polynomials(groebner=True))

print(anf(s))
print(anf(s_inv))
```

### Fault attack

- [GitHub - Differential fault analysis framework for AES128](https://github.com/Daeinar/dfa-aes)
- [Differential Fault Analysis of the Advanced Encryption Standard using a Single Fault](https://eprint.iacr.org/2009/575.pdf)
- [A Differential Fault Attack Technique against SPN Structures, with Application to the AES and KHAZAD](https://link.springer.com/content/pdf/10.1007/978-3-540-45238-6_7.pdf)
- [Differential Fault Analysis on White-box AES Implementations](https://blog.quarkslab.com/differential-fault-analysis-on-white-box-aes-implementations.html)

> [!important] TODO

### CPA

- [Correlation Power Analysis with a Leakage Model](https://link.springer.com/content/pdf/10.1007/978-3-540-28632-5_2.pdf)

## Resources

- [GitHub - crypto-attacks](https://github.com/jvdsn/crypto-attacks)
- [Advanced Encryption Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)
- [SageMath Docs - Rijndael-GF](https://doc.sagemath.org/html/en/reference/cryptography/sage/crypto/mq/rijndael_gf.html)
- [SageMath Docs - Ideals in multivariate polynomial rings](https://doc.sagemath.org/html/en/reference/polynomial_rings/sage/rings/polynomial/multi_polynomial_ideal.html)
