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

## Categories

{{< cards >}}
  {{< card link="./audio" title="Audio Steganography" >}}
  {{< card link="./image" title="Image Steganography" >}}
  {{< card link="./text" title="Text Steganography" >}}
{{< /cards >}}


## Tools

- [Exiftool](https://exiftool.org/)
- [Binwalk](https://github.com/ReFirmLabs/binwalk)
- [ImHex](https://github.com/WerWolv/ImHex)

**Online**

- [HexEdit](https://hexed.it/)

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
