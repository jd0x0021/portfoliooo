import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { Icon } from '~/components/Icon';
import styles from './image-slider.module.css';

export const ImageSlider = ({ imageUrls }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollToPreviousSlide = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollToNextSlide = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className={styles.emblaViewport} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {imageUrls.map((imageUrl, index) => (
            <div className={styles.emblaSlide} key={index}>
              <img
                src={imageUrl}
                alt=""
                style={{
                  objectFit: 'cover',
                  objectPosition: 'left',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          ))}
        </div>

        <div className={styles.navigation}>
          <button onClick={scrollToPreviousSlide}>
            <Icon icon={'chevron-left'} />
          </button>
          <button onClick={scrollToNextSlide}>
            <Icon icon={'chevron-right'} />
          </button>
        </div>
      </div>
    </div>
  );
};
