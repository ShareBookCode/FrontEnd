import { Button } from "antd";
import styles from "./profileOwnButtons.module.scss";
import { useTranslation } from "react-i18next";

export function ProfileOwnButtons() {
  const { t } = useTranslation("profile");
  return (
    <>
      <Button className={styles.settingsButton}>⚙️</Button>
      <Button type="primary">{t("ownButtons.newAd")}</Button>
    </>
  );
}
