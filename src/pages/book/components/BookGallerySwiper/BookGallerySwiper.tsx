import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { BookImage } from "../../../../types/book";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./bookGallerySwiper.module.scss";
import { FavoriteButton } from "../FavoriteButton";

type Props = {
  images: BookImage[];
};

export const BookGallerySwiper = ({ images }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setFullscreenImage(imageUrl);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.mainImageWrapper}>
        {!fullscreenImage && (
          <div className={styles.favoriteButtonWrapper}>
            <FavoriteButton />
          </div>
        )}
        <Swiper
          onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
          modules={[FreeMode, Navigation, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          navigation={true}
          className={styles.mainSwiper}
          allowTouchMove={false}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div
                className={styles.imageContainer}
                onClick={() => handleImageClick(image.imageUrl)}
              >
                <img src={image.imageUrl} alt="Изображение книги" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[FreeMode, Navigation, Thumbs]}
        spaceBetween={9}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        className={styles.thumbsSwiper}
        width={315}
        navigation={{
          nextEl: ".swiper-thumb-next",
          prevEl: ".swiper-thumb-prev",
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <img src={image.imageUrl} alt="Миниатюра" />
          </SwiperSlide>
        ))}
        <div className="swiper-thumb-prev"></div>
        <div className="swiper-thumb-next"></div>
      </Swiper>

      {fullscreenImage && (
        <div
          className={styles.fullscreenOverlay}
          onClick={handleCloseFullscreen}
        >
          <div
            className={styles.fullscreenContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={fullscreenImage} alt="Увеличенное изображение" />
            <button
              className={styles.closeButton}
              onClick={handleCloseFullscreen}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
