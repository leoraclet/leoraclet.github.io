from sage.all import *
from Crypto.PublicKey import RSA
from Crypto.Util.number  import getRandomNBitInteger, long_to_bytes, bytes_to_long
import time
from pwn import *

def hom_prod(k, c1, c2):
    m1 = pow(c1, k.d, k.n)
    m2 = pow(c2, k.d, k.n)
    return pow(m1 * m2, k.e, k.n)


def hom_sum(k, c1, c2):
    m1 = pow(c1, k.d, k.n)
    m2 = pow(c2, k.d, k.n)
    return pow(m1 + m2, k.e, k.n)


# All the variable names mean the same as mentioned in the explanation
# For eg, a,b are the values in the function f = ax + b

def gcd(a, b):
    while b:
        a, b = b, a % b
    return a.monic()

def franklinreiter(C1, C2, e, N, a, b):
    P.<X> = PolynomialRing(Zmod(N))
    g1 = (a*X + b)^e - C1
    g2 = X^e - C2
    result = gcd(g1, g2).coefficients()
    print(result)
    return -result[0]

def chall():
    B = getRandomNBitInteger(512)
    A = getRandomNBitInteger(512)
    log.info("A = " + str(A))
    log.info("B = " + str(B))
    p = remote("challenges.fcsc.fr", 2150)
    n = int(p.recvline().decode().split("\n")[0])
    e = int(p.recvline().decode().split("\n")[0])
    c1 = int(p.recvline().decode().split("\n")[0])
    c2 = pow(A, e, n) * c1
    b_plus = pow(B, e, n)
    log.info("N = " + str(n))
    log.info("E = " + str(e))
    log.info("C1 = " + str(c1)) # flag
    p.recvuntil(b">>> c1 = ")
    p.sendline(str(c2).encode())
    p.recvuntil(b">>> c2 = ")
    p.sendline(str(b_plus).encode())
    p.recvuntil(b">>> prod or sum? ")
    p.sendline(b"sum")
    c2 = int(p.recvline().decode().split("\n")[0])
    log.info("C2 = " + str(c2))
    p.close()
    print("Attack ...")
    m2 = franklinreiter(c2, c1, e, n, A, B)
    m1 = (A * int(m2) + B) % n
    print("M1 = ", m1)
    print("M2 = ", int(m2 % n))
    print(b"M1 = " + long_to_bytes(m1))
    print(b"M2 = " + long_to_bytes(int(m2 % n)))

def test():
    k = RSA.generate(1024, e=int(3))

    m = bytes_to_long(b"FCSC{The_FLag}")
    c1 = pow(m, k.e, k.n)
    # B = getRandomNBitInteger(512)
    # A = getRandomNBitInteger(512)
    B = 50
    A = 1
    c2 = pow(A, k.e, k.n) * c1
    c2 = hom_sum(k, c2, pow(B, k.e, k.n))

    assert (A * m + B) % k.n == pow(c2, k.d, k.n)
    assert pow((A * m + B) % k.n, k.e, k.n) == c2


    print("a = ", A)
    print("b = ", B)
    print("Attack ...")
    start = time.time()
    res = franklinreiter(c2, c1, k.e, k.n, A, B)
    print(time.time() - start)
    print(res % k.n)
    print((A * int(res) + B) % k.n)
    print(b"M1 = " + long_to_bytes(int(res % k.n)))

if __name__ == '__main__':
    test()
    # chall()
