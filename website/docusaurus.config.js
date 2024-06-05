// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Developer Training',
  tagline: 'Learn about Golioth and Zephyr, with hands-on exercises',
  url: 'https://golioth.github.io',
  baseUrl: '/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'golioth', // Usually your GitHub org/user name.
  projectName: 'developer-training', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          //editUrl: 'https://github.com/golioth/developer-training',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [ 'docusaurus-plugin-image-zoom' ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Developer Training',
        logo: {
          alt: 'Golioth Logo',
          src: 'img/Golioth_logo_300x300.png',
        },
        items: [
          {
            to: 'docs/golioth-exploration',
            activeBasePath: 'golioth-exploration',
            label: 'Intro to Golioth',
            position: 'left',
          },
          {
            to: 'docs/zephyr-training',
            activeBasePath: 'zephyr-training',
            label: 'Zephyr Training',
            position: 'left',
          },
          {
            to: 'docs/api-training',
            activeBasePath: 'api-training',
            label: 'API Training',
            position: 'left',
          },
          {
            href: 'https://github.com/golioth/developer-training',
            label: 'Document Repo',
            position: 'right',
          },
          {
            href: "https://console.golioth.io",
            label: "Console Login",
            position: "right",
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Golioth Company',
            items: [
              {
                label: 'Main Site',
                href: 'https://golioth.io',
              },
              {
                label: 'Docs Site',
                href: 'https://docs.golioth.io',
              },
              {
                label: 'Console',
                href: 'https://console.golioth.io',
              },
            ],
          },
          {
            title: 'Golioth Community',
            items: [
              {
                label: 'Training Event Code of Conduct',
                to: '/docs/community/code-of-conduct',
              },
              {
                label: 'Forum',
                href: 'https://forum.golioth.io',
              },
              {
                label: 'Discord',
                href: 'https://golioth.io/discord',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/golioth_iot',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Golioth Blog',
                href: 'https://blog.golioth.io',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/golioth',
              },
              {
                label: 'Zephyr Training using Codespaces',
                href: 'https://codespaces.new/golioth/zephyr-training',
              },
              {
                label: 'Take our live Zephyr Training course',
                href: 'https://golioth.io/training-signup',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Golioth, Inc.<br />Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      zoom: {
        selector: '.markdown :not(em) > img',
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
          background: {
            light: 'rgb(255, 255, 255)',
            dark: 'rgb(50, 50, 50)'
          }
        }
      },
    }),
}

module.exports = config
