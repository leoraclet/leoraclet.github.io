---
title: Forensics
# sidebar:
#   exclude: true
---

## Tools

| Tool                                                                                 | Description                                                 |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| [xxd](https://linux.die.net/man/1/xxd)                        | Converts binary files to hex dump and vice versa            |
| [dd](https://man7.org/linux/man-pages/man1/dd.1.html)         | Low-level utility for copying and converting data           |
| [grep](https://www.man7.org/linux/man-pages/man1/grep.1.html) | Searches text using regular expressions in files or streams |

## Nix - Flake environment

```nix {linenos=table,filename="flake;Nix"}
{
  description = "Forensic Environment";
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
            python313Packages.impacket
            python313Packages.pyshark
            foremost
            networkminer
            scalpel
            volatility3
            volatility2-bin
            veracrypt
            sleuthkit
            bulk_extractor
            firefox_decrypt
            dive
            autopsy
            testdisk
            testdisk-qt
            wireshark
            tshark
          ];
        };
      }
    );
}
```

## Resources

- [CTF Field Guide - Forensics](https://trailofbits.github.io/ctf/forensics/)
