import { BookContent } from "./components/BookContent";
import styles from "./bookPage.module.scss";

export const BookPage = () => {
  return (
    <div className={styles.content}>
      <BookContent />
    </div>
  );
};
