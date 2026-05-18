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

| Tool                                                                       | Description                                                 |
| -------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Angr](https://angr.io/)                            | Python framework for symbolic execution and binary analysis |
| [Triton](https://github.com/JonathanSalwan/Triton/) | Dynamic binary analysis and symbolic execution library      |
| [Qu1cksc0pe](https://github.com/CYB3RMX/Qu1cksc0pe) | All-in-one malware analysis and threat inspection tool      | 

### Command line

| Tool                                                                                       | Description                                        |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| [ltrace](https://www.man7.org/linux/man-pages/man1/ltrace.1.html)   | Traces library calls made by a program             |
| [strace](https://www.man7.org/linux/man-pages/man1/strace.1.html)   | Monitors system calls and signals                  |
| [ptrace](https://www.man7.org/linux/man-pages/man2/ptrace.2.html)   | Linux syscall interface for debugging processes    |
| [file](https://www.man7.org/linux/man-pages/man1/file.1.html)       | Identifies file types from signatures and metadata |
| [strings](https://www.man7.org/linux/man-pages/man1/strings.1.html) | Extracts printable text strings from binaries      |
| [readelf](https://www.man7.org/linux/man-pages/man1/readelf.1.html) | Displays ELF binary structure and metadata         |
| [objdump](https://www.man7.org/linux/man-pages/man1/objdump.1.html) | Disassembles and inspects binary object files      |

### Disassemblers

| Tool                                                                   | Description                                                 |
| ---------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Ghidra](http://ghidra.net/)                    | Open-source reverse engineering and decompiler suite        |
| [IDA](https://hex-rays.com/ida-free/)           | Interactive disassembler and reverse engineering tool       |
| [Binary Ninja](https://binary.ninja/)           | Reverse engineering platform with modern analysis UI        |
| [Radare2](https://github.com/radareorg/radare2) | Command-line framework for binary analysis and exploitation |

### Online

| Tool                                                               | Description                                              |
| ------------------------------------------------------------------ | -------------------------------------------------------- |
| [Compiler Explorer](https://godbolt.org/)   | Online compiler explorer with assembly output comparison |
| [Decompiler Explorer](https://dogbolt.org/) | Online platform comparing multiple decompilers           |
| [CPUlator](https://cpulator.01xz.net/)      | Browser-based CPU and computer system simulator          |

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
