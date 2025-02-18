import { BookImage } from "../../../../types/book";
import styles from "./bookGallery.module.scss";

type Props = {
  images: BookImage[];
};
export const BookGallery = ({images}: Props) => {
  const visibleThumbnails = images.slice(0, 4);
  const additionalCount = images.length > 4 ? images.length - 3 : 0;

  return (
    <div className={styles.galleryContainer}>
      <img
        className={styles.mainImage}
        src={images[0].imageUrl}
        alt="Обложка книги"
      />

      <div className={styles.thumbnailsContainer}>
        {visibleThumbnails.map(({ id, imageUrl }, index) => (
          <div key={id} className={styles.relative}>
            <img
              className={styles.thumbnailImage}
              src={imageUrl}
              alt={"Изображение книги"}
            />
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
