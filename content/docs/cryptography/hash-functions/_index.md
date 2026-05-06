---
title: Hash Functions
linkTitle: Hashes
---

A [**hash function**](https://en.wikipedia.org/wiki/Hash_function)is a mathematical function that converts an input (or "message") into a fixed-size string of bytes, typically a hexadecimal number, in a way that is deterministic (same input always produces the same output) and ideally unique for each unique input.

Hash functions are widely used in **data integrity** checks, **password storage**, **digital signatures** and efficient data retrieval in **hash tables**.

## Types

There are a lot of hash functions. Here are the most popular ones you will encounter most often in a wide variety of cases.

| Name | Byte Length | Hashcat Mode | Example (hex) |
| :-- | :--: | :--: | :-- |
| [MD5](md5/) | 32 | 0 | `1bc29b36f623ba82aaf6724fd3b16718` |
| [SHA1](sha1/) | 40 | 100 | `415ab40ae9b7cc4e66d6769cb2c08106e8293b48` |
| SHA256 | 64 | 1400 | `5d5b09f6dcb2d53a5fffc60c4ac0d55fabdf556069d6631545f42aa6e3500f2e`|

## Tools

- [Hashcat](https://hashcat.net/hashcat/) - Hash / password cracker
- [John The Ripper](https://www.openwall.com/john/) - Another password cracker

**Online**

- [CyberChef](https://gchq.github.io/CyberChef/#input=ZXhhbXBsZQ)
- [Crackstation - Free Password Hash Cracker](https://crackstation.net/) - Rainbow table
- [MD5Hashing.net](https://md5hashing.net/) - MD5 Cracker
- [DCode - Hash Identifier](https://www.dcode.fr/hash-identifier) - Hash identifier

**Wordlists**

- [rockyou.txt](https://github.com/zacheller/rockyou)
- [SecList](https://github.com/danielmiessler/SecLists)

## Resources

- [Hashcat Wiki - Example hashes](https://hashcat.net/wiki/doku.php?id=example_hashes)
