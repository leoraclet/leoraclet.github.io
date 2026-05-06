# Homemade RSA key generation for this challenge,
# but you don't need to know the details to solve.
# you don't have access to the implementation details of our quantum computer
import quantum_computer
import rsa

print("Generating RSA key ...")
e = 2**16 + 1
n, p, q, iq, dp, dq, d = rsa.keygen(1024, e)

print("Here is the public modulus:")
print(f"n = {int(n)}")

base = 3
c = quantum_computer.QFT(n)
print(f"Here is the output of the quantum computer for the base {base}:")
print(f"c = {int(c)}")

print("Please provide any non-trivial factor of the public modulus:")
try:
    factor = int(input(">>> "))
    if factor == p or factor == q:
        print("Congrats! Here is the flag:")
        print(open("flag.txt").read())
    else:
        print("Nope!")
except:
    print("Please check your input.")
