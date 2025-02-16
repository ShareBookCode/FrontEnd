import styles from "../bookCard.module.scss";
import { Card } from "antd";
import img1 from "../img/Image1.png";
import { BookDto } from "../../../../../services/api/sharebookApi.ts";
import { useAppSelector } from "../../../../../store.ts";

export function BookCard({ book }: { book: BookDto }) {
  // @ts-expect-error WIP
  const attachment = book.attachment;
  const genreMap = useAppSelector((state) => state.main.genreMap);

  return (
    <Card
      cover={
        <div className={styles.containerImage}>
          <img
            alt={book.title}
            src={
              attachment
                ? `data:image/${attachment.expansion?.slice(1) ?? "jpg"};base64,${attachment?.data}`
                : img1
            }
          />
        </div>
      }
      hoverable
      classNames={{
        cover: styles.cover,
      }}
    >
      <div className={styles.containerContent}>
        <div className={styles.containerInfoBook}>
          <div className={styles.title}>{book.title}</div>
          <a className={styles.author}>{book.author}</a>
        </div>
        {book.genre !== undefined && !!genreMap[book.genre] && (
          <p className={styles.location}>{genreMap[book.genre].name}</p>
        )}
      </div>
    </Card>
  );
}
