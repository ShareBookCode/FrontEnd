import { NavLink, useSearchParams } from "react-router";
import styles from "../filter.module.scss";
import cn from "classnames";

interface Genre {
  title: string;
  url: string;
  id: string;
}

const genres: Genre[] = [
  { title: "Все", url: "/", id: "1" },
  { title: "Детективы", url: "/genre/11", id: "3" },
  { title: "Романы", url: "/genre/1", id: "4" },
  { title: "Научные", url: "/genre/29", id: "5" },
  { title: "Ужасы", url: "/genre/15", id: "6" },
  { title: "Учебник", url: "/genre/28", id: "7" },
];

export function FilterGenre() {
  const [searchParams] = useSearchParams();

  return (
    <div className={styles.containerGenres}>
      {genres.map((genre) => (
        <NavLink
          key={genre.id}
          to={{ pathname: genre.url, search: searchParams.toString() }}
          className={(isActive) =>
            cn(styles.buttonGenre, {
              [styles.buttonActive]: isActive.isActive,
              [styles.buttonDefault]: !isActive.isActive,
            })
          }
        >
          {genre.title}
        </NavLink>
      ))}
    </div>
  );
}
