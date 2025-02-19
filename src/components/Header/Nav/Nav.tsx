import styles from "../header.module.scss";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

interface MainMenuItem {
  title: string;
  url: string;
}

export function Nav() {
  const { t } = useTranslation("header");
  const mainMenuItems: MainMenuItem[] = [
    { title: `${t("nav.titles.main")}`, url: "/" },
    { title: `${t("nav.titles.favourites")}`, url: "/favourites" },
    { title: `${t("nav.titles.chats")}`, url: "/chats" },
    { title: `${t("nav.titles.createBook")}`, url: "/createBook" },
  ];
  return (
    <nav>
      <ul className={styles.navBar}>
        {mainMenuItems.map((page, idx) => (
          <li key={idx}>
            <NavLink
              to={page.url}
              className={(isActive) =>
                isActive.isActive ? styles.activeMenuItem : styles.menuItem
              }
            >
              {page.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
