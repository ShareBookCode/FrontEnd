import styles from "./bookCard.module.scss";
import { BookDto, BooksApiResponse } from "../../services/api/sharebookApi.ts";
import { BookCard } from "./BookCard";

interface Props {
  books?: BooksApiResponse;
}

export function BookList({ books }: Props) {
  return (
    <div className={styles.container}>
      {(books as unknown as BookDto[])?.map((book) => {
        // @ts-expect-error WIP
        const bookId = book.bookId;
        return <BookCard book={book} key={bookId} />;
      })}
    </div>
  );
}
