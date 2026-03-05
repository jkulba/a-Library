import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://jkulba.github.io',
  base: '/a-Library',
  integrations: [
    starlight({
      title: 'a-Library',
      description: 'Technical Documentation Library',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/jkulba/a-Library' },
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'Getting Started', link: '/guides/getting-started/' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
});
