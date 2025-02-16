import styles from "./Account.module.scss";
import {Select} from "antd";
import {useTranslation} from "react-i18next";


export function Account() {
  const {t} = useTranslation("profile")
  return (
    <div className={styles.settingsBlock}>
      <div className={styles.settingsItem}>
        <div className={styles.settingsItemBlockOfTitle}>
          <span className={styles.settingsTitle}>{t("language")}</span>
          <span className={styles.settingsCaption}>{t("chooseLanguagePlatform")}</span>
        </div>
        <Select value={['Русский', "Английский"]}/>
      </div>
      <div className={styles.settingsItem}>
        <div className={styles.settingsItemBlockOfTitle}>
          <span className={styles.settingsTitle}>{t("country")}</span>
          <span className={styles.settingsCaption}>{t("writeYourCounty")}</span>
        </div>
        <Select value={["Санкт-Петербург"]}/>
      </div>
    </div>
  )
}