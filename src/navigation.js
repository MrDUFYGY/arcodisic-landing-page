import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    // {
    //   text: 'Homes',
    //   links: [
    //     {
    //       text: 'SaaS',
    //       href: getPermalink('/homes/saas'),
    //     },
    //     {
    //       text: 'Startup',
    //       href: getPermalink('/homes/startup'),
    //     },
    //     {
    //       text: 'Mobile App',
    //       href: getPermalink('/homes/mobile-app'),
    //     },
    //     {
    //       text: 'Personal',
    //       href: getPermalink('/homes/personal'),
    //     },
    //   ],
    // },
    {
      text: 'Paginas',
      links: [
        {
          text: 'Novedades',
          href: getPermalink('/index'),
        },
        {
          text: 'Servicios',
          href: getPermalink('/services'),
        },
        {
          text: 'acerca nosotros',
          href: getPermalink('/about'),
        },
        {
          text: 'Contacto',
          href: getPermalink('/contact'),
        },
        {
          text: 'Terminos',
          href: getPermalink('/terms'),
        },
        {
          text: 'Politicas de privacidad',
          href: getPermalink('/privacy'),
        },
      ],
    },
    // {
    //   text: 'Landing',
    //   links: [
    //     {
    //       text: 'Lead Generation',
    //       href: getPermalink('/lead-generation'),
    //     },
    //     {
    //       text: 'Long-form Sales',
    //       href: getPermalink('/sales'),
    //     },
    //     {
    //       text: 'Click-Through',
    //       href: getPermalink('/click-through'),
    //     },
    //     {
    //       text: 'Product Details (or Services)',
    //       href: getPermalink('/product'),
    //     },
    //     {
    //       text: 'Coming Soon or Pre-Launch',
    //       href: getPermalink('/pre-launch'),
    //     },
    //     {
    //       text: 'Subscription',
    //       href: getPermalink('/subscription'),
    //     },
    //   ],
    // },
    {
      text: 'Blog',
      links: [
        {
          text: 'Lista de Artículos',
          href: getBlogPermalink(),
        },
        {
          text: '¿Por qué elegir arcotechos?',
          href: getPermalink('0-porque-archotechos', 'post'),
        },
        {
          text: 'Beneficios y aplicaciones de arcotechos',
          href: getPermalink('1-arcotechos-beneficios-aplicaciones', 'post'),
        },
        {
          text: 'Estructuras metálicas y techos en Texcoco',
          href: getPermalink('2-estructuras-metalicas-techos-texcoco', 'post'),
        },
        
        // {
        //   text: 'Article (with MDX)',
        //   href: getPermalink('markdown-elements-demo-post', 'post'),
        // },
        // {
        //   text: 'Category Page',
        //   href: getPermalink('tutorials', 'category'),
        // },
        {
          text: 'Tag Page',
          href: getPermalink('astro', 'tag'),
        },
      ],
    },
    // {
    //   text: 'Widgets',
    //   href: '#',
    // },
  ],
  // actions: [{ text: 'Download', href: 'https://github.com/onwidget/astrowind', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Servicios',
      links: [
        { text: 'Arcotechos y Gruas en Texcoco', href: '/services' },
        // { text: 'Security', href: '#' },
        // { text: 'Team', href: '#' },
        // { text: 'Enterprise', href: '#' },
        // { text: 'Customer stories', href: '#' },
        // { text: 'Pricing', href: '#' },
        // { text: 'Resources', href: '#' },
      ],
    },
    // {
    //   title: 'Platform',
    //   links: [
    //     { text: 'Developer API', href: '#' },
    //     { text: 'Partners', href: '#' },
    //     { text: 'Atom', href: '#' },
    //     { text: 'Electron', href: '#' },
    //     { text: 'AstroWind Desktop', href: '#' },
    //   ],
    // },
    // {
    //   title: 'Support',
    //   links: [
    //     { text: 'Docs', href: '#' },
    //     { text: 'Community Forum', href: '#' },
    //     { text: 'Professional Services', href: '#' },
    //     { text: 'Skills', href: '#' },
    //     { text: 'Status', href: '#' },
    //   ],
    // },
    {
      title: 'Nosotros',
      links: [
        { text: 'Acerca de nosotros', href: '/about' },
        { text: 'Blog', href: '/blog' },
        // { text: 'Careers', href: '#' },
        // { text: 'Press', href: '#' },
        // { text: 'Inclusion', href: '#' },
        // { text: 'Social Impact', href: '#' },
        // { text: 'Shop', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    // { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    // { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/profile.php?id=61556231038015' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/MrDUFYGY' },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm "bg-[url(/favicons/favicon.ico)]"></span>
    Made by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://arcodisic.com.mx/"> Arcodisic </a> · All rights reserved.  
  `,
};
