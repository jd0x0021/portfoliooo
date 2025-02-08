import { useEffect } from 'react';
import config from '~/config.json';

export const useConsoleInfo = () => {
  useEffect(() => {
    console.info(
      `\n\n${config.ascii}\n\n`,
      `Taking a peek huh? Check out the source code: ${config.github}/portfoliooo\n\n`
    );
  }, []);
};
