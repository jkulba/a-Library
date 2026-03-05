---
title: Quick Start
description: Get up and running with a-Library in just a few minutes.
draft: false
---

# Quick Start

This guide will help you get started with a-Library as quickly as possible.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18 or higher
- **npm** v9 or higher (or pnpm / yarn)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/jkulba/a-Library.git
cd a-Library
npm install
```

## Running Locally

Start the development server:

```bash
npm run dev
```

Open your browser at `http://localhost:4321` to see the library.

## Building for Production

```bash
npm run build
```

The production-ready static site will be generated in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Using Search

The library includes full-text search powered by [Pagefind](https://pagefind.app/), a best-of-breed static site search engine.

To search:

1. Click the **Search** box in the top navigation bar, or
2. Press <kbd>/</kbd> or <kbd>Ctrl+K</kbd> from anywhere on the site.

Start typing and results will appear instantly, with highlighted excerpts to help you find the right page.

## Next Steps

- Read the [Introduction](/guides/introduction/) to understand a-Library's structure.
- Explore the [API Reference](/reference/api/) for detailed technical documentation.
- Follow the [Building Your First App](/tutorials/first-app/) tutorial for a hands-on walkthrough.
