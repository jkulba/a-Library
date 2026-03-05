---
title: API Reference
description: Complete API reference for a-Library.
draft: false
---

# API Reference

This page provides a complete reference for the a-Library API.

## Core Modules

### `LibraryClient`

The main entry point for interacting with a-Library programmatically.

```typescript
import { LibraryClient } from 'a-library';

const client = new LibraryClient({
  baseUrl: 'https://your-library.example.com',
});
```

#### Constructor Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseUrl` | `string` | `'/'` | The base URL of your library site. |
| `timeout` | `number` | `5000` | Request timeout in milliseconds. |
| `apiKey` | `string` | — | Optional API key for authenticated access. |

#### Methods

##### `search(query, options?)`

Search the library for documents matching a query string.

```typescript
const results = await client.search('authentication', {
  limit: 10,
  page: 1,
});
```

**Parameters:**

- `query` – The search query string.
- `options.limit` – Maximum number of results to return (default: `10`).
- `options.page` – Page number for pagination (default: `1`).

**Returns:** `Promise<SearchResult[]>`

---

##### `getDocument(slug)`

Retrieve a single document by its slug.

```typescript
const doc = await client.getDocument('guides/introduction');
```

**Parameters:**

- `slug` – The document slug (e.g., `'guides/introduction'`).

**Returns:** `Promise<Document>`

---

### `SearchResult`

Represents a single search result.

```typescript
interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  score: number;
  breadcrumbs: string[];
}
```

### `Document`

Represents a full library document.

```typescript
interface Document {
  slug: string;
  title: string;
  description: string;
  content: string;
  headings: Heading[];
  lastModified: Date;
}
```

## Error Handling

All API methods throw a `LibraryError` on failure:

```typescript
import { LibraryError } from 'a-library';

try {
  const doc = await client.getDocument('nonexistent');
} catch (error) {
  if (error instanceof LibraryError) {
    console.error(`Library error ${error.code}: ${error.message}`);
  }
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `NOT_FOUND` | The requested document does not exist. |
| `UNAUTHORIZED` | Invalid or missing API key. |
| `RATE_LIMITED` | Too many requests; please slow down. |
| `INTERNAL_ERROR` | An unexpected server-side error occurred. |
