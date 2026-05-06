---
title: Cipher block chaining (CBC)
linkTitle: CBC Mode
tags:
- cybersecurity
- cryptography
- symmetric
- aes
- mode
- cbc
---

[AES Cipher Block Chaining](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Cipher_block_chaining_(CBC)) is the most commonly used mode of operation. It uses the previous output to XOR the next input.

![CBC Mode - Encryption](./assets/CBC_encryption.svg)
![CBC Mode - Decryption](./assets/CBC_decryption.svg)

## IV / Nonce Recovery

If you send to the oracle a ciphertext of two blocks $C_1$ and $C_2$ to decrypt, such that $C_1 = C_2 = 0$, then by construction you have

$$
\begin{aligned}
P_1 &= IV \oplus D_K(C_1) \\
P_2 &= C_1 \oplus D_K(C_2)
\end{aligned}
$$

which reduces to

$$
\begin{aligned}
P_1 &= IV \oplus D_K(0) \\
P_2 &= D_K(0)
\end{aligned}
$$

You now recover $IV$ by calculating

$$
\begin{aligned}
P_1 \oplus P_2 &= (IV \oplus D_K(0)) \oplus D_K(0) \\
&= IV \oplus D_K(0) \oplus D_K(0) \\
&= IV \\
\end{aligned}
$$

```python {linenos=start,filename="cbc_iv_recovery.py"}
# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/cbc/iv_recovery.py
from Crypto.Util.strxor import strxor


def attack(decrypt_oracle):
    """
    Recovers the initialization vector using a chosen-ciphertext attack.
    :param decrypt_oracle: the decryption oracle to decrypt ciphertexts
    :return: the initialization vector
    """
    p = decrypt_oracle(bytes(32))
    return strxor(p[:16], p[16:])
```

## Attacks

### Padding oracle

If you have the ciphertext $c$ of a message $m$ you want to decrypt and an access to a decryption oracle using **AES-CBC**, that allows you to detect a change in behaviour depending and the correctness of the padding of the enyrpted message, then you can recover $m$ using this oracle.

```python {linenos=table,filename="cbc_padding_oracle.py"}
# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/cbc/padding_oracle.py
import logging

from Crypto.Util.strxor import strxor


def _attack_block(padding_oracle, iv, c):
    logging.info(f"Attacking block {c.hex()}...")
    r = bytes()
    for i in reversed(range(16)):
        s = bytes([16 - i] * (16 - i))
        for b in range(256):
            iv_ = bytes(i) + strxor(s, bytes([b]) + r)
            if padding_oracle(iv_, c):
                r = bytes([b]) + r
                break
        else:
            raise ValueError(f"Unable to find decryption for {s}, {iv}, and {c}")

    return strxor(iv, r)


def attack(padding_oracle, iv, c):
    """
    Recovers the plaintext using the padding oracle attack.
    :param padding_oracle: the padding oracle, returns True if the padding is correct, False otherwise
    :param iv: the initialization vector
    :param c: the ciphertext
    :return: the (padded) plaintext
    """
    p = _attack_block(padding_oracle, iv, c[0:16])
    for i in range(16, len(c), 16):
        p += _attack_block(padding_oracle, c[i - 16:i], c[i:i + 16])

    return p
```

### Bit-flipping attack

- [Wikipedia - Bit-flipping attack](https://en.wikipedia.org/wiki/Bit-flipping_attack)

```python {linenos=table,filename="cbc_bit_flipping.py"}
# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/cbc/bit_flipping.py
def attack(iv, c, pos, p, p_):
    """
    Replaces the original plaintext with a new plaintext at a position in the ciphertext.
    :param iv: the initialization vector
    :param c: the ciphertext
    :param pos: the position to modify at
    :param p: the original plaintext
    :param p_: the new plaintext
    :return: a tuple containing the modified initialization vector and the modified ciphertext
    """
    iv_ = bytearray(iv)
    c_ = bytearray(c)
    for i in range(len(p)):
        if pos + i < 16:
            iv_[pos + i] = iv[pos + i] ^ p[i] ^ p_[i]
        else:
            c_[pos + i - 16] = c[pos + i - 16] ^ p[i] ^ p_[i]

    return iv_, c_
```

### Key == IV

- [StackExchange - Problem with using AES key as IV in CBC mode](https://crypto.stackexchange.com/questions/16161/problems-with-using-aes-key-as-iv-in-cbc-mode)

When the **IV** is chosen as the **key**, AES becomes insecure. The **Key** can then be leaked if you have a acces to decryption oracle.

> [!tip]
> This attack is based on the same principle as the [IV recovery](#iv--nonce-recovery); the only difference is that you also recover the key because the IV is the key.
