import { forwardRef } from 'react';
import { classes } from '~/utils/style';
import styles from './icon.module.css';
import sprites from './icons.svg';

export const Icon = forwardRef(({ icon, className, size, ...rest }, ref) => {
  // remove after debugging (in v2 prod branch)
  console.log(sprites);

  return (
    <svg
      aria-hidden
      ref={ref}
      className={classes(styles.icon, className)}
      width={size || 24}
      height={size || 24}
      {...rest}
    >
      <use href={`${sprites}#${icon}`} crossOrigin="anonymous" />
    </svg>
  );
});
