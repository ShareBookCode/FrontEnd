import extraStyles from "./headerLite.module.scss";
import styles from "./header.module.scss";
import { Logo } from "./Logo";
import { SwitchLanguages } from "./SwitchLanguages";

export function HeaderLite() {
  return (
    <header className={styles.header}>
      <div className={extraStyles.container}>
        <Logo />
        <SwitchLanguages />
      </div>
    </header>
  );
}
