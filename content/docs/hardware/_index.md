---
title: Hardware
# sidebar:
#   exclude: true
---

## Tools

- [Radio tools](./radio#tools)

## Nix - Flake environment

```nix {linenos=table,filename="flake.nix"}
{
  description = "Hardware Environment";
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
            binwalk
            sigdigger
            qemu
            qemu-utils
            qemu-user
            gdb
            imhex
            pulseview
            sigrok-cli
            libsigrok
            libsigrokdecode
            saleae-logic
            saleae-logic-2
            python313Packages.sigrok
            smuview
            gnuradio
            inspectrum
            urh
          ];
        };
      }
    );
}
```

## Resources

- [Embedded Hardware CTF - YouTube](https://www.youtube.com/watch?v=u_U6F2Kkbb0&list=PLhixgUqwRTjwNaT40TqIIagv3b4_bfB7M)
