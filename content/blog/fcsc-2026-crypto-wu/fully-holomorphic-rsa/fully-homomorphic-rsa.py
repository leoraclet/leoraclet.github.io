from Crypto.PublicKey import RSA


def hom_prod(k, c1, c2):
    m1 = pow(c1, k.d, k.n)
    m2 = pow(c2, k.d, k.n)
    return pow(m1 * m2, k.e, k.n)


def hom_sum(k, c1, c2):
    m1 = pow(c1, k.d, k.n)
    m2 = pow(c2, k.d, k.n)
    return pow(m1 + m2, k.e, k.n)


k = RSA.generate(1024)

flag = int.from_bytes(open("flag.txt", "rb").read())
assert flag < k.n

print(k.n)
print(k.e)
flag_enc = pow(flag, k.e, k.n)
print(flag_enc)

while True:
    try:
        c1 = int(input(">>> c1 = "))
        c2 = int(input(">>> c2 = "))
        choice = input(">>> prod or sum? ")
        if choice == "sum":
            print(hom_sum(k, c1, c2))
        elif choice == "prod":
            print(hom_prod(k, c1, c2))
    except:
        pass
