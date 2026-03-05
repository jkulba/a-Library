// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://jkulba.github.io',
  base: '/a-Library',
  integrations: [
    starlight({
      title: 'Engineering Library',
      description: 'Technical Documentation Library for the Software Engineering Group',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: false,
      },
      social: {
        github: 'https://github.com/jkulba/a-Library',
      },
      customCss: ['./src/styles/custom.css'],

      sidebar: [
        {
          label: 'Home',
          link: '/',
        },
        {
          label: 'Getting Started',
          autogenerate: { directory: 'getting-started' },
        },
        {
          label: 'Architecture',
          autogenerate: { directory: 'architecture' },
        },
        {
          label: 'Design',
          autogenerate: { directory: 'design' },
        },
        {
          label: 'Database',
          autogenerate: { directory: 'database' },
        },
        {
          label: 'Infrastructure',
          autogenerate: { directory: 'infrastructure' },
        },
        {
          label: 'Development',
          autogenerate: { directory: 'development' },
        },
        {
          label: 'Runbooks',
          autogenerate: { directory: 'runbooks' },
        },
        {
          label: 'Security',
          autogenerate: { directory: 'security' },
        },
        {
          label: 'APIs',
          autogenerate: { directory: 'apis' },
        },
        {
          label: 'Release',
          autogenerate: { directory: 'release' },
        },
      ],
    }),
  ],
});
