from Crypto.Util.number import bytes_to_long, long_to_bytes, getPrime

p = getPrime(512)
q = getPrime(512)
n = p * q
lol = bytes_to_long(b"lololdqsdsqdqsdqsdqsdqsdsqdqsd")
off = 100
print(long_to_bytes((lol * pow(2, 8*off, n)) % n))

