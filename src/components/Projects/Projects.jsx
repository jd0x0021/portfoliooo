import { useEffect, useRef, useState } from 'react';
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
import { ProjectSummary } from '~/components/ProjectSummary';
import { Section } from '~/components/Section';
import { Transition } from '~/components/Transition';

export const Projects = ({ id, visible, sectionRef }) => {
  const [visibleSections, setVisibleSections] = useState([]);

  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();

  useEffect(() => {
    const sections = [projectOne, projectTwo, projectThree];

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
      sectionObserver.observe(section.current);
    });

    return () => {
      sectionObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <Section as="section" ref={sectionRef} id={id} tabIndex={-1}>
      <Transition in={visible} timeout={0}>
        {({ status }) => (
          <>
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
              sectionRef={projectTwo}
              visible={visibleSections.includes(projectTwo.current)}
              alternate
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
          </>
        )}
      </Transition>
    </Section>
  );
};
