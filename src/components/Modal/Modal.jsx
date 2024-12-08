import { createPortal } from 'react-dom';
import { tokens } from '~/components/ThemeProvider/theme';
import { Transition } from '~/components/Transition';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import styles from './modal.module.css';

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
          </div>
        </div>
      )}
    </Transition>,
    document.getElementById('modal')
  );
};
