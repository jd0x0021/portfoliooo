import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { default as certificateOfAppreciation } from '~/assets/img/software-engineer-portfolio-seminar/certificate-of-appreciation.png';
import { default as seminarPoster } from '~/assets/img/software-engineer-portfolio-seminar/seminar-poster.png';
import { Divider } from '~/components/Divider';
import { Heading } from '~/components/Heading';
import { Icon } from '~/components/Icon';
import { ImageSlider } from '~/components/ImageSlider';
import { Link } from '~/components/Link';
import { Text } from '~/components/Text';
import { tokens } from '~/components/ThemeProvider/theme';
import { Transition } from '~/components/Transition';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import styles from './modal.module.css';

const IMAGES = [seminarPoster, certificateOfAppreciation];

export const Modal = ({ isOpen, onClose }) => {
  /**
   * Close the modal when we press the 'Esc' key.
   *
   * @param {React.KeyboardEvent} event
   */
  const handleEscKeyPress = event => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  /**
   * The reason we add the event listener to the global window object instead of directly on
   * the ref of the modal element is because we want the Esc key to trigger the modal's closing
   * action no matter where the focus currently is — even if the modal content isn't focused.
   */
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEscKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [isOpen]);

  return createPortal(
    <Transition unmount in={isOpen} timeout={msToNum(tokens.base.durationL)}>
      {({ visible, nodeRef }) => (
        <div
          className={styles.modal}
          data-visible={visible}
          ref={nodeRef}
          onClick={onClose}
        >
          <div
            className={styles.modalContent}
            data-visible={visible}
            style={cssProps({
              transitionDelay: numToMs(Number(msToNum(tokens.base.durationS)) + 0 * 50),
            })}
            onClick={event => {
              // This will prevent the click event from reaching (bubbling up) to the parent
              // element, so that the parent element's onClick event will not get triggered.
              // (Ensuring the modal doesn't close when interacting with the modal's content)
              event.stopPropagation();
            }}
          >
            <div className={styles.modalHeader}>
              <div className={styles.title}>
                <div className={styles.tag} aria-hidden>
                  <Divider
                    notchWidth="64px"
                    notchHeight="8px"
                    collapsed={!visible}
                    collapseDelay={420}
                  />

                  <div className={styles.tagText} data-visible={visible}>
                    November 12, 2022
                  </div>
                </div>

                <Heading className={styles.title} data-visible={visible} level={5}>
                  Setting up your dev portfolio
                </Heading>
              </div>

              <button onClick={onClose}>
                <Icon className={styles.closeIcon} icon="close" />
              </button>
            </div>

            <div className={styles.imageSlider}>
              <ImageSlider imageUrls={IMAGES} />
            </div>

            <div className={styles.modalInfo}>
              <Text data-visible={visible} size="l" as="p">
                On November 12, 2022, I conducted a seminar at University of Bohol focused
                on building a software developer portfolio, covering everything from
                initial setup to deployment.
              </Text>

              <Text data-visible={visible} size="l" as="p">
                I aimed to guide students in creating an effective portfolio that would
                help them secure a software engineering job.
              </Text>

              <Link href="https://johndavedalmao-12nov2022.pages.dev/" target="_blank">
                Click here to view the seminar's result.
              </Link>
            </div>
          </div>
        </div>
      )}
    </Transition>,
    document.getElementById('modal')
  );
};
