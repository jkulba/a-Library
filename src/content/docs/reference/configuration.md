---
title: Configuration
description: Configure a-Library to meet your needs.
draft: false
---

# Configuration

a-Library is configured via `astro.config.mjs` at the root of the project.

## Astro Starlight Options

The following options are available inside the `starlight()` integration call.

### `title` (required)

The name of your library site. Displayed in the header and browser tab.

```js
starlight({ title: 'a-Library' })
```

### `description`

A short description of your library, used for SEO meta tags.

```js
starlight({ description: 'Technical Documentation Library' })
```

### `sidebar`

An array of navigation items for the left sidebar. Supports nested groups.

```js
sidebar: [
  {
    label: 'Getting Started',
    items: [
      { label: 'Introduction', slug: 'guides/introduction' },
      { label: 'Quick Start', slug: 'guides/quick-start' },
    ],
  },
]
```

### `social`

Links to social/external profiles shown in the header.

```js
social: [
  {
    icon: 'github',
    label: 'GitHub',
    href: 'https://github.com/your-org/your-repo',
  },
]
```

### `search`

Starlight uses [Pagefind](https://pagefind.app/) for search by default. No additional configuration is required.

To disable search:

```js
starlight({ pagefind: false })
```

To use Algolia DocSearch instead:

```js
import starlightDocSearch from '@astrojs/starlight-docsearch';

starlight({
  plugins: [
    starlightDocSearch({
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'YOUR_INDEX_NAME',
    }),
  ],
})
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PUBLIC_SITE_URL` | The public URL of the deployed site (used for sitemap generation). |

## Content Configuration

All documentation pages live in `src/content/docs/`. Each file must have a frontmatter block with at minimum a `title` field:

```md
---
title: My Page Title
description: Optional page description for SEO.
---
```

### Supported Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | ✅ | Page title. |
| `description` | `string` | | Short description for SEO. |
| `sidebar.label` | `string` | | Override the label shown in the sidebar. |
| `sidebar.order` | `number` | | Sort order within the sidebar group. |
| `head` | `HeadConfig[]` | | Additional HTML `<head>` elements. |
| `tableOfContents` | `false \| object` | | Customize or disable the table of contents. |
| `draft` | `boolean` | | If `true`, the page is excluded from production builds. |
