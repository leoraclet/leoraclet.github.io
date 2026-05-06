# Pour dixvision, il y a plusieurs approches.
# L'intended c'etait de prendre 20 premiers p0, p1... p9, q0,q1... q9, et de choisir x= 0 mod p0 q0, x=-1 mod p1 q1 etc... Avec un CRT.
# Puis tu prends b tel que b= 0 mod le produit de p_i et b=-1 mod le produit des q_i

from Crypto.Util.number import getPrime

from itertools import combinations

def prod(iterable):
    q = 1
    for x in iterable:
        q *= x
    return q

def fact(n):
   if n == 0:
      return 1
   else:
      F = 1
      for k in range(2,n+1):
         F = F * k

def test(a, b):
    try:
        assert a > 0 and b > 0

        for i in range(10):
            for j in range(10):
                ai = a + i
                bj = b + j
                # print(bj % ai != 0)
                assert bj % ai != 0

        a_prod = 1
        b_prod = 1
        for i in range(10):
            a_prod *= a + i
            b_prod *= b + i
        print("final", b_prod % a_prod)
        assert b_prod % a_prod == 0

        return True
    except Exception as e:
        # print(e)
        return False

# We want b(b + 1) = a(a + 1)(a + 2)...(a + 9)

p = []
for _ in range(20):
    p.append(getPrime(15))

import math

a = crt([0, -1, -2, -3, -4, -5, -6, -7, -8, -9], [p[i]*p[i+1] for i in range(0, len(p), 2)])
b = crt([0, 1], [math.prod(p[0::2]), math.prod(p[1::2])])
print(a)
print(b)

ai = 1
for i in range(10):
    ai *= a + i

print()
print(test(a, b))
