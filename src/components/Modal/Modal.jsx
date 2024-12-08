import { createPortal } from 'react-dom';
import { default as certificateOfAppreciation } from '~/assets/img/software-engineer-portfolio-seminar/certificate-of-appreciation.png';
import { default as seminarPoster } from '~/assets/img/software-engineer-portfolio-seminar/seminar-poster.png';
import { ImageSlider } from '~/components/ImageSlider';
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
          </div>
        </div>
      )}
    </Transition>,
    document.getElementById('modal')
  );
};
