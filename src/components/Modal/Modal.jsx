import { createPortal } from 'react-dom';
import { default as certificateOfAppreciation } from '~/assets/img/software-engineer-portfolio-seminar/certificate-of-appreciation.png';
import { default as seminarPoster } from '~/assets/img/software-engineer-portfolio-seminar/seminar-poster.png';
import { ImageSlider } from '~/components/ImageSlider';
import { Link } from '~/components/Link';
import { Text } from '~/components/Text';
import { tokens } from '~/components/ThemeProvider/theme';
import { Transition } from '~/components/Transition';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import styles from './modal.module.css';

const IMAGES = [seminarPoster, certificateOfAppreciation];

export const Modal = ({ isOpen, onClose }) => {
  return createPortal(
    <Transition unmount in={isOpen} timeout={msToNum(tokens.base.durationL)}>
      {({ visible, nodeRef }) => (
        <div className={styles.modal} data-visible={visible} ref={nodeRef}>
          <div
            className={styles.modalContent}
            data-visible={visible}
            style={cssProps({
              transitionDelay: numToMs(Number(msToNum(tokens.base.durationS)) + 0 * 50),
            })}
          >
            <button onClick={onClose}>close</button>

            <ImageSlider imageUrls={IMAGES} />

            <Text className={styles.description} data-visible={visible} size="l" as="p">
              On November 12, 2022, I conducted a seminar at University of Bohol focused
              on building a software developer portfolio, covering everything from initial
              setup to deployment.
            </Text>

            <Text className={styles.description} data-visible={visible} size="l" as="p">
              I aimed to guide students in creating an effective portfolio that would help
              them secure a software engineering job.
            </Text>

            <Link href="https://johndavedalmao-12nov2022.pages.dev/" target="_blank">
              Click here to view the seminar's result.
            </Link>
          </div>
        </div>
      )}
    </Transition>,
    document.getElementById('modal')
  );
};
