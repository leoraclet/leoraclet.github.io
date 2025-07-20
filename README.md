<div align="center"><img src="./public/favicon/android-chrome-192x192.png"></div>
<br>
<h1 align="center">Portfolio</h1>

<div align="center">

![license](https://img.shields.io/github/license/leoraclet/leoraclet.github.io)
![language](https://img.shields.io/github/languages/top/leoraclet/leoraclet.github.io)
![lastcommit](https://img.shields.io/github/last-commit/leoraclet/leoraclet.github.io) <br>
![Language](https://img.shields.io/badge/Language-JSX-1d50de)
![Libraries](https://img.shields.io/badge/Framework-Astro-fa8925)
![Size](https://img.shields.io/badge/Size-69Mo-f12222) ![Open
Source](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)

</div>

## Table of Contents
- [Table of Contents](#table-of-contents)
- [🌟 Showcase](#-showcase)
- [❤️ Thanks](#️-thanks)
- [📖 About](#-about)
- [📦 Structure](#-structure)
- [📚 Libraries](#-libraries)
- [🚀 Install \& Run](#-install--run)
- [📜 License](#-license)



## 🌟 Showcase

![screenshot](./public/portfolio.png)

## ❤️ Thanks

A big thank to [**CWorId**](https://github.com/cworld1) for his beautiful [**Astro
template**](https://github.com/cworld1/astro-theme-pure) that I took time to configure and customise
to my needs.

**You can go check out his work !**

## 📖 About

This repository hosts the source code for my [Portfolio](https://leoraclet.github.io/).

## 📦 Structure

**Directories**

- [**`src`**](./src/) – Main source directory
  - [**`assets`**](./src/assets/) – Contains images, icons, and other static assets
  - [**`components`**](./src/components/) – Reusable custom components
  - [**`content`**](./src/content/) – Blog posts written in Markdown
  - [**`layout`**](./src/layouts/) – Reusable layout components for content pages
  - [**`pages`**](./src/pages/) – Defines the structure and routing of site pages
  - [**`plugins`**](./src/plugins/) – Lightweight enhancements for blog content


**Files**
 - [**deploy.yml**](./.github/workflows/deploy.yml) - Automatic worflow to deploy on Github pages
   when Push.

## 📚 Libraries

> [!NOTE]
>
> Those are only the main libraries, but you can find the rest in [`packages.json`](./package.json)

- [**Astro**](https://astro.build/) - The web framework for content-driven websites
- [**Astro-pure**]() - Astro portfolio template

## 🚀 Install & Run

First, ensure you have [**bun**](https://bun.com/) installed on your system.

Then, clone the repo

```bash
git clone https://github.com/leoraclet/leoraclet.github.io
cd leoraclet.github.io
```

Install dependencies

```bash
bun install
```

And now you can run the developement server using

```bash
bun run dev
```

You can also build and preview the production server using

```bash
bun run build
bun run preview
```

## 📜 License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.