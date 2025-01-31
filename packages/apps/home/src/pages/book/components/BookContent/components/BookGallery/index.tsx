import { Image } from "antd";
import styles from "./styles.module.scss";

interface BookGalleryProps {
  mainImage: string;
  thumbnails: string[];
}

export const BookGallery = ({ mainImage, thumbnails }: BookGalleryProps) => {
  const visibleThumbnails = thumbnails.slice(0, 4);
  const additionalCount = thumbnails.length > 4 ? thumbnails.length - 3 : 0;

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.mainImageWrapper}>
        <Image
          src={mainImage}
          alt="Обложка книги"
          className={styles.mainImage}
          preview={false}
        />
      </div>

      <div className={styles.thumbnailsContainer}>
        {visibleThumbnails.map((thumbnail, index) => (
          <div
            key={index}
            className={`${styles.thumbnail} ${index === 3 && additionalCount > 0 ? styles.blurred : ""}`}
          >
            <img src={thumbnail} alt={`Изображение книги ${index + 1}`} />
            {index === 3 && additionalCount > 0 && (
              <div className={styles.overlay}>
                <span>+{additionalCount}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
