import styles from "./header.module.scss";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import { SearchInput } from "./SearchInput";
import { Avatar } from "./Avatar";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <Nav />
        <div className={styles.blank}></div>
        <SearchInput />
        <Avatar />
      </div>
    </header>
  );
}
