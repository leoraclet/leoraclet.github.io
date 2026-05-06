try:
    a = int(input("a = "))
    b = int(input("b = "))
    assert a > 0 and b > 0

    for i in range(10):
        for j in range(10):
            ai = a + i
            bj = b + j
            assert bj % ai != 0

    a_prod = 1
    b_prod = 1
    for i in range(10):
        a_prod *= a + i
        b_prod *= b + i
    assert b_prod % a_prod == 0

    print(open("flag.txt").read())
except:
    print("Nope!")
