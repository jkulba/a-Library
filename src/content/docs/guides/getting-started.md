---
title: Getting Started
description: A guide to get started with a-Library documentation.
draft: false
---

## Welcome

Welcome to the **a-Library** technical documentation site. This site is built using [AstroJS Starlight](https://starlight.astro.build/), a full-featured documentation framework powered by Astro.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v7 or higher)

## Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/jkulba/a-Library.git
   cd a-Library
   ```

2. **Checkout the develop branch**

   ```bash
   git checkout develop
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:4321`.

## Branching Strategy

This project uses a two-branch workflow:

- **`develop`** — The primary branch for editing and contributions. All changes should be made here.
- **`main`** — The deployment branch. Merging into `main` triggers an automatic deployment to GitHub Pages.

## Adding Documentation

To add new documentation pages:

1. Create a new `.md` or `.mdx` file in the `src/content/docs/` directory.
2. Add frontmatter with at least a `title` and `description`.
3. Write your content in Markdown.

```markdown
---
title: My New Page
description: Description of my new page.
---

## Content

Your content goes here.
```

## Deployment

The site is automatically deployed to [GitHub Pages](https://jkulba.github.io/a-Library/) whenever changes are pushed to the `main` branch.
