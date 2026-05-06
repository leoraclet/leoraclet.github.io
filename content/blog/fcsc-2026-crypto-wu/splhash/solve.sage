# https://gmogoat.fr/posts/splhash/

from sage.all import *
import random

random.seed(int(0))
_A = [random.choices([0, 1], k=512) for _ in range(1280)]
_B = [random.choices([0, 1], k=1280) for _ in range(256)]
S = [12, 5, 6, 11, 9, 0, 10, 13, 3, 14, 15, 8, 4, 7, 1, 2]
S_inv = {S[i]:i for i in range(len(S))}

for i in range(16):
    assert S_inv[S[i]] == i

def unpack(values, width):
    return [(v >> i) & 1 for v in values for i in range(width)]


def pack(bits, width):
    return [
        sum((bits[i + j]) << j for j in range(width))
        for i in range(0, len(bits), width)
    ]

def multiply(matrix, vector):
    return [sum(m & v for m, v in zip(row, vector)) % 2 for row in matrix]

def encode(m, d=False):
    state = unpack(m, 8)
    if d:
        print(state)
    state = multiply(_A, state)
    if d:
        print(state)
    state = pack(state, 4)
    if d:
        print(state)
    state = [S[nibble] for nibble in state]
    if d:
        print(state)
    state = unpack(state, 4)
    if d:
        print(state)
    state = multiply(_B, state)
    return bytes(pack(state, 8))


B = Matrix(GF(2), _B).T
A = Matrix(GF(2), _A)

x1 = list(B.kernel()[1])
x1 = [int(e) for e in list(x1)]

random.seed()

i = 0
while True:
    try:
        test_v = random.choices([0, 1], k=512)
        base_v = list(test_v)
        print(bytes(pack(base_v, 8)).hex())
        # assert test_v != x1
        # assert multiply(_B, test_v) == multiply(_B, [(test_v[i] + x1[i]) % 2 for i in range(1280)])

        test_v = multiply(_A, test_v)
        test_v = pack(test_v, 4)
        test_v = [S[nibble] for nibble in test_v]
        test_v = unpack(test_v, 4)
        test_v = [(test_v[i] + x1[i]) % 2 for i in range(1280)]

        test_v = pack(test_v, 4)
        test_v = [S_inv[e] for e in test_v]
        test_v = unpack(test_v, 4)
        test_v = [int(e) for e in list(A.solve_right(vector(GF(2), test_v)))]
        assert test_v == base_v
        test_v = pack(test_v, 8)
        print(test_v)
        print(bytes(pack(base_v, 8)).hex())
        print("FOUND")
        exit()
    except Exception as e:
        print(e)
    except KeyboardInterrupt:
        exit()

# for _ in range(10):
#     test_v = random.choices([0, 1], k=1280)
#     assert multiply(_B, test_v) == multiply(_B, [(test_v[i] + x1[i]) % 2 for i in range(1280)])
