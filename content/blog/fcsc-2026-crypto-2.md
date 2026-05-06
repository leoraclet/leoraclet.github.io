---
title: "FCSC 2026 - Crypto Write-Ups: 2"
date: 2026-05-03
draft: true
tags:
- ctf
- fcsc
- 2026
- crypto
- blog
- writeup
---

Hi there 🥹 ! Welcome Back.

This is the second post on the [FCSC CTF](https://fcsc.fr/), check out the [first one](../fcsc-2026-crypto) if you want more context. Here are more write-ups of challenges I didn't solve in time but wanted to solve and, more importantly, explain how I finally did it and how you could have too.

<!--more-->

- [dixvision](#dixvision)
- [À une vache près](#à-une-vache-près)


## dixvision

| Points | Difficulty | Solves |
| :----: | :--------: | :----: |
| **420**    |  ★ ★      | **33**     |

**Description**

> ![division](./fcsc-2026-crypto-wu/dixvision.png)
>
> **`nc challenges.fcsc.fr 2155`**

**Code**

The service’s source code was provided :

```python {linenos=table,filename="dixvision.py"}
try:
    a = int(input("a = "))
    b = int(input("b = "))
    assert a > 0 and b > 0

    for i in range(10):
        for j in range(10):
            ai = a + i
            bj = b + j
            assert bj % ai != 0

    a_prod = 1
    b_prod = 1
    for i in range(10):
        a_prod *= a + i
        b_prod *= b + i
    assert b_prod % a_prod == 0

    print(open("flag.txt").read())
except:
    print("Nope!")
```

**Solving**

> [!warning] TODO

**`FCSC{<I_dont_know_because_I_didnt_solved_it_in_time>}`**

## À une vache près

| Points | Difficulty | Solves |
| :----: | :--------: | :----: |
| **493**  |  ★ ★ ★   | **3** |

**Description**

> ![À une vache près](./fcsc-2026-crypto-wu/a-une-vache-pres.jpg)

**Code**

Here is the provided source file :

```python
from itertools import count

for x in count(2**255):
    for y in range(1, x**5 + 1):
        if 0 < abs(y**2 - x**5) < 2**423:
            print(f"FCSC{{{x:x}}}")
            exit()
```

> [!note]
> I would have **never** been able to solve this challenge, because for most of the time I was trying to do it using only pen, paper, and my math knowledge, which was clearly *not enough* now kwnowing the solution.

**Solving**

The key to solve this challenge was to find, read and understand [this paper](https://www.sciencedirect.com/science/article/pii/S0022314X09002534), then implement from scratch a solution based on explained principles.

> [!warning] TODO

**`FCSC{<I_dont_know_because_I_didnt_solved_it_in_time>}`**

## Final word

> [!warning] TODO
