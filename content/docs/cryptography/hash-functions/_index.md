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

| Tool                                                                     | Description                                                        |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| [Hashcat](https://hashcat.net/hashcat/)           | High-performance password and hash cracking tool (GPU-accelerated) |
| [John The Ripper](https://www.openwall.com/john/) | Versatile password cracking tool for hashes and encrypted data     |

### Online

| Tool                                                                                   | Description                                               |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [CyberChef](https://gchq.github.io/CyberChef/#input=ZXhhbXBsZQ) | Web-based tool for encoding, decoding, and data analysis  |
| [Crackstation](https://crackstation.net/)                       | Online rainbow-table-based password hash cracking service |
| [MD5Hashing.net](https://md5hashing.net/)                       | Online MD5 hash lookup and cracking database              |
| [DCode Hash Identifier](https://www.dcode.fr/hash-identifier)   | Identifies likely hash types from input strings           |

### Wordlists

| Tool                                                                          | Description                                                 |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [rockyou.txt](https://github.com/zacheller/rockyou)    | Famous password wordlist used for brute-force and cracking  |
| [SecLists](https://github.com/danielmiessler/SecLists) | Comprehensive collection of security wordlists and payloads |

## Resources

- [Hashcat Wiki - Example hashes](https://hashcat.net/wiki/doku.php?id=example_hashes)
