---
title: Pwntools
---

## Templates

```python {linenos=table,filename="pwntools_template.py"}
#!/usr/bin/env python3
from pwn import *
import sys

# ============================================================
# setup
# ============================================================
BINARY = './chall'
LIBC   = ''  # e.g. './libc.so.6'
HOST   = ''
PORT   = 0
USER   = ''  # user
PASS   = ''  # password

# Manual context
context.arch    = 'amd64'
context.os      = 'linux'
context.log_level = 'debug'
context.terminal  = ['tmux', 'splitw', '-h']

# Automatic context
elf  = context.binary = ELF(BINARY)
libc = ELF(LIBC) if LIBC else None

# ============================================================
# connection
# ============================================================
def conn():
    if args.REMOTE:
        return remote(HOST, PORT, USER)
    elif args.SSH:
        s = ssh(
            host=HOST,
            port=PORT,
            user=USER,
            password=PASS
        )
        return s.process(['env', '-', BINARY])
    elif args.GDB:
        return gdb.debug(['stdbuf', '-o0', BINARY], gdbscript=GDB_SCRIPT)
    else:
        return process(['stdbuf', '-o0', BINARY])

GDB_SCRIPT = '''
set pagination off
unset env COLUMNS
unset env LINES
b *main
c
'''

# ============================================================
# exploit
# ============================================================
def exploit():

    # ============================================================
    # utils
    # ============================================================
    def trecv(v, show=False):
        if isinstance(v, str):
            io = v.encode()
        else:
            io = v
        z = r.recvuntil(io)
        if show:
            print(z.decode())

    def prompt(v, line=True):
        if isinstance(v, str):
            io = v.encode()
        else:
            io = v

        if line:
            r.sendline(io)
        else:
            r.send(io)
    # ============================================================
    # ============================================================
    p = conn()

    # --- exploit goes steps goes here く ---

    p.interactive()

if __name__ == '__main__':
    exploit()
```

## Cheat sheets

- [Pwntools Tricks and Examples | Agr0 Hacks Stuff](https://agrohacksstuff.io/posts/pwntools-tricks-and-examples/)
- [Mastering pwntools | nyxFault](https://nyxfault.github.io/posts/Mastering-Pwntools/#7-memory-leaks-and-format-string-exploits)

**GitHub**

- [Tutorials for getting started with Pwntools](https://github.com/Gallopsled/pwntools-tutorial)
- [pwntools-cheatsheet.md · GitHub](https://gist.github.com/anvbis/64907e4f90974c4bdd930baeb705dedf)

## Resources

- [pwntools documentation](https://docs.pwntools.com/en/stable/index.html)
