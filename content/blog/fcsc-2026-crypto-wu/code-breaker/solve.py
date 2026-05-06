# - https://arxiv.org/pdf/2412.15160
# - https://arxiv.org/pdf/2304.00627

import json

import numpy as np
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from galois import GF


def is_grs_disguised(flat, k, n, Fq):
    M = Fq(flat).reshape((k, n))

    products = []
    for i in range(k):
        for j in range(i, k):
            products.append(M[i] * M[j])

    P = Fq(products)

    # Compute matrix's rank
    P.row_reduce()
    dim = np.linalg.matrix_rank(P)

    return dim <= 2 * k


with open("output.txt") as f:
    data = json.load(f)

iv = bytes.fromhex(data["enc"]["iv"])
ciphertext = bytes.fromhex(data["enc"]["c"])

q = int(data["params"][0])
k = int(data["params"][1])
n = int(data["params"][2])

Fq = GF(q)

key = []
for _k, v in data.items():
    if _k not in ["enc", "params"]:
        if is_grs_disguised(v, k, n, Fq):
            key.append(0)
        else:
            key.append(1)


# Recover flag bytes
key = sum(b << i for i, b in enumerate(key)).to_bytes(32)
try:
    E = AES.new(key, AES.MODE_CBC, iv=iv)
    print(unpad(E.decrypt(ciphertext), 16))
except Exception:
    pass
