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


| Encoding                  | Alphabet / Structure                      | Recognition Hints                                       |
|---------------------------|-------------------------------------------|---------------------------------------------------------|
| **Base64**                | A–Z a–z 0–9 +/ (= for padding)            | Ends with `=`  / `==`. ASCII letters + slashes          |
| **Base32**                | A–Z 2–7                                   | Uppercase letters and digits 2–7, often ends with `=`   |
| **Base58**                | BTC alphabet (excludes 0 O l I)           | No `+/=`, mixed case letters & digits                   |
| **Base85 / Ascii85**      | ASCII 33–117, `<~ … ~>`                   | `<~` prefix                                             |
| **Base92**                | Compact form, 92 printable chars          | No padding, very dense string                           |
| **Hex**                   | 0–9 A–F  pairs                            | Even length, only hex digits                            |
| **Binary (ASCII)**        | 0 / 1 (8‑bit groups)                      | Only 0s and 1s, usually multiple of 8                   |
| **Octal**                 | 0–7 digits                                | Text of 7 and 3 digits separated by spaces              |
| **Unicode/UTF‑16**        | Null bytes between letters (`h\x00i\x00`) | Appears in hexdumps/UTF‑16 files                        |
| **Morse Code**                    | `.` and `-`             | Only those characters separated by spaces |

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
