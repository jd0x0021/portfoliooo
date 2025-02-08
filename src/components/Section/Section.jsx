import { forwardRef } from 'react';
import { classes } from '~/utils/style';
import styles from './section.module.css';

export const Section = forwardRef(
  ({ as: Component = 'div', children, className, ...rest }, ref) => (
    <Component className={classes(styles.section, className)} ref={ref} {...rest}>
      {children}
    </Component>
  )
);

// forwardRef-wrapped components do not automatically have a displayName property in React. Having a display name
// helps us identify the component in the react developer tools, or in stack traces (making it easier to debug).
Section.displayName = 'Section';
