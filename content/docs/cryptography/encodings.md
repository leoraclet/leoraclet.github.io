---
title: Encodings
tags:
- cybersecurity
- cryptography
- encodings
- hexadecimal
- binary
- base64
- base85
- base32
- base92
- unicode
- utf-16
- octal
- cyberchef
---

Here is a non-exhaustive list of many common and useful encodings you'll encounter quite often in computer science, cybersecurity, and CTF events.

## Quick reference


  Encoding                  | Alphabet / Structure                      | Recognition Hints                                       |
 |---------------------------|-------------------------------------------|---------------------------------------------------------|
 | **Base64**                | `A–Z a–z 0–9 +/ =`                        | Ends with `=` / `==`. ASCII letters + slashes          |
 | **Base32**                | `A–Z 2–7 =`                               | Uppercase letters and digits `2–7`, often ends with `=` |
 | **Base58**                | `1–9 A–H J–N P–Z a–k m–z` (BTC alphabet)   | No `+/=`, mixed case letters & digits                   |
 | **Base85 / Ascii85**      | `<~ !–u ~>`                               | `<~` prefix, uses ASCII `33–117`                        |
 | **Base92**                | `A–Z a–z 0–9 !"#$%&'()*+,./:;<=>?@[\]^_`{\|}~` | No padding, 92 printable chars                           |
 | **Hex**                   | `0–9 A–F` (pairs)                         | Even length, only hex digits                            |
 | **Binary (ASCII)**        | `0 1` (8‑bit groups)                      | Only `0`s and `1`s, usually multiple of 8               |
 | **Octal**                 | `0–7` (groups of 3)                        | Digits `0–7`, often separated by spaces                 |
 | **Unicode/UTF‑8**         | Variable-length (1–4 bytes per char)      | Non-ASCII chars appear as multi-byte sequences         |
 | **Unicode/UTF‑16**        | `h\x00i\x00` (null bytes between letters)  | Appears in hexdumps/UTF‑16 files                        |
 | **Morse Code**            | `. -` (separated by spaces)               | Only `.` and `-` separated by spaces                    |
 | **URL Encoding**          | `%00–%FF` (hex pairs)                     | `%`-prefixed hex pairs (e.g., `%20` for space)          |
 | **HTML Entities**         | `&name;` or `&#ddd;`                       | Starts with `&` and ends with `;`                       |

## Examples

Here is the text `example` represented in all the encodings described above.


| Encoding                  | Example                                   |
|---------------------------|-------------------------------------------|
| [**Base64**](https://gchq.github.io/CyberChef/#recipe=To_Base64('A-Za-z0-9%2B/%3D')&input=ZXhhbXBsZQ&oenc=65001&oeol=CRLF)                | `ZXhhbXBsZQ==`            |
| [**Base32**](https://gchq.github.io/CyberChef/#recipe=To_Base32('A-Z2-7%3D')&input=ZXhhbXBsZQ&oenc=65001&oeol=CRLF)                | `MV4GC3LQNRSQ====`            |
| [**Base58**](https://gchq.github.io/CyberChef/#recipe=To_Base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')&input=ZXhhbXBsZQ&oenc=65001&oeol=CRLF)                | `4r2UmqYWb6`|
| [**Base85 / Ascii85**](https://gchq.github.io/CyberChef/#recipe=To_Base85('!-u',false)&input=ZXhhbXBsZQ&oenc=65001&oeol=CRLF)      | `AU%X#E,9(`                  |
| [**Base92**](https://gchq.github.io/CyberChef/#recipe=To_Base92()&input=ZXhhbXBsZQ&oenc=65001&oeol=CRLF)                | `Ea&;bv5'6`          |
| [**Hex**](https://gchq.github.io/CyberChef/#recipe=To_Hex('Space',0)&input=ZXhhbXBsZQ&oenc=65001&oeol=CRLF)                   | `252f6578616d706c65`                       |
| [**Binary (ASCII)**](https://gchq.github.io/CyberChef/#recipe=To_Binary('Space',8)&input=ZXhhbXBsZQ&oenc=65001&oeol=CRLF)        | `001001010010111101100101011110000110000101101101011100000110110001100101` |
| [**Octal**](https://gchq.github.io/CyberChef/#recipe=To_Octal('Space')&input=ZXhhbXBsZQ&oenc=65001&oeol=CRLF)                 | `45 57 145 170 141 155 160 154 145`        |
| [**Unicode/UTF‑16**](https://www.coderstool.com/utf16-encoding-decoding)        | `\u0065\u0078\u0061\u006d\u0070\u006c\u0065` |
| [**Morse Code**](https://gchq.github.io/CyberChef/#recipe=To_Morse_Code('-/.','Space','Line%20feed')&input=ZXhhbXBsZQ)                    | `. -..- .- -- .--. .-.. .`            |

## Tools

**Online**

- [CyberChef](https://gchq.github.io/CyberChef/)
  - [Magic](https://gchq.github.io/CyberChef/#recipe=Magic(3,false,false,''))
- [dCode's Tools List](https://www.dcode.fr/tools-list#character_encoding)

## Resources

- [Base64](https://en.wikipedia.org/wiki/Base64)
- [Octal](https://en.wikipedia.org/wiki/Octal)
- [Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal)
- [UTF-16](https://en.wikipedia.org/wiki/UTF-16)
- [Base32](https://en.wikipedia.org/wiki/Base32)
- [Morse Code](https://en.wikipedia.org/wiki/Morse_code)
