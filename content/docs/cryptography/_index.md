---
title: Cryptography
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

| Tool                                                                                      | Description                                                                         |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [Python](https://www.python.org/)                                  | General-purpose programming language with extensive scientific and crypto libraries |
| └── [gmpy2](https://gmpy-skirpichev.readthedocs.io/en/latest/)     | Fast multiple-precision arithmetic library for number theory                        |
| └── [sympy](https://docs.sympy.org/latest/index.html)              | Symbolic mathematics library for algebra and calculus                               |
| └── [cryptography](https://cryptography.io/en/latest/)             | Secure cryptographic primitives and recipes                                         |
| └── [pycryptodome](https://pycryptodome.readthedocs.io/en/latest/) | Self-contained cryptographic library for Python                                     |
| └── [pwntools](https://docs.pwntools.com/en/stable/index.html)     | CTF and exploit development framework                                               |
| └── [z3-solver](https://github.com/Z3Prover/z3)                    | SMT solver for symbolic reasoning and constraint solving                            |
| └── [SciPy](https://scipy.org/)                                    | Scientific computing library for optimization and numerical methods                 |
| └── [NumPy](https://numpy.org/)                                    | Core numerical computing library for arrays and linear algebra                      |
| [SageMath](https://www.sagemath.org/)                              | Open-source mathematics system for algebra, number theory, and cryptography         |
| [fplll](https://github.com/fplll/fplll)                            | Lattice reduction algorithms using floating-point methods                           |
| [Pari/GP](https://pari.math.u-bordeaux.fr/)                        | Fast computer algebra system for number theory computations                         |
| [Magma](https://magma.maths.usyd.edu.au/magma/)                    | Computational algebra system for advanced mathematical research                     |
| [flatter](https://github.com/keeganryan/flatter)                   | High-performance lattice reduction tool                                             |
| [msolve](https://github.com/algebraic-solving/msolve)              | Solver for polynomial systems using algebraic methods                               |

### Online

| Tool                                                                                     | Description                                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [Boxentriq](https://www.boxentriq.com/analysis/cipher-identifier) | Online cipher identifier and automated cryptanalysis helper      |
| [CyberChef](https://gchq.github.io/CyberChef/)                    | Web-based data analysis and encoding/decoding “Swiss Army knife” |

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
