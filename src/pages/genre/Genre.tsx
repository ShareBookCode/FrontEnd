import styles from "../home/home.module.scss";
import { HomeMenu } from "../home/HomeMenu";
import { BookList } from "../../components/BookList";
import { useSearchWithFiltersMutation } from "../../services/api/sharebookApi.ts";
import { useParams } from "react-router";
import { useEffect } from "react";

export function Genre() {
  const { genreId } = useParams();

  const [searchWithFilters, { data }] = useSearchWithFiltersMutation({});

  useEffect(() => {
    searchWithFilters({
      bookFiltersRequest: { genre: +(genreId ?? 1) },
    }).unwrap();
  }, [genreId, searchWithFilters]);

  return (
    <div className={styles.container}>
      <HomeMenu />
      <BookList books={data} />
    </div>
  );
}
