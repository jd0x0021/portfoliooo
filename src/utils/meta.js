import config from '../config.json';

const { name, url, twitter } = config;
const defaultOgImage = `${url}/social-image.png`;

export function baseMeta({
  title,
  description,
  prefix = name,
  ogImage = defaultOgImage,
}) {
  const titleText = [prefix, title].filter(Boolean).join(' | ');

  return [
    { title: titleText },
    { name: 'description', content: description },
    { name: 'author', content: name },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:alt', content: 'Banner for the site' },
    { property: 'og:image:width', content: '1280' },
    { property: 'og:image:height', content: '800' },
    { property: 'og:title', content: titleText },
    { property: 'og:site_name', content: name },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:description', content: description },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:description', content: description },
    { property: 'twitter:title', content: titleText },
    { property: 'twitter:site', content: url },
    { property: 'twitter:creator', content: twitter },
    { property: 'twitter:image', content: ogImage },
  ];
}

/**
 * Generate \<meta/> tag objects based on the current theme.
 *
 * @param theme - The main theme ('dark' or 'light').
 * @returns
 */
export function generateThemeRelatedMetaTagObjects(theme) {
  return [
    {
      name: 'color-scheme',
      content: theme === 'light' ? 'light dark' : 'dark light',
    },
    {
      name: 'theme-color',
      content: theme === 'dark' ? '#111' : '#F2F2F2',
    },
  ];
}

/**
 * Inject \<meta/> tags at the TOP of the global \<head/> tag.
 *
 * @param metaTags - A list of meta tag data to be prepended on the \<head/> element.
 */
export function injectMetaTags(metaTags) {
  metaTags.forEach(metaTag => {
    let metaTagFromDOM = document.querySelector(`[name='${metaTag.name}']`);

    if (!metaTagFromDOM) {
      metaTagFromDOM = document.createElement('meta');
      metaTagFromDOM.name = metaTag.name;
      document.head.prepend(metaTagFromDOM);
    }

    metaTagFromDOM.content = metaTag.content;
  });
}
