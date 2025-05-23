import { DecoderText } from '~/components/DecoderText';
import { Heading } from '~/components/Heading';
import { Section } from '~/components/Section';
import { tokens, useTheme } from '~/components/ThemeProvider';
import { Transition } from '~/components/Transition';
import { VisuallyHidden } from '~/components/VisuallyHidden';
import config from '~/config.json';
import { useScrollToHash } from '~/hooks/useScrollToHash';
import { useShowMouseScrollIndicator } from '~/hooks/useShowMouseScrollIndicator';
import { cssProps } from '~/utils/style';
import styles from './intro.module.css';

export function Intro({ id, sectionRef, ...rest }) {
  const { theme } = useTheme();
  const titleId = `${id}-title`;
  const scrollToHash = useScrollToHash();
  const showMouseScrollIndicator = useShowMouseScrollIndicator(sectionRef);

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
              href="/#projects"
              className={styles.scrollIndicator}
              data-status={status}
              data-hidden={showMouseScrollIndicator}
              onClick={handleScrollClick}
            >
              <VisuallyHidden>Scroll to projects</VisuallyHidden>
            </a>

            <a
              href="/#projects"
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
