# - https://github.com/jvdsn/crypto-attacks/blob/master/attacks/factorization/shor.py
# - https://eprint.iacr.org/2017/083.pdf
# - https://arxiv.org/pdf/quant-ph/9508027

from pwn import *

def solve(c, n):
    conv = continued_fraction(c / (2**(2*1024))).convergents()
    denum = [int(e.denominator()) for e in conv]

    for j in denum:
        if power_mod(3, j, n) == 1:
            phi = (N // j) * j
            p_plus_q = N + 1 - phi
            p = abs(-p_plus_q + isqrt(p_plus_q**2 - 4*N)) // 2
            if 1 < p < n and n % p == 0:
                return p

    return False

while True:
    conn = remote("challenges.fcsc.fr", 2154)
    data = conn.recvuntil(b">>> ").decode()
    n = int(data.split("n = ")[1].split("\n")[0])
    c = int(data.split("c = ")[1].split("\n")[0])
    log.info(f"n = {n} ({n.bit_length()})")
    log.info(f"c = {c} ({c.bit_length()})")
    fact = solve(c, n)
    if fact:
        conn.sendline(str(fact).encode())
        log.info(conn.recvline())
        log.info(conn.recvline())
        break
    conn.close()
