---
title: Reverse Engineering (RE)
linkTitle: Reverse Engineering
tags:
- cybersecurity
- re
- reverse-engineering
- reverse
- android
- windows
- linux
- elf
- pe
# sidebar:
#   exclude: true
---

## Tools

- [Angr](https://angr.io/) - Open-source binary analysis platform for Python
- [Triton](https://github.com/JonathanSalwan/Triton/) - A dynamic binary analysis library

### Command line

- [ltrace](https://www.man7.org/linux/man-pages/man1/ltrace.1.html)
- [strace](https://www.man7.org/linux/man-pages/man1/strace.1.html)
- [ptrace](https://www.man7.org/linux/man-pages/man2/ptrace.2.html)
- [file](https://www.man7.org/linux/man-pages/man1/file.1.html)
- [strings](https://www.man7.org/linux/man-pages/man1/strings.1.html)
- [readelf](https://www.man7.org/linux/man-pages/man1/readelf.1.html)
- [objdump](https://www.man7.org/linux/man-pages/man1/objdump.1.html)

### Detection

- [Detech It Easy](https://github.com/horsicq/Detect-It-Easy)

### Disassemblers

- [Ghidra](http://ghidra.net/)
- [IDA](https://hex-rays.com/ida-free/)
- [Binary Ninja](https://binary.ninja/)
- [Radare2](https://github.com/radareorg/radare2)

### Online

- [Compiler Explorer](https://godbolt.org/) - Online Multiple Compilers
- [Decompiler Explorer](https://dogbolt.org/) - Online Multiple Decompilers
- [CPUlator](https://cpulator.01xz.net/) - Computer System Simulator

## Nix - Flake environment

```nix {linenos=table,filename="flake.nix"}
{
  description = "Reverse Environment";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            ropgadget
            python313Packages.pwntools
            python313Packages.ropper
            python313Packages.z3-solver
            python313Packages.frida-python
            jadx
            frida-tools
            python313Packages.unicorn-angr
            python313Packages.unicorn
            python313Packages.capstone
            capstone
            unicorn
            unicorn-angr
            python313Packages.qiling
            gdb
            imhex
            ida-free
            ghidra
            ghidra-bin
            binaryninja-free
            python313Packages.pyhidra
            gef
            qemu
            qemu-utils
            qemu-user
            python313Packages.angr
            python313Packages.miasm
          ];
        };
      }
    );
}
```

## Resources

- [Max Kersten: Binary Analysis Course](https://maxkersten.nl/binary-analysis-course/)
