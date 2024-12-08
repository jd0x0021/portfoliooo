import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
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
            <div className={styles.emblaSlide}>
              <img
                key={index}
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
          <button className="embla__prev" onClick={scrollToPreviousSlide}>
            Prev
          </button>
          <button className="embla__next" onClick={scrollToNextSlide}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
