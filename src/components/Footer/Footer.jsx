import { Link } from '~/components/Link';
import { Text } from '~/components/Text';
import config from '~/config.json';
import { classes } from '~/utils/style';
import styles from './footer.module.css';

export const Footer = ({ className }) => (
  <footer className={classes(styles.footer, className)}>
    <Text size="s" align="center">
      <div className={styles.date}>{`© ${new Date().getFullYear()} ${config.name}.`}</div>
    </Text>

    <Text size="s" align="center">
      <Link className={styles.link} href={`${config.github}/portfoliooo`} target="_blank">
        Crafted by yours truly
      </Link>

      <span>
        , inspired by{' '}
        <Link
          secondary
          className={styles.link}
          href="https://github.com/HamishMW/portfolio"
          target="_blank"
        >
          Hamish Williams
        </Link>
        .
      </span>
    </Text>
  </footer>
);
