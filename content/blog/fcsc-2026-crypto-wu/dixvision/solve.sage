a = 10488
base = 19 * 23 * 617 * 1049 * 269 * 43 * 61 * 1499 * 11 * 53 * 2099 * 41 * 3499
missing = 2 ^ 15 * 3 ^ 5 * 5 ^ 2 * 7 * 17
# prod(range(a+i for i in range(10))) =: c is equal to missing * base
#                               first factor of each a+i ↑        ↑ remaining primes

# Goal: Search for b such that c divides b * (b+1).
# Idea: set b = u*base for some u and ensure missing divides u*base + 1. => very easy to do by xgcd, find u*base + v*missing = -1.
# Because a is not annoying (biggish factors in each a+i), with good probability we have (b+j) % (a+i) != 0.
g, u, v = xgcd(-base, missing)
assert g == 1
assert (u * base + 1) % missing == 0
assert u < 0  # problematic, we want positive u
x, y = missing, -base
assert x * base + y * missing == 0
# (u + tx)base + (v + ty)missing = -1
u += (1 - u // x) * x
assert u > 0
assert (u * base + 1) % missing == 0

b = u * base

for i in range(10):
    for j in range(10):
        ai = a + i
        bj = b + j
        assert bj % ai != 0, f"ai = {factor(ai)} ; bj = {factor(bj)}"

a_prod = 1
b_prod = 1
for i in range(10):
    a_prod *= a + i
    b_prod *= b + i
assert b_prod % a_prod == 0

print(f"{a = }")
print(f"{b = }")
