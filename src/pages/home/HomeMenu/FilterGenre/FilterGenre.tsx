import { NavLink, useSearchParams } from "react-router";
import styles from "../filter.module.scss";
import { useTranslation } from "react-i18next";
import cn from "classnames";

interface Genre {
  title: string;
  url: string;
  id: string;
}

export function FilterGenre() {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation("home");

  const genres: Genre[] = [
    { title: t("filters.genre.all"), url: "/", id: "1" },
    { title: t("filters.genre.detectives"), url: "/genre/11", id: "3" },
    { title: t("filters.genre.novels"), url: "/genre/1", id: "4" },
    { title: t("filters.genre.scientific"), url: "/genre/29", id: "5" },
    { title: t("filters.genre.horrors"), url: "/genre/15", id: "6" },
    { title: t("filters.genre.textbook"), url: "/genre/28", id: "7" },
  ];

  return (
    <div className={styles.containerGenres}>
      {genres.map((genre) => (
        <NavLink
          key={genre.id}
          to={{ pathname: genre.url, search: searchParams.toString() }}
          className={({ isActive }) =>
            cn(
              styles.buttonGenre,
              isActive ? styles.buttonActive : styles.buttonDefault,
            )
          }
        >
          {genre.title}
        </NavLink>
      ))}
    </div>
  );
}
