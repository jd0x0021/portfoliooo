import { useReducedMotion } from 'framer-motion';
import { useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useScrollToHash() {
  const scrollTimeout = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const scrollToHash = useCallback(
    (hash, onDone) => {
      // Possible values of 'hash':
      // 1. base-url/#hash-value
      // 2. #hash-value
      const id = hash.split('#')[1];
      const targetElement = document.getElementById(id);

      targetElement.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });

      const handleScroll = () => {
        clearTimeout(scrollTimeout.current);

        scrollTimeout.current = setTimeout(() => {
          window.removeEventListener('scroll', handleScroll);

          if (window.location.pathname === location.pathname) {
            onDone?.();
            navigate(`${location.pathname}#${id}`);
          }
        }, 50);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout.current);
      };
    },
    [reduceMotion]
  );

  return scrollToHash;
}
