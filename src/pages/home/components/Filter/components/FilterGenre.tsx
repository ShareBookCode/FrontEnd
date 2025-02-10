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
  { title: "От ShareBook", url: "/filter/FromShareBook", id: "2" },
  { title: "Детективы", url: "/filter/Detectives", id: "3" },
  { title: "Романы", url: "/filter/Novels", id: "4" },
  { title: "Научные", url: "/filter/Scientific", id: "5" },
  { title: "Исскуство", url: "/filter/Art", id: "6" },
  { title: "Учебные", url: "/filter/Tutorials", id: "7" },
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
