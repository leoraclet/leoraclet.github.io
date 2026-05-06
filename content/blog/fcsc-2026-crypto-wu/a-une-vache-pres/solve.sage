# - https://doc.sagemath.org/html/en/constructions/calculus.html
# - https://www.sciencedirect.com/science/article/pii/S0022314X09002534

# Script Sagemath A une vache près
var("a b t")

x = a * t ^ 6 + b * t
y_expr = (1 + b / a * t ^ -5) ^ (5 / 2)
print(y_expr)
print()
y = expand(a ^ (5 / 2) * t ^ 15 * y_expr.series(b, 4).truncate())
z = expand(y ^ 2 - x ^ 5)

print(f"x(t) = {x}")
print(f"y(t) = {y}")
print(f"z(t) = {z}\n")

xr = x.subs(a == 25).subs(b == -2)
yr = y.subs(a == 25).subs(b == -2)
zr = z.subs(a == 25).subs(b == -2)

print(f"x(t) = {xr}")
print(f"y(t) = {yr}")
print(f"z(t) = {zr}\n")

# Affichage de la première solution
t_min = floor((2 ^ 255 / xr.coefficients(t)[-1][0]) ^ (1 / 6)) + 1
t_max = floor((2 ^ 423 / zr.coefficients(t)[-1][0]) ^ (1 / 10))
assert t_min < t_max

X = xr.subs(t == t_min)
Y = yr.subs(t == t_min)
Z = abs(Y ^ 2 - X ^ 5)

print("log2(X) =", float(log(X) / log(2)), "> 255")
print("log2(Z) =", float(log(Z) / log(2)), "< 423")
print(f"Flag: FCSC{{{floor(X):x}}}")
