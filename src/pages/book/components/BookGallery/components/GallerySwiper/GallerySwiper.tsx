import React, { useState, useRef, useEffect, FC, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { BookImage } from "../../../../../../types/book";
import styles from "./gallerySwiper.module.scss";
import "swiper/css";

type GallerySwiperProps = {
  images: BookImage[];
  initialIndex?: number;
  maxThumbnails: number;
  thumbnailsAlignment: "left" | "center";
  arrowsPosition: "overlay" | "sides";
  onImageChange?: (index: number) => void;
  onMainImageClick?: () => void;
};

export const GallerySwiper: FC<GallerySwiperProps> = ({
  images,
  initialIndex = 0,
  maxThumbnails,
  thumbnailsAlignment,
  arrowsPosition,
  onImageChange,
  onMainImageClick,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType>();
  console.log(activeIndex);

  const showArrows = images.length > maxThumbnails;

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
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isEnd) {
      swiperRef.current?.slideNext();
      console.log("Next clicked");
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
    <div className={styles.container}>
      <div className={styles.mainImage} onClick={handleMainImageClick}>
        <img src={images[activeIndex].mediumImageUrl} alt="" />
      </div>

      <div
        className={`${styles.thumbnails} ${
          thumbnailsAlignment === "center"
            ? styles.thumbnailsCenter
            : styles.thumbnailsLeft
        }`}
      >
        {showArrows && (
          <button
            type="button"
            disabled={isBeginning}
            className={`${styles.arrow} ${
              arrowsPosition === "overlay"
                ? styles.arrowOverlayPrev
                : styles.arrowSidesPrev
            } ${isBeginning ? styles.arrowDisabled : ""}`}
            onClick={handlePrevClick}
          >
            <LeftOutlined className={styles.arrowIcon} />
          </button>
        )}

        <Swiper
          slidesPerView={maxThumbnails}
          spaceBetween={9}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            handleSlideChange();
          }}
          onSlideChange={handleSlideChange}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={image.id}
              className={index === activeIndex ? "swiper-slide-active" : ""}
              onClick={(e) => handleThumbnailClick(e, index)}
            >
              <img src={image.smallImageUrl} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>

        {showArrows && (
          <button
            type="button"
            disabled={isEnd}
            className={`${styles.arrow} ${
              arrowsPosition === "overlay"
                ? styles.arrowOverlayNext
                : styles.arrowSidesNext
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
