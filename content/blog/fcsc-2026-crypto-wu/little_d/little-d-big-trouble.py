from random import randrange

import gmpy2


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


if __name__ == "__main__":
    try:
        print("Please, enter your lucky RSA key as : p, q, e, d.")
        p, q, e, d = [int(input(">>> ")) for _ in "pqed"]

        print("[+] Testing correctness...")
        if correctness(p, q, e, d):
            flag = open("flag.txt").read().strip()
            print(f"[+] Congrats! Here is the flag: {flag}")

    except:
        print("Please check your inputs")
