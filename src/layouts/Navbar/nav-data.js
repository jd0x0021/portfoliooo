import config from '../../config.json';

export const navLinks = [
  {
    label: 'Intro',
    pathname: '/#intro',
  },
  {
    label: 'Projects',
    pathname: '/#projects',
  },
  {
    label: 'About',
    pathname: '/#about',
  },
  {
    label: 'Contact',
    pathname: '/#contact-form',
  },
];

export const socialLinks = [
  {
    label: 'Twitter',
    url: `https://twitter.com/${config.twitter}`,
    icon: 'twitter',
  },
  {
    label: 'Figma',
    url: `https://www.figma.com/${config.figma}`,
    icon: 'figma',
  },
  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
];
