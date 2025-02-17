import { Dropdown } from "antd";
import styles from "../headerLite.module.scss";
import { useState } from "react";
import cn from "classnames";
import { SvgArrow } from "../../../assets/svg/SvgArrow";
import { useTranslation } from "react-i18next";

const languages = [
  { label: "Русский", key: "ru" },
  { label: "English", key: "en" },
];

const defaultLanguage = languages[0];

export function SwitchLanguages() {
  const [showListState, setShowListState] = useState(false);
  const { i18n } = useTranslation();

  const language = i18n.language ?? defaultLanguage.key;

  const handleMenuClick = ({ key }: { key: string }) => {
    i18n.changeLanguage(key);
  };

  return (
    <Dropdown
      overlayClassName={styles.language}
      menu={{
        items: languages,
        onClick: handleMenuClick,
      }}
      placement="bottomRight"
      trigger={["click"]}
      onOpenChange={(vis) => setShowListState(vis)}
    >
      <button
        className={cn(styles.buttonLanguage, {
          [styles.buttonLanguageActive]: showListState,
        })}
      >
        {languages.find((item) => item.key === language)?.label ??
          defaultLanguage.label}
        <SvgArrow showListState={showListState} />
      </button>
    </Dropdown>
  );
}
