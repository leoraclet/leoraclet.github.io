---
title: Cryptography Notes
linkTitle: Cryptography
resources:
- params:
    icon: pdf
tags:
- cybersecurity
- cryptography
- rsa
- ecc
- rng
- elgamal
- dhke
- public-key
- symetric
- zkp
- signature
- math
- ceasar
- vigenere
- otp
---

{{< hextra/hero-subtitle >}}
All there is to know about cryptography / cryptanalysis
{{< /hextra/hero-subtitle >}}

Here you'll find all my notes related to cryptography and cryptanalysis in the context of cybersecurity and CTF challenges. I will cover algorithms, crypto-systems, and, more importantly, attacks against them in many different scenarios.

## Tools

Here are the more general tools I always use and recommend when starting to do things about cryptography :

- [**Python**](https://www.python.org/) - Programming language with packages
  - [gmpy2](https://gmpy-skirpichev.readthedocs.io/en/latest/)
  - [sympy](https://docs.sympy.org/latest/index.html)
  - [cryptography](https://cryptography.io/en/latest/)
  - [pycryptodome](https://pycryptodome.readthedocs.io/en/latest/)
  - [pwntools](https://docs.pwntools.com/en/stable/index.html)
  - [z3-solver](https://github.com/Z3Prover/z3)
  - [Scipy](https://scipy.org/)
  - [Numpy](https://numpy.org/)
- [**SageMath**](https://www.sagemath.org/) - Free open-source mathematics software system.
- [**fplll**](https://github.com/fplll/fplll) - Lattice algorithms using floating-point arithmetic.
- [**Pari/GP**](https://pari.math.u-bordeaux.fr/) - Computer algebra system designed for fast computations in number theory.
- [**Magma**](https://magma.maths.usyd.edu.au/magma/) - Computational Algebra System.
- [**flatter**](https://github.com/keeganryan/flatter) - Fast lattice reduction.
- [**msolve**](github.com/algebraic-solving/msolve) - Library for Polynomial System Solving through Algebraic Methods.

**Online**

- [**Boxentriq**](https://www.boxentriq.com/analysis/cipher-identifier) - Cipher Identifier.
- [**CyberChef**](https://gchq.github.io/CyberChef/) - The Cyber Swiss Army Knife.

## Flake Environment

If you're using the [Nix package manager](https://nixos.org/download/#download-nix), here is a starter template that I currently use for crypto challenges during CTF competitions. It comes with all the tools mentioned above for a good out-of-the-box experience.

You can find other packages to install on the [Nix package repository](https://search.nixos.org/packages?query=).

```nix {linenos=table,filename="flake.nix"}
{
  description = "Crypto Environment";
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
            python313Packages.numpy
            python313Packages.galois
            python313Packages.scipy
            python313Packages.gmpy2
            python313Packages.pwntools
            python313Packages.sympy
            python313Packages.pycryptodome
            python313Packages.z3-solver
            python313Packages.cryptography
            python313Packages.cypari
            python313Packages.mpmath
            python313Packages.fpylll
            flatter
            msolve
            magma
            pari
            fplll
            sage
          ];
        };
      }
    );
}
```

## Resources

- [bi0s Wiki - Cryptography](https://teambi0s.gitlab.io/bi0s-wiki/crypto/roadmap/)
- [HackTricks - Crypto](https://hacktricks.wiki/en/crypto/index.html)
- [CryptoHack – Courses](https://cryptohack.org/courses/)
- [GitHub - Tools-for-Cryptanalysis](https://github.com/Deadlyelder/Tools-for-Cryptanalysis)
