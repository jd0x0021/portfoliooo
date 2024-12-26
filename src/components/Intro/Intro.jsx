import { useEffect, useState } from 'react';
import { DecoderText } from '~/components/DecoderText';
import { Heading } from '~/components/Heading';
import { Section } from '~/components/Section';
import { useTheme } from '~/components/ThemeProvider';
import { tokens } from '~/components/ThemeProvider/theme';
import { Transition } from '~/components/Transition';
import { VisuallyHidden } from '~/components/VisuallyHidden';
import config from '~/config.json';
import { useInterval } from '~/hooks/useInterval';
import { usePrevious } from '~/hooks/usePrevious';
import { useScrollToHash } from '~/hooks/useScrollToHash';
import { useShowMouseScrollIndicator } from '~/hooks/useShowMouseScrollIndicator';
import { cssProps } from '~/utils/style';
import styles from './intro.module.css';

export function Intro({ id, sectionRef, ...rest }) {
  const { theme } = useTheme();
  const { disciplines } = config;
  const [disciplineIndex, setDisciplineIndex] = useState(0);

  const prevTheme = usePrevious(theme);
  const introLabel = [disciplines.slice(0, -1).join(', '), disciplines.slice(-1)[0]].join(
    ', and '
  );
  const currentDiscipline = disciplines.find((item, index) => index === disciplineIndex);
  const titleId = `${id}-title`;

  const scrollToHash = useScrollToHash();
  const showMouseScrollIndicator = useShowMouseScrollIndicator(sectionRef);

  useInterval(
    () => {
      const index = (disciplineIndex + 1) % disciplines.length;
      setDisciplineIndex(index);
    },
    5000,
    theme
  );

  useEffect(() => {
    if (prevTheme && prevTheme !== theme) {
      setDisciplineIndex(0);
    }
  }, [theme, prevTheme]);

  const handleScrollClick = event => {
    event.preventDefault();
    scrollToHash(event.currentTarget.href);
  };

  return (
    <Section
      className={styles.intro}
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Transition in key={theme} timeout={3000}>
        {({ visible, status }) => (
          <>
            <header className={styles.text}>
              <h1 className={styles.name} data-visible={visible} id={titleId}>
                <DecoderText text={config.name} delay={500} />
              </h1>
              <Heading level={0} as="h2" className={styles.title}>
                <VisuallyHidden className={styles.label}>
                  {`${config.role} + ${introLabel}`}
                </VisuallyHidden>

                <span aria-hidden className={styles.row}>
                  <span
                    className={styles.word}
                    data-status={status}
                    style={cssProps({ delay: tokens.base.durationXS })}
                  >
                    A Creative
                  </span>
                  <span className={styles.line} data-status={status} />
                </span>

                <span
                  aria-hidden
                  className={styles.word}
                  data-status={status}
                  style={cssProps({ delay: tokens.base.durationXS })}
                >
                  Software Engineer
                </span>
              </Heading>
            </header>
            <a
              href="/#project-1"
              className={styles.scrollIndicator}
              data-status={status}
              data-hidden={showMouseScrollIndicator}
              onClick={handleScrollClick}
            >
              <VisuallyHidden>Scroll to projects</VisuallyHidden>
            </a>
            <a
              href="/#project-1"
              className={styles.mobileScrollIndicator}
              data-status={status}
              data-hidden={showMouseScrollIndicator}
              onClick={handleScrollClick}
            >
              <VisuallyHidden>Scroll to projects</VisuallyHidden>
              <svg
                aria-hidden
                stroke="currentColor"
                width="43"
                height="15"
                viewBox="0 0 43 15"
              >
                <path d="M1 1l20.5 12L42 1" strokeWidth="2" fill="none" />
              </svg>
            </a>
          </>
        )}
      </Transition>
    </Section>
  );
}
