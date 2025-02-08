import { forwardRef } from 'react';
import { classes } from '~/utils/style';
import styles from './icon.module.css';

export const Icon = forwardRef(({ icon, className, size, ...rest }, ref) => {
  return (
    <svg
      aria-hidden
      ref={ref}
      className={classes(styles.icon, className)}
      width={size || 24}
      height={size || 24}
      {...rest}
    >
      <use href={`./icons/icons.svg#${icon}`} />
    </svg>
  );
});

// forwardRef-wrapped components do not automatically have a displayName property in React. Having a display name
// helps us identify the component in the react developer tools, or in stack traces (making it easier to debug).
Icon.displayName = 'Icon';
