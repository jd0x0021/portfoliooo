import { useEffect, useState } from 'react';

/**
 * This determines if a specific section is going to be visible on the UI. Initially all sections
 * are hidden (so that we can animate a section's elements on scroll), and as the user scrolls
 * to a specific section, that section is now going to be visible until the page is refreshed.
 *
 * @param sections - the section (ref) elements that will be visible on scroll.
 */
export function useVisibleSections(sections) {
  if (!sections || sections.length === 0) {
    throw new Error(
      `There are no sections provided on the ${useVisibleSections.name} hook.`
    );
  }

  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
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

    sections.forEach(section => {
      if (!section) {
        throw new Error(
          `No section is provided when accessing section.current in the ${useVisibleSections.name} hook.`
        );
      }

      sectionObserver.observe(section.current);
    });

    return () => {
      sectionObserver.disconnect();
    };
  }, [visibleSections]);

  return visibleSections;
}
