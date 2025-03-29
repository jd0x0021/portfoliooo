import { forwardRef } from 'react';
import { classes } from '~/utils/style';
import styles from './link.module.css';

export const Link = forwardRef(
  ({ rel, target, children, secondary, className, href, ...rest }, ref) => {
    const isExternal = href?.includes('://');
    const relValue = rel || (isExternal ? 'noreferrer noopener' : undefined);
    const targetValue = target || (isExternal ? '_blank' : undefined);

    const linkProps = {
      className: classes(styles.link, className),
      ['data-secondary']: secondary,
      rel: relValue,
      href: href,
      target: targetValue,
      ref: ref,
      ...rest,
    };

    return (
      <a {...linkProps} href={href}>
        {children}
      </a>
    );
  }
);

// forwardRef-wrapped components do not automatically have a displayName property in React. Having a display name
// helps us identify the component in the react developer tools, or in stack traces (making it easier to debug).
Link.displayName = 'Link';
