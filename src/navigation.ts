import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'About us',
      href: '#',  // Placeholder for now
    },
    {
      text: 'Gallery',
      href: '#',  // Placeholder for now
    },
    {
      text: 'Contact',
      href: '#',  // Placeholder for now
    },
    {
      text: 'Donate',
      href: '#',  // Placeholder for now
    },
  ],
  actions: [{ text: 'Donate Now', href: '#', target: '_blank' }],  // Placeholder action
};



export const footerData = {
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/sedaghatfar' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/mywifesadoctor/' },
    //{ ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/sedaghatfar/shuljam' },
  ],
  footNote: `
    <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm" src="https://i0.wp.com/tevunah.com/wp-content/uploads/2016/10/icon.png?fit=32%2C32&ssl=1" alt="Tevunah logo" loading="lazy"></img>
    Made with <a class="text-blue-600 underline dark:text-muted" href="https://tevunah.com/"> Tevunah</a> · All rights reserved.
  `,
};
