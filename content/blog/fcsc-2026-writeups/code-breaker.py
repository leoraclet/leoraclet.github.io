import os
import json
import numpy as np
from galois import GF
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

def random_matrix(Fq, m, n, rng):
    return Fq.Random((m, n), seed = rng)

def random_permutation_matrix(Fq, n, rng):
    p = rng.permutation(n)
    P = Fq.Zeros((n, n))
    P[np.arange(n), p] = Fq(1)
    return P

def random_grs(Fq, k, n, rng):
    while True:
        a, v = Fq.Random(n, seed = rng), Fq.Random(n, seed = rng)
        if np.all(v) and np.unique(a).size == a.size:
            break
    j = np.arange(k)
    return a[None, :] ** j[:, None] * v[None, :]

def generate(Fq, G, rng):
    k, n = G.shape
    S = random_matrix(Fq, k, k, rng)
    P = random_permutation_matrix(Fq, n, rng)
    return S @ G @ P

if __name__ == "__main__":

    q = 2 ** 32 - 5
    k = 20
    n = 64
    Fq = GF(q)
    rng = np.random.default_rng()

    d = {}
    key = []
    for i in range(256):
        b = rng.integers(0, 2)
        key.append(int(b))

        if b: G = random_matrix(Fq, k, n, rng)
        else: G = random_grs(Fq, k, n, rng)

        C = generate(Fq, G, rng)
        d[i] = [ int(_) for _ in C.flatten() ]

    iv = os.urandom(16)
    key = sum(b << i for i, b in enumerate(key)).to_bytes(32)
    flag = open("flag.txt", "rb").read()
    E = AES.new(key, AES.MODE_CBC, iv = iv)
    c = E.encrypt(pad(flag, 16))

    d["params"] = (q, k, n)
    d["enc"] = {
        "c": c.hex(),
        "iv": iv.hex(),
    }

    with open("output.txt", "w") as fp:
        fp.write(json.dumps(d, indent = 4))
