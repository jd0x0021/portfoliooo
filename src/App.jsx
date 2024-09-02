import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import GothamBook from '~/assets/fonts/gotham-book.woff2';
import GothamMedium from '~/assets/fonts/gotham-medium.woff2';
import { Intro } from '~/components/Intro';
import { Progress } from '~/components/Progress';
import { ThemeProvider, themeStyles } from '~/components/ThemeProvider';
import { VisuallyHidden } from '~/components/VisuallyHidden';
import config from '~/config.json';
import { useHydrated } from '~/hooks/useHydrated';
import { Error } from '~/layouts/Error';
import { Navbar } from '~/layouts/Navbar';
import { baseMeta } from '~/utils/meta';
import styles from './app.module.css';
import './global.module.css';
import './reset.module.css';

export const links = () => [
  {
    rel: 'preload',
    href: GothamMedium,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: '',
  },
  {
    rel: 'preload',
    href: GothamBook,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: '',
  },
  { rel: 'manifest', href: '/manifest.json' },
  { rel: 'icon', href: '/favicon.ico' },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'shortcut_icon', href: '/shortcut.png', type: 'image/png', sizes: '64x64' },
  { rel: 'apple-touch-icon', href: '/icon-256.png', sizes: '256x256' },
  { rel: 'author', href: '/humans.txt', type: 'text/plain' },
];

export const loader = async ({ request, context }) => {
  const { url } = request;
  const { pathname } = new URL(url);
  const pathnameSliced = pathname.endsWith('/') ? pathname.slice(0, -1) : url;
  const canonicalUrl = `${config.url}${pathnameSliced}`;

  // const { getSession, commitSession } = createCookieSessionStorage({
  //   cookie: {
  //     name: '__session',
  //     httpOnly: true,
  //     maxAge: 604_800,
  //     path: '/',
  //     sameSite: 'lax',
  //     secrets: [context.cloudflare.env.SESSION_SECRET || ' '],
  //     secure: true,
  //   },
  // });

  // const session = await getSession(request.headers.get('Cookie'));
  const theme = localStorage.get('theme') || 'dark';

  return json(
    { canonicalUrl, theme }
    // {
    //   headers: {
    //     'Set-Cookie': await commitSession(session),
    //   },
    // }
  );
};

export function ErrorBoundary() {
  // const error = useRouteError();
  const error = {};

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
        <Error error={error} />
      </body>
    </html>
  );
}

const DisplacementSphere = lazy(() =>
  import('./components/DisplacementSphere').then(module => ({
    default: module.DisplacementSphere,
  }))
);

export const meta = () => {
  return baseMeta({
    title: 'Designer + Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

function App() {
  ////
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  // const projectOne = useRef();
  // const projectTwo = useRef();
  // const projectThree = useRef();
  const details = useRef();
  const isHydrated = useHydrated();

  useEffect(() => {
    // const sections = [intro, projectOne, projectTwo, projectThree, details];
    const sections = [intro];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);
  ////

  ////

  // const [theme, setTheme] = useState('dark');

  // // if (localStorage.getItem('theme')) {
  // //   theme = fetcher.formData.get('theme');
  // // }

  // function toggleTheme(newTheme) {
  //   setTheme(newTheme ? newTheme : theme === 'dark' ? 'light' : 'dark');
  //   // fetcher.submit(
  //   //   { theme: newTheme ? newTheme : theme === 'dark' ? 'light' : 'dark' },
  //   //   { action: '/api/set-theme', method: 'post' }
  //   // );
  // }

  useEffect(() => {
    console.info(
      `${config.ascii}\n`,
      `Taking a peek huh? Check out the source code: ${config.repo}\n\n`
    );
  }, []);
  ////

  return (
    <ThemeProvider>
      <Progress />
      <VisuallyHidden showOnFocus as="a" className={styles.skip} href="#main-content">
        Skip to main content
      </VisuallyHidden>
      <Navbar />
      <main
        id="main-content"
        className={styles.container}
        tabIndex={-1}
        // data-loading={state === 'loading'}
      >
        <div className={styles.home}>
          {isHydrated ? (
            <Suspense>
              <DisplacementSphere />
            </Suspense>
          ) : null}
          <Intro
            id="intro"
            sectionRef={intro}
            scrollIndicatorHidden={scrollIndicatorHidden}
          />
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
