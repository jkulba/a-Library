import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'a-Library',
      description: 'Technical Documentation Library',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/jkulba/a-Library',
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'guides/introduction' },
            { label: 'Quick Start', slug: 'guides/quick-start' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'API Reference', slug: 'reference/api' },
            { label: 'Configuration', slug: 'reference/configuration' },
          ],
        },
        {
          label: 'Tutorials',
          items: [
            { label: 'Building Your First App', slug: 'tutorials/first-app' },
            { label: 'Working with Data', slug: 'tutorials/working-with-data' },
          ],
        },
      ],
    }),
  ],
});
