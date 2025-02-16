import styles from "../home/home.module.scss";
import { FilterComponent } from "../home/components/Filter";
import { BookCardComponent } from "../home/components/BookCard";
import { useSearchWithFiltersQuery } from "../../services/api/sharebookApi.ts";
import { useParams } from "react-router";

export function Genre() {
  const { genreId } = useParams();

  const { data } = useSearchWithFiltersQuery({
    filters: {
      genre: +(genreId ?? 1),
    },
  });

  return (
    <div className={styles.container}>
      <FilterComponent />
      <BookCardComponent books={data} />
    </div>
  );
}
