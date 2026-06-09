---
title: Authenticated Encryption (AE)
linkTitle: AE / AEAD
---

[**Authenticated encryption**](https://en.wikipedia.org/wiki/Authenticated_encryption#Encrypt-then-MAC_(EtM)) (AE) is any encryption scheme which simultaneously assures the data **confidentiality** and **authenticity**

## Approaches

### Encrypt-then-MAC (EtM)

- [Wikipedia - Encrypt-then-MAC (EtM)](https://en.wikipedia.org/wiki/Authenticated_encryption#Encrypt-then-MAC_(EtM))

### Encrypt-and-MAC (E&M)

- [Wikipedia - Encrypt-and-MAC (E&M)](https://en.wikipedia.org/wiki/Authenticated_encryption#Encrypt-and-MAC_(E&M))

### MAC-then-Encrypt (MtE)

- [Wikipedia - MAC-then-Encrypt (MtE)](https://en.wikipedia.org/wiki/Authenticated_encryption#MAC-then-Encrypt_(MtE))

## Attacks

### Key reuse

When the key is reused for encryption, it is possible to recover the plaintext using a chosen-ciphertext or chosen-plaintext attack, whether you're given an encryption or decryption oracle (or both).

#### EtM

```python {linenos=table,filename="etm_key_reuse.py"}
# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/cbc_and_cbc_mac/etm_key_reuse.py

def attack(encrypt_oracle, decrypt_oracle, iv, c, t):
    """
    Uses a chosen-ciphertext attack to decrypt the ciphertext.
    :param encrypt_oracle: the encryption oracle
    :param decrypt_oracle: the decryption oracle
    :param iv: the initialization vector
    :param c: the ciphertext
    :param t: the tag corresponding to the ciphertext
    :return: the plaintext
    """
    p_ = bytes(16) + iv + c
    iv_, c_, t_ = encrypt_oracle(p_)
    c__ = iv + c
    p__ = decrypt_oracle(iv_, c__, c_[-32:-16])
    return p__[16:]
```

#### E&M

```python {linenos=table,filename="eam_key_reuse.py"}
# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/cbc_and_cbc_mac/eam_key_reuse.py

def attack(decrypt_oracle, iv, c, t):
    """
    Uses a chosen-ciphertext attack to decrypt the ciphertext.
    :param decrypt_oracle: the decryption oracle
    :param iv: the initialization vector
    :param c: the ciphertext
    :param t: the tag corresponding to the ciphertext
    :return: the plaintext
    """
    c_ = iv + c
    p_ = decrypt_oracle(bytes(16), c_, c[-16:])
    return p_[16:]
```

#### MtE

```python {linenos=table,filename="mt_key_reuse.py"}
# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/cbc_and_cbc_mac/mte_key_reuse.py

def attack(decrypt_oracle, iv, c, encrypted_zeroes):
    """
    Uses a chosen-ciphertext attack to decrypt the ciphertext.
    Prior knowledge of E_k(0^16) is required for this attack to work.
    :param decrypt_oracle: the decryption oracle
    :param iv: the initialization vector
    :param c: the ciphertext
    :param encrypted_zeroes: a full zero block encrypted using the key
    :return: the plaintext
    """
    c_ = iv + c[:-16] + encrypted_zeroes
    p_ = decrypt_oracle(bytes(16), c_)
    return p_[16:]
```

## Resources

- [GitHub - AE-with-MACs](https://github.com/ashutosh1206/Crypton/tree/master/Authenticated-Encryption/AE-with-MACs)
