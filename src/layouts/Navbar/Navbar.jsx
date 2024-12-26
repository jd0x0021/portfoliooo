import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '~/components/Icon';
import { Monogram } from '~/components/Monogram';
import { useTheme } from '~/components/ThemeProvider';
import { tokens } from '~/components/ThemeProvider/theme';
import { Transition } from '~/components/Transition';
import config from '~/config.json';
import { useScrollToHash } from '~/hooks/useScrollToHash';
import { useWindowSize } from '~/hooks/useWindowSize';
import { cssProps, media, msToNum, numToMs } from '~/utils/style';
import { navLinks, socialLinks } from './nav-data';
import styles from './navbar.module.css';
import { NavToggle } from './NavToggle';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const [current, setCurrent] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [target, setTarget] = useState();
  const { theme } = useTheme();
  const location = useLocation();
  const windowSize = useWindowSize();
  const headerRef = useRef();
  const isMobile = windowSize.width <= media.mobile || windowSize.height <= 696;
  const scrollToHash = useScrollToHash();

  // Select and highlight the current nav label when the page loads, and scroll
  // to the specified section on the current page based on the url's hash (#).
  useEffect(() => {
    setCurrent(`${location.pathname}${location.hash}`);
  }, [location]);

  // Handle smooth scroll nav items
  useEffect(() => {
    if (!target || location.pathname !== '/') return;
    setCurrent(`${location.pathname}${target}`);
    scrollToHash(target, () => setTarget(null));
  }, [location.pathname, scrollToHash, target]);

  // Handle swapping the theme when intersecting with inverse themed elements
  useEffect(() => {
    const navItems = document.querySelectorAll('[data-navbar-item]');
    const inverseTheme = theme === 'dark' ? 'light' : 'dark';
    const { innerHeight } = window;

    let inverseMeasurements = [];
    let navItemMeasurements = [];

    const isOverlap = (rect1, rect2, scrollY) => {
      return !(rect1.bottom - scrollY < rect2.top || rect1.top - scrollY > rect2.bottom);
    };

    const resetNavTheme = () => {
      for (const measurement of navItemMeasurements) {
        measurement.element.dataset.theme = '';
      }
    };

    const handleInversion = () => {
      const invertedElements = document.querySelectorAll(
        `[data-theme='${inverseTheme}'][data-invert]`
      );

      if (!invertedElements) return;

      inverseMeasurements = Array.from(invertedElements).map(item => ({
        element: item,
        top: item.offsetTop,
        bottom: item.offsetTop + item.offsetHeight,
      }));

      const { scrollY } = window;

      resetNavTheme();

      for (const inverseMeasurement of inverseMeasurements) {
        if (
          inverseMeasurement.top - scrollY > innerHeight ||
          inverseMeasurement.bottom - scrollY < 0
        ) {
          continue;
        }

        for (const measurement of navItemMeasurements) {
          if (isOverlap(inverseMeasurement, measurement, scrollY)) {
            measurement.element.dataset.theme = inverseTheme;
          } else {
            measurement.element.dataset.theme = '';
          }
        }
      }
    };

    // Currently only the light theme has dark full-width elements
    if (theme === 'light') {
      navItemMeasurements = Array.from(navItems).map(item => {
        const rect = item.getBoundingClientRect();

        return {
          element: item,
          top: rect.top,
          bottom: rect.bottom,
        };
      });

      document.addEventListener('scroll', handleInversion);
      handleInversion();
    }

    return () => {
      document.removeEventListener('scroll', handleInversion);
      resetNavTheme();
    };
  }, [theme, windowSize, location.key]);

  // Check if a nav item should be active
  const getCurrent = (url = '') => {
    const nonTrailing = current?.endsWith('/') ? current?.slice(0, -1) : current;

    if (url === nonTrailing) {
      return 'page';
    }

    return '';
  };

  // Store the current hash to scroll to
  const handleNavItemClick = event => {
    const hash = event.currentTarget.href.split('#')[1];
    setTarget(null);

    if (hash && location.pathname === '/') {
      setTarget(`#${hash}`);
      event.preventDefault();
    }
  };

  const handleMobileNavClick = event => {
    handleNavItemClick(event);
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <header className={styles.navbar} ref={headerRef}>
      <Link
        data-navbar-item
        reloadDocument
        to={'/'}
        className={styles.logo}
        aria-label={`${config.name}, ${config.role}`}
      >
        <Monogram highlight />
      </Link>
      <NavToggle onClick={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      <nav className={styles.nav}>
        <div className={styles.navList}>
          {navLinks.map(({ label, pathname }) => (
            <Link
              unstable_viewTransition
              to={pathname}
              key={label}
              target="_blank"
              data-navbar-item
              className={styles.navLink}
              aria-current={getCurrent(pathname)}
              onClick={handleNavItemClick}
            >
              {label}
            </Link>
          ))}
        </div>
        <NavbarIcons desktop />
      </nav>
      <Transition unmount in={menuOpen} timeout={msToNum(tokens.base.durationL)}>
        {({ visible, nodeRef }) => (
          <nav className={styles.mobileNav} data-visible={visible} ref={nodeRef}>
            {navLinks.map(({ label, pathname }, index) => (
              <Link
                unstable_viewTransition
                to={pathname}
                key={label}
                target="_blank"
                className={styles.mobileNavLink}
                data-visible={visible}
                aria-current={getCurrent(pathname)}
                onClick={handleMobileNavClick}
                style={cssProps({
                  transitionDelay: numToMs(
                    Number(msToNum(tokens.base.durationS)) + index * 50
                  ),
                })}
              >
                {label}
              </Link>
            ))}
            <NavbarIcons />
            <ThemeToggle isMobile />
          </nav>
        )}
      </Transition>
      {!isMobile && <ThemeToggle data-navbar-item />}
    </header>
  );
};

const NavbarIcons = ({ desktop }) => (
  <div className={styles.navIcons}>
    {socialLinks.map(({ label, url, icon }) => (
      <a
        key={label}
        data-navbar-item={desktop || undefined}
        className={styles.navIconLink}
        aria-label={label}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className={styles.navIcon} icon={icon} />
      </a>
    ))}
  </div>
);
