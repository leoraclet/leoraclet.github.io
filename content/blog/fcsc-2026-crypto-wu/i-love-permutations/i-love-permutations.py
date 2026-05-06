import os
import random


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
            # print(self.bits_to_branch(l))

            random.seed(self.bits_to_branch(l))
            random.shuffle(r)
            random.seed(self.k)
            random.shuffle(r)

            random.seed(self.bits_to_branch(r))
            random.shuffle(l)
            random.seed(self.k)
            random.shuffle(l)
        return self.bits_to_branch(l) + self.bits_to_branch(r)


if __name__ == "__main__":
    print("Hello, I love permutations!")
    ILP = i_love_permutations()
    flag = open("flag.txt", "rb").read().strip()
    assert len(flag) == 32

    print(f"Flag hex : {ILP.encrypt(flag[:16]).hex() + ILP.encrypt(flag[16:32]).hex()}")

    try:
        queries = 6
        while queries > 0:
            print("Which message should I permute?")
            m = bytes.fromhex(input(">>>"))
            if not m:
                break
            c = ILP.encrypt(m)
            print(f"Encryption: {c.hex()}")
            queries -= 1
    except:
        print("Please check your inputs.")
