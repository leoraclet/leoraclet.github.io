---
title: Reverse Engineering
# sidebar:
#   exclude: true
---

## Tools

### Command line

- [ltrace](https://www.man7.org/linux/man-pages/man1/ltrace.1.html)
- [strace](https://www.man7.org/linux/man-pages/man1/strace.1.html)
- [readelf](https://www.man7.org/linux/man-pages/man1/readelf.1.html)
- [objdump](https://www.man7.org/linux/man-pages/man1/objdump.1.html)

### Detection

- [Detech It Easy](https://github.com/horsicq/Detect-It-Easy)

### Disassemblers

- [Ghidra](http://ghidra.net/)
  - [FindCrypt](https://github.com/TorgoTorgo/ghidra-findcrypt)
- [IDA](https://hex-rays.com/ida-free/)
  - [golang loader assist](https://github.com/strazzere/golang_loader_assist)
  - [AlphaGolang](https://github.com/SentineLabs/AlphaGolang)
- [Binary Ninja](https://binary.ninja/)
- [Radare2](https://github.com/radareorg/radare2)
- [Shell Storm](https://shell-storm.org/online/)
- [dnSpy](https://github.com/dnSpy/dnSpy)
- [ILSpy](https://github.com/icsharpcode/ILSpy)

### Debuggers

- [GDB](https://www.sourceware.org/gdb/)
- [GEF](https://github.com/hugsy/gef)
- [HyperDbg](https://github.com/HyperDbg/HyperDbg)
- [x64dbg](https://github.com/x64dbg/x64dbg)

### Games

- [Cheat Engine](https://github.com/cheat-engine/cheat-engine)

**Unity**

- [Il2CppDumper](https://github.com/Perfare/Il2CppDumper)

**Godot**

- [GDSDecomp](https://github.com/GDRETools/gdsdecomp)

## Nix - Flake environment

```nix
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
