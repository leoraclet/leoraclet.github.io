---
title: Steganography Notes
linkTitle: Steganography
tags:
- cybersecurity
- steganography
- steganalysis
- audio
- video
- text
- image
- zsteg
- steg-solve
- lsb
- edm
---

{{< hextra/hero-subtitle >}}
All there is to know about steganography / steganalysis
{{< /hextra/hero-subtitle >}}

## Tools

- [Exfitool](https://exiftool.org/)
- [Binwalk](https://github.com/ReFirmLabs/binwalk)
- [ImHex](https://github.com/WerWolv/ImHex)

**Online**

- [HexEdit](https://hexed.it/)

## Nix - Flake environment

```nix
{
  description = "Stego Environment";
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
            python313Packages.opencv4Full
            binwalk
            audacity
            sonic-visualiser
            mediainfo
            exiftool
            imhex
            steghide
            stegseek
            stegsolve
            zsteg
            outguess
          ];
        };
      }
    );
}
```

## Resources
