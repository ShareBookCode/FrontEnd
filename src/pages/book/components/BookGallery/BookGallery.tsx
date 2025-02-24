import { useState, FC } from "react";
import { GallerySwiper } from "./components/GallerySwiper";
import { FavoriteButton } from "../FavoriteButton";
import { BookImage } from "../../../../types/book";
import styles from "./bookGallery.module.scss";

type BookGalleryProps = {
  images: BookImage[];
};

export const BookGallery: FC<BookGalleryProps> = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handleMainImageClick = () => {
    setIsModalOpen(true);
    console.log("Main image clicked, modal should open");
  };

  const handleImageChange = (index: number) => {
    setMainImageIndex(index);
    console.log("Image changed to index:", index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.favoriteButtonWrapper}>
        <FavoriteButton />
      </div>
      <GallerySwiper
        images={images}
        initialIndex={mainImageIndex}
        maxThumbnails={4}
        thumbnailsAlignment="left"
        arrowsPosition="overlay"
        onImageChange={handleImageChange}
        onMainImageClick={handleMainImageClick}
      />
    </div>
  );
};
