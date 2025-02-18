import styles from "./filter.module.scss";
import { FilterGenre } from "./FilterGenre";
import { FilterType } from "./FilterType";

export function HomeMenu() {
  return (
    <div className={styles.container}>
      <FilterGenre />
      <FilterType />
    </div>
  );
}
