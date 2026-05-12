---
title: Forensics
# sidebar:
#   exclude: true
---

## Tools

- [Scalpel](https://github.com/sleuthkit/scalpel) (Not maintained)

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
