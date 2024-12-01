import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

export const Modal = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!dialogRef.current) {
      return;
    }

    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog ref={dialogRef} className={styles.dialogModal} data-visible={isOpen}>
      <div>Modal</div>
      <br></br>
      <button onClick={onClose}>Close</button>
    </dialog>,
    document.getElementById('modal')
  );
};
