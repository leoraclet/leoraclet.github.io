---
title: Message-Digest 5 (MD5)
linkTitle: MD5
weight: 1
tags:
- cybersecurity
- cryptography
- md5
- hash
- collision
- hash-length-extension
---

The [MD5](https://en.wikipedia.org/wiki/MD5) message-digest algorithm is a widely used hash function producing a 128-bit hash value. However, it has been mathematically broken and is now considered insecure by today's standards.

## Attacks

### Collision

A [hash collision](https://en.wikipedia.org/wiki/Hash_collision) occurs when two distinct pieces of data share the same hash value. MD5 is vulnerable to a special type of collision: under certain constraints, it is possible to create two distinct inputs $x_1$ and $x_2$ such that $MD5(x_1) = MD5(x_2)$.

Here some tools that do exactly that for us :

- [**fastcoll**](https://github.com/brimstone/fastcoll) – MD5 collision generator.
- [**collisions**](https://github.com/corkami/collisions) – Hash collisions and exploitations.
- [**HashClash**](https://github.com/cr-marcstevens/hashclash) – MD5 & SHA-1 cryptanalysis.


### Hash Length Extension

MD5, just like SHA-1, is vulnerable to the [length extension attack](https://asecuritysite.com/hash/lenattack). This attack allows a potential attacker to take a hash $h$ for an unknown message $m$ and append additional data to $m$ to produce a new valid hash $h'$ for the new message $m' = m \parallel d$, where $d$ is some chosen data.

All hahs functions that are based on the [Merkle–Damgård construction](https://en.wikipedia.org/wiki/Merkle%E2%80%93Damg%C3%A5rd_construction) are susceptible to this kind of attack.

## Resources

- [**Wikipedia**](https://en.wikipedia.org/wiki/Length_extension_attack) – Explanation of the attack.
- [**Hash Extender**](https://github.com/iagox86/hash_extender) – Tool to exploit the vulnerability.
