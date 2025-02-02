import { lazy, Suspense, useEffect, useRef } from 'react';
import { useLocation, useRouteError } from 'react-router-dom';
import { Contact } from '~/components/Contact';
import { Footer } from '~/components/Footer';
import { Intro } from '~/components/Intro';
import { Profile } from '~/components/Profile';
import { Projects } from '~/components/Projects';
import { ThemeProvider, themeStyles } from '~/components/ThemeProvider';
import { VisuallyHidden } from '~/components/VisuallyHidden';
import config from '~/config.json';
import { useHasMounted } from '~/hooks/useHasMounted';
import { useScrollToHash } from '~/hooks/useScrollToHash';
import { useVisibleSections } from '~/hooks/useVisibleSections';
import { Error } from '~/layouts/Error';
import { Navbar } from '~/layouts/Navbar';
import styles from './app.module.css';

export function AppErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111" />
        <meta name="color-scheme" content="dark light" />
        <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
      </head>
      <body data-theme="dark">
        <Error error={useRouteError()} />
      </body>
    </html>
  );
}

const DisplacementSphere = lazy(() =>
  import('./components/DisplacementSphere').then(module => ({
    default: module.DisplacementSphere,
  }))
);

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

export function App() {
  const intro = useRef();
  const about = useRef();
  const contact = useRef();
  const visibleSections = useVisibleSections([intro, about, contact]);

  const location = useLocation();
  const hasMounted = useHasMounted();
  const scrollToHash = useScrollToHash();

  useEffect(() => {
    if (!location.hash) {
      // To always scroll at the top of the page when the page reloads
      // no matter where the current scroll position in the page is.
      window.scrollTo(0, 0);
    } else {
      // To always scroll at the specified section's hash/id when the page
      // reloads no matter where the current scroll position in the page is.
      scrollToHash(location.hash);
    }
  }, [location.hash, scrollToHash]);

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

  useEffect(() => {
    console.info(
      `\n\n${config.ascii}\n\n`,
      `Taking a peek huh? Check out the source code: ${config.github}/portfoliooo\n\n`
    );
  }, []);

  return (
    <ThemeProvider>
      <VisuallyHidden showOnFocus as="a" className={styles.skip} href="#main-content">
        Skip to main content
      </VisuallyHidden>
      <Navbar />
      <main
        id="main-content"
        className={styles.container}
        tabIndex={-1}
        data-mounted={hasMounted}
      >
        <div>
          <div className={styles.gridLines}></div>

          {hasMounted ? (
            <Suspense>
              <DisplacementSphere />
            </Suspense>
          ) : null}

          <Intro id="intro" sectionRef={intro} />

          <Projects id="projects" />

          <Profile
            id="about"
            sectionRef={about}
            visible={visibleSections.includes(about.current)}
          />

          <Contact
            id="contact"
            sectionRef={contact}
            visible={visibleSections.includes(contact.current)}
          />

          <Footer />
        </div>
      </main>
    </ThemeProvider>
  );
}
