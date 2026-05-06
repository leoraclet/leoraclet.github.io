import random


def unpack(values, width):
    return [(v >> i) & 1 for v in values for i in range(width)]


def pack(bits, width):
    return [
        sum((bits[i + j]) << j for j in range(width))
        for i in range(0, len(bits), width)
    ]


def multiply(matrix, vector):
    return [sum(m & v for m, v in zip(row, vector)) % 2 for row in matrix]


class Splhash:
    def __init__(self):
        random.seed(0)
        self.A = [random.choices([0, 1], k=512) for _ in range(1280)]
        self.B = [random.choices([0, 1], k=1280) for _ in range(256)]
        self.S = [12, 5, 6, 11, 9, 0, 10, 13, 3, 14, 15, 8, 4, 7, 1, 2]

    def __call__(self, m):
        state = unpack(m, 8)
        state = multiply(self.A, state)
        state = pack(state, 4)
        state = [self.S[nibble] for nibble in state]
        state = unpack(state, 4)
        state = multiply(self.B, state)
        return bytes(pack(state, 8))


if __name__ == "__main__":
    try:
        H = Splhash()
        print("Welcome, give me a collision:")
        a = bytes.fromhex(input(">>> "))
        b = bytes.fromhex(input(">>> "))

        assert a != b
        assert len(a) == 64
        assert len(b) == 64
        assert H(a) == H(b)

        print("Congratulations! Here is the flag:")
        print(open("flag.txt").read())
    except:
        print("Sploutch.")

