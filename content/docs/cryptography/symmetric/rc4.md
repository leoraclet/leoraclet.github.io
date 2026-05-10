---
title: RC4
linkTitle: RC4
---

[**RC4**](https://en.wikipedia.org/wiki/RC4) is a stream cipher. While it is remarkable for its simplicity and speed in software, multiple vulnerabilities have been discovered in RC4, rendering it insecure.

## Basics

### Key-scheduling algorithm

> [!important] TODO

### Pseudo-random generation algorithm

> [!important] TODO

## Attacks

### FMS attack

```python {linenos=table,filename="fms.py"}
# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/rc4/fms.py
from collections import Counter

def _possible_key_bit(key, c):
    s = [i for i in range(256)]
    j = 0
    for i in range(len(key)):
        j = (j + s[i] + key[i]) % 256
        tmp = s[i]
        s[i] = s[j]
        s[j] = tmp

    return (c[0] - j - s[len(key)]) % 256


def attack(encrypt_oracle, key_len):
    """
    Recovers the hidden part of an RC4 key using the Fluhrer-Mantin-Shamir attack.
    :param encrypt_oracle: the padding oracle, returns the encryption of a plaintext under a hidden key concatenated with the iv
    :param key_len: the length of the hidden part of the key
    :return: the hidden part of the key
    """
    key = bytearray([3, 255, 0])
    for a in range(key_len):
        key[0] = a + 3
        possible = Counter()
        for x in range(256):
            key[2] = x
            c = encrypt_oracle(key[:3], b"\x00")
            possible[_possible_key_bit(key, c)] += 1
        key.append(possible.most_common(1)[0][0])

    return key[3:]
```

## Klein's attack

> [!important] TODO

## Resources

- [Fluhrer, Mantin and Shamir attack](https://en.wikipedia.org/wiki/Fluhrer,_Mantin_and_Shamir_attack)
