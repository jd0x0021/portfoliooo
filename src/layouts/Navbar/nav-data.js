import resume from '~/assets/resume/JohnDalmaoResume2021.pdf';
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
  {
    label: 'Resume',
    pathname: resume,
  },
];

export const socialLinks = [
  {
    label: 'Github',
    url: config.github,
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    url: config.linkedIn,
    icon: 'linkedin',
  },
];
