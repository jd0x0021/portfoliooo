import { classes } from '~/utils/style';
import styles from './badge.module.css';

const Badge = ({ badge }) => {
  return (
    <div className={styles.badge}>
      <img src={badge.iconSource} />
      <span>{badge.name}</span>
    </div>
  );
};

export const Badges = ({ badges, visible, className }) => {
  return (
    <div className={classes(styles.badges, className)} data-visible={visible}>
      {badges?.map(badge => {
        return <Badge key={badge.name} badge={badge} />;
      })}
    </div>
  );
};
