/*==========================================================================================================================
	I need to manually inject the style, meta tags, and body attribute here since the react-helmet package does	not inject
	 style, and meta tags at the top of the <head> tag (they are always injected at the bottom). This is needed in order 
	 for most of the css to work since the "themeStyles" variable holds the base css (js generated css) of the project.

	There is another package that injects the style, and meta tags at the top of the <head> tag using the 
	react-helmet-stuff package, but I'm getting this error 'Warning: Using UNSAFE_componentWillMount in strict 
	mode is	not recommended' (the same error when using the react-helmet package). To get rid of the error, I 
	used the	react-helmet-async package, but the react-helmet-async package does not inject the style, and 
	meta tags on TOP the <head> tag, that's why I opted to just manually inject these tags below:
==========================================================================================================================*/

import { useEffect } from 'react';
import { generateThemeRelatedMetaTagObjects, injectMetaTags } from '~/utils/meta';

/**
 * Inject \<meta/> and \<style/> tags at the TOP of the global \<head/> tag, and add a
 * data-theme attribute to the \<body/> tag (to have the appropriate styles based on the theme).
 * *Read the comment on the top of this hook for the reason why this is needed.*
 *
 * @param {string} theme - The main theme ('dark' or 'light').
 * @param {string} themeStyles - Global theme related css styles that are js generated.
 */
export function useInjectThemeStylesToGlobalTags(theme, themeStyles) {
  useEffect(() => {
    const themeMetaTags = generateThemeRelatedMetaTagObjects(theme);
    injectMetaTags(themeMetaTags);

    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const globalThemeStyles = document.createElement('style');
    globalThemeStyles.type = 'text/css';
    globalThemeStyles.innerHTML = themeStyles;

    document.head.prepend(globalThemeStyles);
  }, [themeStyles]);
}
