import { useEffect } from 'react';

/**
 * Update the favicon based on the browser's theme (dark or light mode).
 *
 * @param {boolean} isDarkMode
 */
const updateFavicon = isDarkMode => {
  const favicon = document.querySelector("link[rel='icon']");
  favicon.href = isDarkMode
    ? '/favicons/favicon-light.png'
    : '/favicons/favicon-dark.png';
  document.head.appendChild(favicon);
};

export const useFavicon = () => {
  useEffect(() => {
    // Set the favicon based on initial theme
    const browserColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    updateFavicon(browserColorScheme.matches);

    // Update the favicon if the browser's theme changes
    browserColorScheme.addEventListener('change', e => {
      updateFavicon(e.matches);
    });

    // Cleanup event listener on component unmount
    return () => {
      browserColorScheme.removeEventListener('change', e => {
        updateFavicon(e.matches);
      });
    };
  }, []);
};
