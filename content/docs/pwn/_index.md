---
title: Binary Exploitation (Pwn)
linkTitle: Binary Exploitation
# sidebar:
#   exclude: true
---

## Environment

### Tools

| Tool                                                              | Description                                                                      |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [PEDA](https://github.com/longld/peda)     | GDB enhancement plugin for exploit development and debugging assistance          |
| [pwndbg](https://github.com/pwndbg/pwndbg) | GDB/LLDB plugin that improves debugging for reverse engineering and exploitation |

### Docker

```Dockerfile {linenos=table,filename="Dockerfile"}
# ===================================================== #
# TAKEN FROM
# https://github.com/LiveOverflow/pwn_docker_example
# ===================================================== #

# docker build -t ctf:ubuntu19.10 .
# If using Windows
      # docker run --rm -v %cd%:/pwd --cap-add=SYS_PTRACE --security-opt seccomp=unconfined -d --name ctf -i ctf:ubuntu19.10
# If using Linux
      # docker run --rm -v $PWD:/pwd --cap-add=SYS_PTRACE --security-opt seccomp=unconfined -d --name ctf -i ctf:ubuntu19.10
# docker exec -it ctf /bin/bash

FROM ubuntu:19.10
ENV LC_CTYPE C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive
RUN dpkg --add-architecture i386 && \
apt-get update && \
apt-get install -y build-essential jq strace ltrace curl wget rubygems gcc dnsutils netcat gcc-multilib net-tools vim gdb gdb-multiarch python python3 python3-pip python3-dev libssl-dev libffi-dev wget git make procps libpcre3-dev libdb-dev libxt-dev libxaw7-dev python-pip libc6:i386 libncurses5:i386 libstdc++6:i386 && \
pip install capstone requests pwntools r2pipe && \
pip3 install pwntools keystone-engine unicorn capstone ropper && \
mkdir tools && cd tools && \
git clone https://github.com/JonathanSalwan/ROPgadget && \
git clone https://github.com/radare/radare2 && cd radare2 && sys/install.sh && \
cd .. && git clone https://github.com/pwndbg/pwndbg && cd pwndbg && git checkout stable && ./setup.sh && \
cd .. && git clone https://github.com/niklasb/libc-database && cd libc-database && ./get && \
gem install one_gadget
```

### Nix - Flake

```nix {linenos=table,filename="flake.nix"}
{
  description = "Pwn Environment";
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
            python313Packages.unicorn-angr
            python313Packages.unicorn
            python313Packages.capstone
            python313Packages.qiling
            python313Packages.pyhidra
            python313Packages.angr
            python313Packages.miasm
            jadx
            frida-tools
            capstone
            unicorn
            unicorn-angr
            gdb
            imhex
            ida-free
            ghidra
            ghidra-bin
            binaryninja-free
            gef
            qemu
            qemu-utils
            qemu-user
          ];
        };
      }
    );
}
```

## Resources

- [Binary Exploitation \| Red Team Notes](https://www.ired.team/offensive-security/code-injection-process-injection/binary-exploitation)
- [Modern Binary Exploitation](https://web.archive.org/web/20210728075118/https://security.cs.rpi.edu/courses/binexp-spring2015/)
- [Nightmare - Nightmare](https://guyinatuxedo.github.io/)

### Shellcodes

- [Shell Storm](https://jonathansalwan.github.io/shellcode/index.html)
- [shellcode](https://github.com/7feilee/shellcode)

### Reverse shell

- [Reverse Shell Generator](https://www.revshells.com/)

### Syscalls

- [syscall tables](https://syscalls.w3challs.com/)

### Tutorials

- [Introduction \| Cybersecurity Notes](https://ir0nstone.gitbook.io/notes/binexp/stack/introduction)
- [How do I even pwn anything? Part 1 — The Stack Frame](https://platypew.medium.com/how-do-i-even-pwn-anything-part-1-the-stack-frame-7cd7d4c7f506)
