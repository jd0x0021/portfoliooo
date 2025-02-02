import { createContext, useContext } from 'react';
import GothamBoldItalic from '~/assets/fonts/gotham-bold-italic.woff2';
import GothamBold from '~/assets/fonts/gotham-bold.woff2';
import GothamBookItalic from '~/assets/fonts/gotham-book-italic.woff2';
import GothamBook from '~/assets/fonts/gotham-book.woff2';
import GothamMediumItalic from '~/assets/fonts/gotham-medium-italic.woff2';
import GothamMedium from '~/assets/fonts/gotham-medium.woff2';
import IPAGothic from '~/assets/fonts/ipa-gothic.woff2';
import { media, pxToRem } from '~/utils/style';

// Full list of tokens
const baseTokens = {
  black: 'oklch(0% 0 0)',
  white: 'oklch(100% 0 0)',
  bezierFastoutSlowin: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  durationXS: '200ms',
  durationS: '300ms',
  durationM: '400ms',
  durationL: '600ms',
  durationXL: '800ms',
  systemFontStack:
    'system-ui, -apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Ubuntu, Helvetica Neue, sans-serif',
  fontStack: `Gotham, var(--systemFontStack)`,
  monoFontStack:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  japaneseFontStack:
    'IPA Gothic, ヒラギノ角ゴ Pro W3, Hiragino Kaku Gothic Pro, Hiragino Sans, Osaka, メイリオ, Meiryo, Segoe UI, sans-serif',
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  fontSizeH0: pxToRem(140),
  fontSizeH1: pxToRem(100),
  fontSizeH2: pxToRem(58),
  fontSizeH3: pxToRem(38),
  fontSizeH4: pxToRem(28),
  fontSizeH5: pxToRem(24),
  fontSizeBodyXL: pxToRem(22),
  fontSizeBodyL: pxToRem(20),
  fontSizeBodyM: pxToRem(18),
  fontSizeBodyS: pxToRem(16),
  fontSizeBodyXS: pxToRem(14),
  lineHeightTitle: '1.1',
  lineHeightBody: '1.6',
  maxWidthS: '540px',
  maxWidthM: '720px',
  maxWidthL: '1096px',
  maxWidthXL: '1680px',
  spaceOuter: '64px',
  spaceXS: '4px',
  spaceS: '8px',
  spaceM: '16px',
  spaceL: '24px',
  spaceXL: '32px',
  space2XL: '48px',
  space3XL: '64px',
  space4XL: '96px',
  space5XL: '128px',
  space6XL: '144px',
  zIndexNeg1: -4,
  zIndex0: 0,
  zIndex1: 4,
  zIndex2: 8,
  zIndex3: 16,
  zIndex4: 32,
  zIndex5: 64,
};

// Tokens that change based on viewport size
const tokensDesktop = {
  fontSizeH0: pxToRem(120),
  fontSizeH1: pxToRem(80),
};

const tokensLaptop = {
  maxWidthS: '480px',
  maxWidthM: '640px',
  maxWidthL: '1000px',
  maxWidthXL: '1100px',
  spaceOuter: '48px',
  fontSizeH0: pxToRem(100),
  fontSizeH1: pxToRem(70),
  fontSizeH2: pxToRem(50),
  fontSizeH3: pxToRem(36),
  fontSizeH4: pxToRem(26),
  fontSizeH5: pxToRem(22),
};

const tokensTablet = {
  fontSizeH0: pxToRem(80),
  fontSizeH1: pxToRem(60),
  fontSizeH2: pxToRem(48),
  fontSizeH3: pxToRem(32),
  fontSizeH4: pxToRem(24),
  fontSizeH5: pxToRem(20),
};

const tokensMobile = {
  spaceOuter: '24px',
  fontSizeH0: pxToRem(56),
  fontSizeH1: pxToRem(40),
  fontSizeH2: pxToRem(34),
  fontSizeH3: pxToRem(28),
  fontSizeH4: pxToRem(22),
  fontSizeH5: pxToRem(18),
  fontSizeBodyL: pxToRem(17),
  fontSizeBodyM: pxToRem(16),
  fontSizeBodyS: pxToRem(14),
};

const tokensMobileSmall = {
  spaceOuter: '16px',
  fontSizeH0: pxToRem(42),
  fontSizeH1: pxToRem(38),
  fontSizeH2: pxToRem(28),
  fontSizeH3: pxToRem(24),
  fontSizeH4: pxToRem(20),
};

// Tokens that change based on theme (dark mode)
const dark = {
  background: 'oklch(17.76% 0 0)',
  backgroundLight: 'oklch(21.78% 0 0)',
  primary: 'oklch(84.42% 0.19 202.24)',
  accent: 'oklch(84.42% 0.19 202.24)',
  error: 'oklch(65.91% 0.249 13.76)',
  text: 'var(--white)',
  textTitle: 'var(--text)',
  textBody: 'color-mix(in lab, var(--text) 80%, transparent)',
  textLight: 'color-mix(in lab, var(--text) 60%, transparent)',
  gridLinesColor: 'oklch(40.2% 0 0)',
};

// Tokens that change based on theme (light mode)
const light = {
  background: 'oklch(96.12% 0 0)',
  backgroundLight: 'var(--white)',
  primary: 'var(--black)',
  accent: 'oklch(84.42% 0.19 202.24)',
  error: 'oklch(63.17% 0.259 25.41)',
  text: 'var(--black)',
  textTitle: 'color-mix(in lab, var(--text) 90%, transparent)',
  textBody: 'color-mix(in lab, var(--text) 75%, transparent)',
  textLight: 'color-mix(in lab, var(--text) 55%, transparent)',
  gridLinesColor: 'oklch(79.6% 0 0)',
};

export const tokens = {
  base: baseTokens,
  desktop: tokensDesktop,
  laptop: tokensLaptop,
  tablet: tokensTablet,
  mobile: tokensMobile,
  mobileS: tokensMobileSmall,
};

export const ThemeContext = createContext({});
export const themes = { dark, light };

/**
 * The current theme.
 *
 * @returns
 */
export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Squeeze out spaces and newlines
 */
function squish(styles) {
  return styles.replace(/\s\s+/g, ' ');
}

/**
 * Transform theme token objects into CSS custom property strings
 */
function createThemeProperties(theme) {
  return squish(
    Object.keys(theme)
      .map(key => `--${key}: ${theme[key]};`)
      .join('\n\n')
  );
}

/**
 * Generate media queries for tokens
 */
function createMediaTokenProperties() {
  return squish(
    Object.keys(media)
      .map(key => {
        return `
        @media (max-width: ${media[key]}px) {
          :root {
            ${createThemeProperties(tokens[key])}
          }
        }
      `;
      })
      .join('\n')
  );
}

const layerStyles = squish(`
  @layer theme, base, components, layout;
`);

const tokenStyles = squish(`
  :root {
    ${createThemeProperties(tokens.base)}
  }

  ${createMediaTokenProperties()}

  [data-theme='dark'] {
    ${createThemeProperties(themes.dark)}
  }

  [data-theme='light'] {
    ${createThemeProperties(themes.light)}
  }
`);

const fontStyles = squish(`
  @font-face {
    font-family: Gotham;
    font-weight: 400;
    src: url(${GothamBook}) format('woff2');
    font-display: block;
    font-style: normal;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 400;
    src: url(${GothamBookItalic}) format('woff2');
    font-display: block;
    font-style: italic;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 500;
    src: url(${GothamMedium}) format('woff2');
    font-display: block;
    font-style: normal;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 500;
    src: url(${GothamMediumItalic}) format('woff2');
    font-display: block;
    font-style: italic;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 700;
    src: url(${GothamBold}) format('woff2');
    font-display: block;
    font-style: normal;
  }

  @font-face {
    font-family: Gotham;
    font-weight: 700;
    src: url(${GothamBoldItalic}) format('woff2');
    font-display: block;
    font-style: italic;
  }

  @font-face {
    font-family: IPA Gothic;
    font-weight: 400;
    src: url(${IPAGothic}) format('woff2');
    font-display: swap;
    font-style: normal;
  }
`);

export const themeStyles = squish(`
  ${layerStyles}

  @layer theme {
    ${tokenStyles}
    ${fontStyles}
  }
`);
