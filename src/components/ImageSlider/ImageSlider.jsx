import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { default as sprTexturePlaceholder } from '~/assets/img/projects/spr-lesson-builder-dark-placeholder.jpg';
import { Icon } from '~/components/Icon';
import { Image } from '~/components/Image';
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
              <Image
                cover
                reveal
                delay={100}
                placeholder={sprTexturePlaceholder}
                src={imageUrl}
                alt=""
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
