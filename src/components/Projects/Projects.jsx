import { useRef } from 'react';
import sliceTextureLarge from '~/assets/slice-app-large.jpg';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import sliceTexture from '~/assets/slice-app.jpg';
import { default as sprTextureLarge } from '~/assets/spr-lesson-builder-dark-large.jpg';
import { default as sprTexturePlaceholder } from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import { default as sprTexture } from '~/assets/spr-lesson-builder-dark.jpg';
import { Heading } from '~/components/Heading';
import { ProjectSummary } from '~/components/ProjectSummary';
import { Section } from '~/components/Section';
import { useVisibleSections } from '~/hooks/useVisibleSections';
import styles from './projects.module.css';

export const Projects = ({ id }) => {
  const projectSectionHeader = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();

  const visibleSections = useVisibleSections([
    projectSectionHeader,
    projectOne,
    projectTwo,
    projectThree,
  ]);

  return (
    <div id={id} className={styles.projects} tabIndex={-1}>
      <Section as="section" ref={projectSectionHeader} tabIndex={-1}>
        <Heading
          level={2}
          as="h2"
          data-visible={visibleSections.includes(projectSectionHeader.current)}
          data-align="center"
          className={styles.title}
        >
          Here are some of the projects I've built. Feel free to check them out.
        </Heading>
      </Section>

      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Designing the future of education"
        description="Designing a platform to help educators build better online courseware"
        sourceCodeBtn={{
          text: 'Source Code',
          link: '#',
        }}
        liveViewBtn={{
          text: 'Live View',
          link: '#',
        }}
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
        index={2}
        title="Designing the future of education"
        description="Designing a platform to help educators build better online courseware"
        sourceCodeBtn={{
          text: 'Source Code',
          link: '#',
        }}
        liveViewBtn={{
          text: 'Download Link',
          link: '#',
        }}
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
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Biomedical image collaboration"
        description="Increasing the amount of collaboration in Slice, an app for biomedical imaging"
        sourceCodeBtn={{
          text: 'Source Code',
          link: '#',
        }}
        liveViewBtn={{
          text: 'Download Link',
          link: '#',
        }}
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
    </div>
  );
};
