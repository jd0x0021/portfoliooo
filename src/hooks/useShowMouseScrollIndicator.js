import { useEffect, useState } from 'react';

/**
 * Show the mouse scroll indicator if the user doesn't scroll the current section.
 * After the user scrolls down on that section, hide the mouse scroll indicator.
 * Show the mouse scroll indicator again if the user scrolls back up to that section.
 *
 * @param sectionRef - the current section to show/hide the mouse scroll indicator.
 */
export function useShowMouseScrollIndicator(sectionRef) {
  if (!sectionRef) {
    throw new Error(
      `There are no ref provided on the ${useShowMouseScrollIndicator.name} hook.`
    );
  }

  const [showMouseScrollIndicator, setShowMouseScrollIndicator] = useState(false);

  useEffect(() => {
    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setShowMouseScrollIndicator(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    indicatorObserver.observe(sectionRef.current);

    return () => {
      indicatorObserver.disconnect();
    };
  }, []);

  return showMouseScrollIndicator;
}
