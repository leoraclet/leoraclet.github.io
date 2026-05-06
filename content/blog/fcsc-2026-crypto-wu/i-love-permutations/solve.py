import os
import random

from sage.all import Permutation

from pwn import *


class i_love_permutations:
    def __init__(self, n=64, r=101):
        self.n = n
        self.r = r
        self.k = os.urandom(16)  # 128-bit key

    def branch_to_bits(self, branch):
        bits = []
        for b in branch:
            for i in range(8):
                bits.append((b >> i) & 1)
        return bits

    def bits_to_branch(self, bits):
        assert len(bits) == self.n
        branch = []
        for i in range(0, self.n, 8):
            branch.append(sum((bits[i + j] & 1) << j for j in range(8)))
        return bytes(branch)

    def encrypt(self, m):
        assert len(m) == 2 * self.n // 8, "Invalid message length"
        l = self.branch_to_bits(m[: self.n // 8])
        r = self.branch_to_bits(m[self.n // 8 :])
        for _ in range(self.r):
            random.seed(self.bits_to_branch(l))
            random.shuffle(r)
            random.seed(self.k)
            random.shuffle(r)
            random.seed(self.bits_to_branch(r))
            random.shuffle(l)
            random.seed(self.k)
            random.shuffle(l)
        return self.bits_to_branch(l) + self.bits_to_branch(r)


class i_love_permutations_decrypt(i_love_permutations):
    def decrypt(self, m):
        l = self.branch_to_bits(m[: self.n // 8])
        r = self.branch_to_bits(m[self.n // 8 :])
        for _ in range(101):
            l = apply_permutation(l, reverse_key_permutation)
            l = reverse_shuffle(l, self.bits_to_branch(r))
            r = apply_permutation(r, reverse_key_permutation)
            r = reverse_shuffle(r, self.bits_to_branch(l))
        return self.bits_to_branch(l) + self.bits_to_branch(r)


# io = remote("challenges.fcsc.fr", 2153)
# io.recvline()
# flag_hex = io.recvuntil(b"Flag hex : ").decode().strip()
ILP = i_love_permutations()
flag = b"FCSC{This_is_a_test_flag_HAHAHA}"
flag_hex = ILP.encrypt(flag[:16]).hex() + ILP.encrypt(flag[16:32]).hex()

# def send_message(m):
#     io.sendlineafter(b">>>", b"ff" * 8 + m)
#     io.recvuntil(b"Encryption: ")
#     return io.recvline().decode().strip()


def bits_to_hex(b):
    result = []
    for i in range(0, len(b), 8):
        byte = sum(int(b[i + j]) << j for j in range(8))
        result.append(f"{byte:02x}")
    return "".join(result)


def hex_to_bits(h):
    result = []
    for byte in bytes.fromhex(h):
        for i in range(8):
            result.append(str((byte >> i) & 1))
    return result


def apply_permutation(l, perm):
    return [l[perm[i]] for i in range(len(l))]


def reverse_permutation(p):
    reverse_p = [0] * len(p)
    for i, x in enumerate(p):
        reverse_p[x] = i
    return reverse_p


def reverse_shuffle(l, seed):
    r = list(range(len(l)))
    random.seed(seed)
    random.shuffle(r)

    return apply_permutation(l, reverse_permutation(r))


n = 64
shuffles = []

for i in range(6):
    msg = []
    for x in range(n):
        msg.append(f"{x:06b}"[i])
    hex_message = bits_to_hex(msg)
    # response = send_message(hex_message.encode())
    response = ILP.encrypt(b"\x00" * 8 + bytes.fromhex(hex_message)).hex()
    response_final_bits = hex_to_bits(response[16:])
    shuffles.append(response_final_bits)

perm_101 = []
for j in range(n):
    perm_index = "".join([shuffles[i][j] for i in range(6)])
    perm_101.append(int(perm_index, 2))

from json import dumps
print(dumps(["".join([i for i in e]) for e in shuffles], indent=4))
print(perm_101)
# exit()
perm = Permutation([e + 1 for e in perm_101])
sigma = [int(e) - 1 for e in list(perm.nth_roots(101))[0]]


key_permutation = apply_permutation(reverse_shuffle(list(range(n)), b"\x00" * 8), sigma)
reverse_key_permutation = reverse_permutation(key_permutation)


ILP = i_love_permutations_decrypt()
print(
    ILP.decrypt((bytes.fromhex(flag_hex[:32]))).decode()
    + ILP.decrypt((bytes.fromhex(flag_hex[32:]))).decode()
)
