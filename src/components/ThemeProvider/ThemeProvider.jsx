import { useEffect, useState } from 'react';
import { useInjectThemeStylesToGlobalTags } from '~/hooks/useInjectThemeStylesToGlobalTags';
import { classes } from '~/utils/style';
import { ThemeContext, themeStyles, useTheme } from './theme';

const UNIQUE_SESSION_THEME_KEY = 'jd-portfolio-theme';

export const ThemeProvider = ({
  children,
  className,
  as: Component = 'div',
  ...rest
}) => {
  const parentTheme = useTheme();
  const isRootProvider = !parentTheme.theme;
  const [theme, setTheme] = useState(() => {
    const sessionTheme = sessionStorage.getItem(UNIQUE_SESSION_THEME_KEY);
    return sessionTheme || 'dark';
  });

  useInjectThemeStylesToGlobalTags(theme, themeStyles);

  useEffect(() => {
    sessionStorage.setItem(UNIQUE_SESSION_THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme => (theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: toggleTheme || parentTheme.toggleTheme,
      }}
    >
      {isRootProvider && children}
      {/* Nested providers need a div to override theme tokens */}
      {!isRootProvider && (
        <Component className={classes(className)} data-theme={theme} {...rest}>
          {children}
        </Component>
      )}
    </ThemeContext.Provider>
  );
};
