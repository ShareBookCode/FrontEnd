import React, { useState, useRef, useEffect, FC, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { BookImage } from "../../../../../../types/book";
import styles from "./gallerySwiper.module.scss";
import "swiper/css";

interface GallerySwiperProps {
  images: BookImage[];
  initialIndex?: number;
  isModal?: boolean;
  onImageChange?: (index: number) => void;
  onMainImageClick?: () => void;
}

export const GallerySwiper: FC<GallerySwiperProps> = ({
  images,
  initialIndex = 0,
  isModal = false,
  onImageChange,
  onMainImageClick,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType>();

  const maxThumbnails = isModal ? 7 : 4;
  const mainImageSrc =
    images[activeIndex][isModal ? "largeImageUrl" : "mediumImageUrl"];
  const isLessThanMaxThumbnails = images.length <= maxThumbnails;

  const handleThumbnailClick = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      if (index !== activeIndex) {
        setActiveIndex(index);
        onImageChange?.(index);
        console.log("Thumbnail clicked:", index);
      }
    },
    [activeIndex, onImageChange]
  );

  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isBeginning) {
      swiperRef.current?.slidePrev();
      console.log("Prev clicked");
    } else {
      console.log("Prev button is disabled");
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isEnd) {
      swiperRef.current?.slideNext();
      console.log("Next clicked");
    } else {
      console.log("Next button is disabled");
    }
  };

  const handleMainImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMainImageClick?.();
  };

  const handleSlideChange = () => {
    setIsBeginning(swiperRef.current?.isBeginning ?? true);
    setIsEnd(swiperRef.current?.isEnd ?? false);
  };

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  return (
    <div
      className={`${styles.container} ${isModal ? styles.modalContainer : ""}`}
    >
      <div
        className={`${styles.mainImage} ${isModal ? styles.mainImageNoBorderRadius : ""}`}
        onClick={handleMainImageClick}
      >
        <img src={mainImageSrc} alt="" />
      </div>

      <div
        className={`${styles.thumbnails} ${
          styles[isModal ? "thumbnailsCenter" : "thumbnailsLeft"]
        }`}
      >
        {!isLessThanMaxThumbnails && (
          <button
            type="button"
            disabled={isBeginning}
            className={`${styles.arrow} ${
              styles[isModal ? "arrowSidesPrev" : "arrowOverlayPrev"]
            } ${isBeginning ? styles.arrowDisabled : ""}`}
            onClick={handlePrevClick}
          >
            <LeftOutlined className={styles.arrowIcon} />
          </button>
        )}

        <Swiper
          slidesPerView={maxThumbnails}
          spaceBetween={9}
          watchSlidesProgress={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            handleSlideChange();
          }}
          onSlideChange={handleSlideChange}
          className={isModal && isLessThanMaxThumbnails ? styles.center : ""}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={image.id}
              className={index === activeIndex ? styles.activeSlide : ""}
              onClick={(e) => handleThumbnailClick(e, index)}
            >
              <img src={image.smallImageUrl} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>

        {!isLessThanMaxThumbnails && (
          <button
            type="button"
            disabled={isEnd}
            className={`${styles.arrow} ${
              styles[isModal ? "arrowSidesNext" : "arrowOverlayNext"]
            } ${isEnd ? styles.arrowDisabled : ""}`}
            onClick={handleNextClick}
          >
            <RightOutlined className={styles.arrowIcon} />
          </button>
        )}
      </div>
    </div>
  );
};
