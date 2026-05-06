from itertools import count

for x in count(2**255):
    for y in range(1, x**5 + 1):
        if 0 < abs(y**2 - x**5) < 2**423:
            print(f"FCSC{{{x:x}}}")
            exit()
