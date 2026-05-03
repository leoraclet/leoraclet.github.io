---
title: Crypto
---

## FCSC 2019

### Weak RSA

- Challenge is hosted [here](https://hackropole.fr/fr/challenges/crypto/fcsc2019-crypto-weak-rsa/)

#### Solution

Here is a [related](https://bitsdeep.com/posts/fcsc-2021-write-ups-for-the-crypto-challenges/#rsa-destroyer) write-up.

```python {linenos=table}
from sage.all import *

n = 624185542407079427827492831014232541151306758219725462495264542743925577811126136319806649320525884477172602841051590680516010687665728210590918443129917529397388349262451678695606731603752769148857401218023280361857721806358789258155731276190319345613326601687452995011353357254836512478568752347228509523527740872902005981444830318043398140280217407715710901575637049046046995419702254608438574132340456408837693739869884378548742188732168814507199065196597356743743311759516755200215152868390799724629848702373020720781350591123870759191756945509958917722116130490212200035877256796730815437828035696083225735434374470030058877714858685608768813287745146350187501567730558456751536918329623319098423777274024557504046444674286835597611174298568016090854865600403003680511633102013496017402051651159274755119405179600168527703276593775816821375208139929924005058420035658271761773778611238927913072500964638991734035188507798130806973246945463438729831818369466353899116145448155609656822628955720973005644706395831058761908410491162549602804532066834027545649848808716744209052785066982164185841727109292652774301022497592088420106468080985439509805855187347648842480065029937786401128436971982890536165492704816144697751666035349
e = 65537
c = 193716471167576102009261617361856322498780398829855279069920250502861105296201963045964083018108072200739208016442951395411239060109879277633880799680796466886814781271407233797032205575732893102486955194430623575971934147092467132545430661638348705239245987734874713486582633239377073900547755774571560033817075516973413719471923384389891787662662451660841536309724560612132069417640779855005673928162779245563233310004133241256377788568720907304810052342887309240414040734216859683324240994466716337608438726691778468771085168242412959020570133689804360794998180805356883251901658442014155579390663327969555867882559872044606744203765000923967889074859937653743621584639067229288851342713329434708634803666882221200332685306191498632991902466967548988106343323657601589545168817027986526972276077635291259874356807227237546954263762399281112528529728308078742916141321142970897653668889951241365080022748801253027509812584674295982923423977390662236065066100484319953048153832376657375372691313969749376611462349588998375466059185579136463411550421293013392103719578287132076302002532788190909147001289366892814376471306713708402149642442310260618744526647829335030450314745937478124473909863363626798697757685899310491198434358658


n_bis = (0x9900 * 2**4080) + (0x15E2E920 * 2**2040) + 0xAD629A0A95
assert n == n_bis

x = var("x")
poly = (0x9900 * x**2) + (0x15E2E920 * x) + 0xAD629A0A95
r1, r2 = poly.factor_list()
p = int(r1[0](x=2**2040))
q = int(r2[0](x=2**2040))
assert p * q == n

d = pow(e, -1, (p - 1) * (q - 1))
print(bytes.fromhex(hex(pow(c, d, n))[2:]))
```

## FCSC 2021

## FCSC 2022

### T-Rex

- Challenge is hosted [here](https://hackropole.fr/fr/challenges/crypto/fcsc2022-crypto-t-rex/)

#### Challenge

```python {linenos=table,filename="T-Rex.py"}
import os
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

class TRex:
    def __init__(self, key):
        N = len(key)
        M = 2 ** (8 * N)
        self.key = key
        self.iv = int.from_bytes(key, "big")
        R = lambda x: ((2 * x + 1) * x)
        for _ in range(31337):
            self.iv = R(self.iv) % M
        self.iv = int.to_bytes(self.iv, N, "big")

    def encrypt(self, data):
        E = AES.new(self.key, AES.MODE_CBC, iv = self.iv)
        return self.iv + E.encrypt(pad(data, 16))

if __name__ == "__main__":
    E = TRex(os.urandom(16))
    flag = open("flag.txt", "rb").read().strip()
    c = E.encrypt(flag)
    print(c.hex())
```

```txt {filename="output.txt"}
070a4a5811dd013c301f30070924528796cb8fe8ddd6d8851f90ab1a8977e9c71accbed0a5936414445739ce76763002fd29337834c8976fef36decdc522a6b93c967c90d0e69e46674d634ba5a9badbd834bad8042515029b6fa833c98da0a7
```

#### Solution

```python {linenos=table}
P.<x> = PolynomialRing(Zmod(2**128))
poly = x

for _ in range(31337):
    poly = 2*poly^2 + poly

poly = poly - P(int.from_bytes(bytes.fromhex("070a4a5811dd013c301f300709245287"), "big"))

print("key: ", hex(int(poly.roots(multiplicities=False)[0]))[2:])
```

Then decode with [CyberChef](https://gchq.github.io/CyberChef/#recipe=AES_Decrypt(%7B'option':'Hex','string':'19c04e7aa9c5c444d92e1b6d35bbdc85'%7D,%7B'option':'Hex','string':'070a4a5811dd013c301f300709245287'%7D,'CBC','Hex','Raw',%7B'option':'Hex','string':''%7D,%7B'option':'Hex','string':''%7D)&input=OTZjYjhmZThkZGQ2ZDg4NTFmOTBhYjFhODk3N2U5YzcxYWNjYmVkMGE1OTM2NDE0NDQ1NzM5Y2U3Njc2MzAwMmZkMjkzMzc4MzRjODk3NmZlZjM2ZGVjZGM1MjJhNmI5M2M5NjdjOTBkMGU2OWU0NjY3NGQ2MzRiYTVhOWJhZGJkODM0YmFkODA0MjUxNTAyOWI2ZmE4MzNjOThkYTBhNw)

## FCSC 2023

## FCSC 2024

## FCSC 2025

### RSA WTF

- Challenge is hosted [here](https://hackropole.fr/fr/challenges/crypto/fcsc2025-crypto-rsa-wtf/)

#### Challenge

```python {linenos=table}
import os
import json
from Crypto.Util.number import GCD, getPrime
from Crypto.Random.random import getrandbits
from Crypto.Cipher import AES
from Crypto.Hash import SHA256
from Crypto.Util.Padding import pad

class RSA_WTF:
    def __init__(self):
        while True:
            try:
                self.k = getrandbits(666)
                self.p = getPrime(512)
                self.q = getPrime(512)
                self.dp = pow(self.k, -1, self.p - 1)
                self.dq = pow(self.k, -1, self.q - 1)
                break
            except:
                pass

    def encrypt(self, m):
        iv = os.urandom(16)
        k = SHA256.new(str(self.k).encode()).digest()
        E  = AES.new(k, AES.MODE_CBC, iv = iv)
        c = E.encrypt(pad(m, 16))
        return (iv.hex(), c.hex(), self.p, self.q, self.dp, self.dq)

flag = open("flag.txt", "rb").read()
assert len(flag) % 8 == 0

out = []
for i in range(0, len(flag), 8):
    bl = flag[i:i + 8]
    out.append(RSA_WTF().encrypt(bl))

print(json.dumps(out, indent = 4))
```

```txt {base_url="https://hackropole.fr/challenges/fcsc2025-crypto-rsa-wtf/public/",filename="output.txt"}
--- SOME CONTENT ---
```

#### Solution

```python {linenos=table}
import json

from Crypto.Cipher import AES
from Crypto.Hash import SHA256
from Crypto.Util.Padding import unpad
from sage.all import *

for e in lol:
    iv, c, p, q, dp, dq = e

    k1 = pow(dp, -1, p - 1)
    k2 = pow(dq, -1, q - 1)
    k = crt([k1, k2], [p - 1, q - 1])

    k = SHA256.new(str(k).encode()).digest()
    E = AES.new(k, AES.MODE_CBC, iv=bytes.fromhex(iv))
    print(unpad(E.decrypt(bytes.fromhex(c)), 16).decode(), end="")
```

## FCSC 2026

## FCSC 2027

> [!caution]
> To be continued ...
