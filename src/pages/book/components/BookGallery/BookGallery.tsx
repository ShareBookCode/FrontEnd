import { useState, FC, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
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

  const handleCloseModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
    console.log("Modal closed");
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div className={styles.container}>
      <div className={styles.favoriteButtonWrapper}>
        <FavoriteButton />
      </div>
      <GallerySwiper
        images={images}
        initialIndex={mainImageIndex}
        isModal={false}
        onImageChange={handleImageChange}
        onMainImageClick={handleMainImageClick}
      />

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <button className={styles.closeButton} onClick={handleCloseModal}>
            <CloseOutlined />
          </button>
          <div className={styles.modalContent}>
            <GallerySwiper
              images={images}
              initialIndex={mainImageIndex}
              isModal={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};
