import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import gamestackTexture2Large from '~/assets/gamestack-list-large.jpg';
import gamestackTexture2Placeholder from '~/assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from '~/assets/gamestack-list.jpg';
import gamestackTextureLarge from '~/assets/gamestack-login-large.jpg';
import gamestackTexturePlaceholder from '~/assets/gamestack-login-placeholder.jpg';
import gamestackTexture from '~/assets/gamestack-login.jpg';
import sliceTextureLarge from '~/assets/slice-app-large.jpg';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import sliceTexture from '~/assets/slice-app.jpg';
import { default as sprTextureLarge } from '~/assets/spr-lesson-builder-dark-large.jpg';
import { default as sprTexturePlaceholder } from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import { default as sprTexture } from '~/assets/spr-lesson-builder-dark.jpg';
import { Intro } from '~/components/Intro';
import { Profile } from '~/components/Profile';
import { Progress } from '~/components/Progress';
import { ProjectSummary } from '~/components/ProjectSummary';
import { ThemeProvider, themeStyles } from '~/components/ThemeProvider';
import { VisuallyHidden } from '~/components/VisuallyHidden';
import config from '~/config.json';
import { useHydrated } from '~/hooks/useHydrated';
import { Error } from '~/layouts/Error';
import { Navbar } from '~/layouts/Navbar';
import { baseMeta } from '~/utils/meta';
import styles from './app.module.css';

// export const links = () => [
//   {
//     rel: 'preload',
//     href: GothamMedium,
//     as: 'font',
//     type: 'font/woff2',
//     crossOrigin: '',
//   },
//   {
//     rel: 'preload',
//     href: GothamBook,
//     as: 'font',
//     type: 'font/woff2',
//     crossOrigin: '',
//   },
//   { rel: 'manifest', href: '/manifest.json' },
//   { rel: 'icon', href: '/favicon.ico' },
//   { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
//   { rel: 'shortcut_icon', href: '/shortcut.png', type: 'image/png', sizes: '64x64' },
//   { rel: 'apple-touch-icon', href: '/icon-256.png', sizes: '256x256' },
//   { rel: 'author', href: '/humans.txt', type: 'text/plain' },
// ];

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

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

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
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();
  const isHydrated = useHydrated();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

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
        <div>
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
          <ProjectSummary
            id="project-1"
            sectionRef={projectOne}
            visible={visibleSections.includes(projectOne.current)}
            index={1}
            title="Designing the future of education"
            description="Designing a platform to help educators build better online courseware"
            buttonText="View project"
            buttonLink="#"
            model={{
              type: 'laptop',
              alt: 'Smart Sparrow lesson builder',
              textures: [
                {
                  srcSet: `${sprTexture} 1280w, ${sprTextureLarge} 2560w`,
                  placeholder: sprTexturePlaceholder,
                },
              ],
            }}
          />

          <ProjectSummary
            id="project-2"
            alternate
            sectionRef={projectTwo}
            visible={visibleSections.includes(projectTwo.current)}
            index={2}
            title="Video game progress tracking"
            description="Design and development for a video game tracking app built in React Native"
            buttonText="View website"
            buttonLink="https://gamestack.hamishw.com"
            model={{
              type: 'phone',
              alt: 'App login screen',
              textures: [
                {
                  srcSet: `${gamestackTexture} 375w, ${gamestackTextureLarge} 750w`,
                  placeholder: gamestackTexturePlaceholder,
                },
                {
                  srcSet: `${gamestackTexture2} 375w, ${gamestackTexture2Large} 750w`,
                  placeholder: gamestackTexture2Placeholder,
                },
              ],
            }}
          />

          <ProjectSummary
            id="project-3"
            sectionRef={projectThree}
            visible={visibleSections.includes(projectThree.current)}
            index={3}
            title="Biomedical image collaboration"
            description="Increasing the amount of collaboration in Slice, an app for biomedical imaging"
            buttonText="View project"
            buttonLink="#"
            model={{
              type: 'laptop',
              alt: 'Annotating a biomedical image in the Slice app',
              textures: [
                {
                  srcSet: `${sliceTexture} 800w, ${sliceTextureLarge} 1920w`,
                  placeholder: sliceTexturePlaceholder,
                },
              ],
            }}
          />
          <Profile
            sectionRef={details}
            visible={visibleSections.includes(details.current)}
            id="details"
          />
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
