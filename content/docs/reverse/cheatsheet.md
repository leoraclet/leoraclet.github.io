---
title: Cheatsheet
---

## Steps

{{% steps %}}

### Identify file & purpose

```sh
file YOUR_BINARY
```

```sh
strings YOUR_BINARY
```

### Loading an ELF binary

```sh
[root@host]: ps axc | fgrep the-binary
987 ? S 0:00 the-binary

[root@host]: cat /proc/987/maps
# The text (code) section is mapped at 0x08048000
08048000-0806d000 r-xp 00000000 16:06 598925
/home/slide/src/rev-challenge/reverse/the-binary
# The data section is mapped at 0x0806d000
0806d000-0807a000 rw-p 00024000 16:06 598925
/home/slide/src/rev-challenge/reverse/the-binary
# The uninitialised data segment .bss is allocated at 0x0807a00
0807a000-0807f000 rwxp 00000000 00:00 0
# The stack is allocated at 0xbfffa000
bfffa000-c0000000 rwxp ffffb000 00:00 0
```

### Tracing a running program

```sh
[root@host] strace -fxi ./YOUR_BINARY
[????????] execve("./the-binary", ["./the-binary"], [/* 21 vars
[080480b6] personality(PER_LINUX) = 0
[08057216] geteuid() = 500
[08057562] _exit(-1) = ?
```

#### Discovering open files

```sh
[root@host]$ lsof -p 987
COMMAND PID USER FD TYPE DEVICE SIZE NODE NAME
the-binar 972 root cwd DIR 22,6 4096 2 /
the-binar 972 root rtd DIR 22,6 4096 2 /
the-binar 972 root txt REG 22,6 205108 598925
/home/slide/src/rev-challenge/reverse/the-bin
the-binar 972 root 0u raw 5345
00000000:000B->00000000:0000 st=07
```

#### Discovering network sockets

```sh
[root@host]$ netstat -ln --protocol=inet
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address Foreign Address
tcp 0 0 0.0.0.0:6000 0.0.0.0:*
tcp 0 0 0.0.0.0:22 0.0.0.0:*
```

{{% /steps %}}
