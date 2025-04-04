import { useRef } from 'react';
import lcgenjdPlaceHolder from '~/assets/img/projects/lcgenjd-placeholder.png';
import lcgenjdPreview from '~/assets/img/projects/lcgenjd.png';
import parajectDesktopAppPlaceholder from '~/assets/img/projects/paraject-placeholder.png';
import parajectDesktopAppPreview from '~/assets/img/projects/paraject.png';
import pizzaShopWebsitePlaceholder from '~/assets/img/projects/pizza-shop-placeholder.png';
import pizzaShopWebsitePreview from '~/assets/img/projects/pizza-shop.png';
import {
  projectOneBadges,
  projectThreeBadges,
  projectTwoBadges,
} from '~/components/Badges/badgeData';
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
          Here are some of the projects I&#39;ve built. Feel free to check them out.
        </Heading>
      </Section>

      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Lcgenjd"
        description="A client-side web application that automates data transformation, converting user-entered text into structured Changelog XML, eliminating the need for manual XML generation."
        sourceCodeBtn={{
          text: 'Source Code',
          link: 'https://github.com/jd0x0021/lcgenjd',
        }}
        liveViewBtn={{
          text: 'Live View',
          link: 'https://lcgenjd.pages.dev/',
        }}
        model={{
          type: 'laptop',
          alt: 'Lcgenjd - Liquibase Changelog Generator',
          textures: [
            {
              srcSet: `${lcgenjdPreview} 1280w, ${lcgenjdPreview} 2560w`,
              placeholder: lcgenjdPlaceHolder,
            },
          ],
        }}
        techStack={projectOneBadges}
      />

      <ProjectSummary
        id="project-2"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Paraject"
        description="This project management application tracks and organizes tasks, helping users enhance their productivity and stay focused on the main goal."
        sourceCodeBtn={{
          text: 'Source Code',
          link: 'https://github.com/jd0x0021/Paraject',
        }}
        liveViewBtn={{
          text: 'Download Link',
          link: 'https://github.com/jd0x0021/Paraject?tab=readme-ov-file#how-to-download',
        }}
        model={{
          type: 'laptop',
          alt: 'For Projects - Paraject.',
          textures: [
            {
              srcSet: `${parajectDesktopAppPreview} 1280w, ${parajectDesktopAppPreview} 2560w`,
              placeholder: parajectDesktopAppPlaceholder,
            },
          ],
        }}
        techStack={projectTwoBadges}
      />

      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Crave Co. Pizza"
        description="A responsive pizza shop website built with Bootstrap. Featuring an intuitive menu, and an embedded Google Maps section."
        sourceCodeBtn={{
          text: 'Source Code',
          link: 'https://github.com/jd0x0021/Pizza-Shop',
        }}
        liveViewBtn={{
          text: 'Live View',
          link: 'https://jd0x0021.github.io/Pizza-Shop/',
        }}
        model={{
          type: 'laptop',
          alt: "I'll take you to the pizza shop (Crave Co. Pizza).",
          textures: [
            {
              srcSet: `${pizzaShopWebsitePreview} 800w, ${pizzaShopWebsitePreview} 1920w`,
              placeholder: pizzaShopWebsitePlaceholder,
            },
          ],
        }}
        techStack={projectThreeBadges}
      />
    </div>
  );
};
