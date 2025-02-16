import styles from "./account.module.scss";
import {Select} from "antd";
import {useTranslation} from "react-i18next";


export function Account() {
  const {t} = useTranslation("profile")
  return (
    <div className={styles.settingsBlock}>
      <div className={styles.settingsItem}>
        <div>
          <div className={styles.settingsTitle}>{t("language")}</div>
          <div className={styles.settingsCaption}>{t("chooseLanguagePlatform")}</div>
        </div>
        <Select value={['Русский', "Английский"]}/>
      </div>
      <div className={styles.settingsItem}>
        <div>
          <div className={styles.settingsTitle}>{t("country")}</div>
          <div className={styles.settingsCaption}>{t("writeYourCounty")}</div>
        </div>
        <Select value={["Санкт-Петербург"]}/>
      </div>
    </div>
  )
}