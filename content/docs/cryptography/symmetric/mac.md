---
title: Message Authentication Code (MAC)
linkTitle: MAC
---

A [**message authentication code**](https://en.wikipedia.org/wiki/Message_authentication_code) (MAC), sometimes known as an **authentication tag**, is a short piece of information used for authenticating and integrity-checking a message.

## Attacks

### CBC-MAC Forgery

- [CBC-MAC Forgery](https://github.com/ashutosh1206/Crypton/blob/master/Message-Authentication-Code/CBC-MAC-Forgery/README.md#the-exploit)

```python {linenos=table,filename="length_extension.py"}
```

### Length Extension

```python {linenos=table,filename="length_extension.py"}
# https://github.com/jvdsn/crypto-attacks/blob/master/attacks/cbc_mac/length_extension.py

from Crypto.Util.strxor import strxor


def attack(m1, t1, m2, t2):
    """
    Uses a length extension attack to forge a message and tag pair for CBC-MAC.
    :param m1: the first message
    :param t1: the tag of the first message
    :param m2: the second message
    :param t2: the tag of the second message
    :return: a tuple containing a valid message and tag for CBC-MAC
    """
    m3 = bytearray(m1)
    m3 += strxor(t1, m2[:16])
    for i in range(16, len(m2), 16):
        m3 += m2[i:i + 16]

    return m3, t2
```

## Resources
