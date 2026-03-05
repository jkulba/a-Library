---
title: Building Your First App
description: A hands-on tutorial for building your first app with the a-Library ecosystem.
draft: false
---

# Building Your First App

In this tutorial you will build a simple documentation app from scratch using a-Library.

## What You'll Build

By the end of this tutorial you will have:

- A running Astro Starlight documentation site
- Several content pages organized into categories
- Full-text search powered by Pagefind

## Step 1 – Create a New Project

Start by cloning a-Library or creating a new Astro Starlight project:

```bash
npm create astro@latest my-docs -- --template starlight
cd my-docs
npm install
```

## Step 2 – Explore the Project Structure

```
my-docs/
├── astro.config.mjs      # Astro & Starlight configuration
├── package.json
├── tsconfig.json
└── src/
    └── content/
        └── docs/         # All your documentation pages go here
            └── index.mdx # Homepage
```

## Step 3 – Add Your First Page

Create a new Markdown file at `src/content/docs/guides/my-first-page.md`:

```md
---
title: My First Page
description: This is my first documentation page.
---

# My First Page

Hello, world! This is my first documentation page.

## A Section

Here is some content with a **code snippet**:

```js
console.log('Hello from a-Library!');
```
```

## Step 4 – Add to the Sidebar

Update `astro.config.mjs` to include your new page in the sidebar:

```js
sidebar: [
  {
    label: 'Guides',
    items: [
      { label: 'My First Page', slug: 'guides/my-first-page' },
    ],
  },
]
```

## Step 5 – Start the Dev Server

```bash
npm run dev
```

Visit `http://localhost:4321` to see your site. Your new page will appear in the sidebar.

## Step 6 – Build for Production

```bash
npm run build
```

This command:
1. Compiles your Astro pages to static HTML.
2. Runs **Pagefind** to crawl the built site and generate a full-text search index.

## Step 7 – Test Search

After building, preview your site:

```bash
npm run preview
```

Click the **Search** box (or press <kbd>/</kbd>) and type a word from your page. Your content will appear in the search results!

## Next Steps

- Read the [Configuration Reference](/reference/configuration/) to customize your site.
- Learn about [Working with Data](/tutorials/working-with-data/) to add dynamic content.
- Explore the [API Reference](/reference/api/) for programmatic access.
