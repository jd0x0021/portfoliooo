import { forwardRef } from 'react';
import { Icon } from '~/components/Icon';
import { Loader } from '~/components/Loader';
import { Transition } from '~/components/Transition';
import { classes } from '~/utils/style';
import styles from './button.module.css';

function isExternalLink(href) {
  return href?.includes('://');
}

export const Button = forwardRef(({ href, ...rest }, ref) => {
  if (isExternalLink(href) || !href) {
    return <ButtonContent href={href} ref={ref} {...rest} />;
  }

  return (
    <ButtonContent
      // unstable_viewTransition
      // as={Link}
      prefetch="intent"
      href={href}
      ref={ref}
      {...rest}
    />
  );
});

const ButtonContent = forwardRef(
  (
    {
      className,
      as,
      secondary,
      loading,
      loadingText = 'loading',
      icon,
      iconEnd,
      iconHoverShift,
      iconOnly,
      children,
      rel,
      target,
      href,
      disabled,
      ...rest
    },
    ref
  ) => {
    const isExternal = isExternalLink(href);
    const defaultComponent = href ? 'a' : 'button';
    const Component = as || defaultComponent;

    return (
      <Component
        className={classes(styles.button, className)}
        data-loading={loading}
        data-icon-only={iconOnly}
        data-secondary={secondary}
        data-icon={icon}
        href={href}
        rel={rel || isExternal ? 'noopener noreferrer' : undefined}
        target={target || isExternal ? '_blank' : undefined}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {!!icon && (
          <Icon
            className={styles.icon}
            data-start={!iconOnly}
            data-shift={iconHoverShift}
            icon={icon}
          />
        )}
        {!!children && <span className={styles.text}>{children}</span>}
        {!!iconEnd && (
          <Icon
            className={styles.icon}
            data-end={!iconOnly}
            data-shift={iconHoverShift}
            icon={iconEnd}
          />
        )}
        <Transition unmount in={loading}>
          {({ visible, nodeRef }) => (
            <Loader
              ref={nodeRef}
              className={styles.loader}
              size={32}
              text={loadingText}
              data-visible={visible}
            />
          )}
        </Transition>
      </Component>
    );
  }
);

// forwardRef-wrapped components do not automatically have a displayName property in React. Having a display name
// helps us identify the component in the react developer tools, or in stack traces (making it easier to debug).
Button.displayName = 'Button';
ButtonContent.displayName = 'ButtonContent';
