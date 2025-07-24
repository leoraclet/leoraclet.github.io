<div align="center">
  <img src="./public/favicon/android-chrome-192x192.png">
</div>
<br>
<h1 align="center">Portfolio</h1>
<div align="center">

  ![License](https://img.shields.io/github/license/leoraclet/leoraclet.github.io)
  ![Top Language](https://img.shields.io/github/languages/top/leoraclet/leoraclet.github.io)
  ![Last Commit](https://img.shields.io/github/last-commit/leoraclet/leoraclet.github.io)
  <br>
  ![Language](https://img.shields.io/badge/Language-JSX-1d50de)
  ![Framework](https://img.shields.io/badge/Framework-Astro-fa8925)
  ![Size](https://img.shields.io/badge/Size-69Mo-f12222)
  ![Open Source](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)

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
![Screenshot of the Portfolio](./public/portfolio.png)

## ❤️ Thanks

A special thank you to [**CWorId**](https://github.com/cworld1) for his stunning [**Astro template**](https://github.com/cworld1/astro-theme-pure), which I took the time to configure and customize to suit my needs. Be sure to check out his work !

## 📖 About

This repository contains the source code for my [Portfolio](https://leoraclet.github.io/).

> [!IMPORTANT]
>
> I have reimplemented several core components of **Astro Pure** to address the impacts on multiple components when enabling client-side routing.


## 📦 Structure

**Directories**

- [**`src`**](./src/): Primary directory containing the source code
  - [**`assets`**](./src/assets/): Houses images, icons, and other static resources
  - [**`components`**](./src/components/): Collection of reusable custom components
  - [**`content`**](./src/content/): Contains blog posts authored in Markdown
  - [**`layout`**](./src/layouts/): Directory for reusable layout components used across content pages
  - [**`pages`**](./src/pages/): Establishes the structure and routing for site pages
  - [**`plugins`**](./src/plugins/): Includes lightweight enhancements for blog content

**Files**

- [**`deploy.yml`**](./.github/workflows/deploy.yml): Automated workflow for deploying to GitHub Pages upon push.
- [**`LICENSE`**](./LICENSE): Contains the licensing information for the project.
- [**`README.md`**](./README.md): Offers an overview and detailed documentation of the project.
- [**`astro.config.mjs`**](./astro.config.mjs): Configuration settings for the Astro framework.
- [**`bun.lock`**](./bun.lock): Bun lockfile that maintains consistent dependency versions.
- [**`eslint.config.mjs`**](./eslint.config.mjs): Configuration settings for ESLint, the tool used for linting.
- [**`package.json`**](./package.json): Holds project metadata and lists dependencies.
- [**`prettier.config.mjs`**](./prettier.config.mjs): Configuration settings for Prettier, the code formatting tool.
- [**`tsconfig.json`**](./tsconfig.json): Configuration settings for TypeScript.
- [**`uno.config.ts`**](./uno.config.ts): Configuration settings for UnoCSS.
- [**`.gitignore`**](./.gitignore): Lists files and directories to be ignored by Git.
- [**`.prettierignore`**](./.prettierignore): Specifies files to be ignored by Prettier during formatting.


## 📚 Libraries
> [!NOTE]
> These are only the main libraries; you can find the rest of the dependencies in [`package.json`](./package.json).

- [**Astro**](https://astro.build/): The web framework for content-driven websites.
- [**Astro-pure**](https://github.com/cworld1/astro-theme-pure): Astro portfolio template.

## 🚀 Install & Run

First, ensure you have [**bun**](https://bun.com/) installed on your system. Then, clone the repository:

```bash
git clone https://github.com/leoraclet/leoraclet.github.io
cd leoraclet.github.io
```

Install dependencies

```bash
bun install
```

You can now run the development server using:

```bash
bun run dev
```

You can also build and preview the production server using:

```bash
bun run build
bun run preview
```

## 📜 License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.