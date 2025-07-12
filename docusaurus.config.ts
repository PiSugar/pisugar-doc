import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "PiSugar Docs",
  tagline: "PiSugar Documentation",
  favicon: "img/favicon64.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://docs.pisugar.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "PiSugar", // Usually your GitHub org/user name.
  projectName: "pisugar-doc", // Usually your repo name.
  deploymentBranch: "main", // The branch that GitHub pages will deploy from.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'algolia-site-verification',
        content: '8A34CE678B7D7BDD',
      },
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    [
      "@docusaurus/plugin-google-gtag",
      {
        trackingID: "G-6K1JYDGLHP", // ← 你的 Google Analytics 4 ID
        anonymizeIP: true, // 可选：是否匿名用户IP
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/PiSugar/pisugar-doc/tree/main/",
        },
        blog: false,
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ["rss", "atom"],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     "https://github.com/PiSugar/pisugar-doc/tree/main/",
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: "warn",
        //   onInlineAuthors: "warn",
        //   onUntruncatedBlogPosts: "warn",
        // },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    algolia: {
      appId: "IKLJNMQK0D",
      apiKey: "0b8158c3a41bb32c2b33b849d9aacc97",
      indexName: "PiSugar Documantation",
      searchPagePath: false,
    },
    navbar: {
      title: "",
      logo: {
        alt: "PiSugar Logo",
        src: "img/black_logo.svg",
        srcDark: "img/white_logo.svg", // Logo for dark mode
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "wikiSidebar",
          position: "left",
          label: "Product Wiki",
        },
        {
          type: "docSidebar",
          sidebarId: "toolsSidebar",
          position: "left",
          label: "Useful Tools",
        },
        {
          href: "https://www.pisugar.com",
          label: "Shop",
          position: "right",
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        // {
        //   href: "https://www.pisugar.com",
        //   label: "Official Site",
        //   position: "right",
        // },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Products",
          items: [
            {
              label: "Battery / UPS",
              to: "/docs/product-wiki/battery/ups-intro",
            },
            // {
            //   label: "Whisplay HAT",
            //   to: "/docs/whisplay",
            // },
          ],
        },
        {
          title: "Tools",
          items: [
            {
              label: "Wifi Config",
              to: "/docs/useful-tools/pisugar-wifi-config",
              // href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            // {
            //   label: "Discord",
            //   href: "https://discordapp.com/invite/docusaurus",
            // },
            // {
            //   label: "X",
            //   href: "https://x.com/docusaurus",
            // },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Official Website",
              // to: "/blog",
              href: "https://www.pisugar.com",
            },
            {
              label: "GitHub",
              href: "https://github.com/pisugar",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PiSugar Kitchen. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
