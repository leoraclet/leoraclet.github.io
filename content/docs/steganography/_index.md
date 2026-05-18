---
title: Steganography
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

## Categories

{{< cards cols="2" >}}
  {{< card link="./audio" title="Audio Steganography" >}}
  {{< card link="./image" title="Image Steganography" >}}
  {{< card link="./text" title="Text Steganography" >}}
  {{< card link="./esoteric" title="Esoteric Programming Languages" >}}
{{< /cards >}}


## Tools

| Tool                                                                    | Description                                       |
| ----------------------------------------------------------------------- | ------------------------------------------------- |
| [Exiftool](https://exiftool.org/)                | Reads, edits, and extracts file metadata          |
| [Binwalk](https://github.com/ReFirmLabs/binwalk) | Analyzes and extracts embedded firmware/file data |
| [ImHex](https://github.com/WerWolv/ImHex)        | Advanced hex editor for reverse engineering       |
| [HexEdit](https://hexed.it/)                     | Browser-based hexadecimal file editor             |

## Nix - Flake environment

```nix {linenos=table,filename="flake.nix"}
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
            inspectrum
            gnuradio
            urh
            outguess
            pngcheck
          ];
        };
      }
    );
}
```

## Resources
