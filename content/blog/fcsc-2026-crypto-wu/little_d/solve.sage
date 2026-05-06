import math
from random import randrange

import gmpy2
from Crypto.Util.number import (
    getPrime,
    getRandomNBitInteger,
)

def correctness(p, q, e, d):
    if e.bit_length() > 256:
        print("Error: e is too big.")
        return False

    if e < 65537:
        print("Error: e is too short.")
        return False

    if not gmpy2.is_prime(p):
        print("Error: p is not prime.")
        return False

    if not gmpy2.is_prime(q):
        print("Error: q is not prime.")
        return False

    n = p * q

    if p.bit_length() != q.bit_length():
        print("Error: p and q have not the same bit length.")
        return False

    if p.bit_length() < 512:
        print("Error: prime bit length is too small.")
        return False

    if n.bit_length() != p.bit_length() + q.bit_length():
        print("Error: public modulus has not the correct bit length.")
        return False

    if abs(p - q) < 2 ** (p.bit_length() - 100):
        print("Error: primes not compliant with FIPS 186-5.")
        return False

    for _ in range(4):
        m = randrange(n)
        if gmpy2.powmod(m, e * d, n) != m:
            print("Error: message is not of order e*d - 1.")
            return False

    if d.bit_length() >= p.bit_length():
        print("Error: private exponent is too big for this challenge.")
        return False

    if (e * d).bit_length() - p.bit_length() < 128:
        print("not safe enough for this challenge")
        return False

    return True

while True:
    N = 10
    g = getPrime(512 - N)
    b = a = 0
    p = q = 0
    while not gmpy2.is_prime(p):
        a = getRandomNBitInteger(N)
        p = 2 * a * g + 1

    while not gmpy2.is_prime(q):
        b = getRandomNBitInteger(N)
        q = 2 * b * g + 1

    if p.bit_length() != q.bit_length():
        continue
    if (p*q).bit_length() != p.bit_length() + q.bit_length():
        continue
    if abs(p - q) < 2 ** (p.bit_length() - 100):
        continue

    break

lcm = math.lcm(q - 1, p - 1)
while True:
    e = 2*getRandomNBitInteger(255) + 1
    try:
        d = pow(e, -1, lcm)
    except:
        continue
    if (e * d).bit_length() - p.bit_length() > 128 and d.bit_length() < 512:
        print(e)
        print(d)
        print(d.bit_length())
        print((e * d).bit_length() - p.bit_length())
        if correctness(p, q, e, d):
            print("p = ", p)
            print("q = ", q)
            print("e = ", e)
            print("d = ", d)
            exit()
