import styles from "./Account.module.scss";
import {Select} from "antd";


export const Account = () => {
  return (
    <div className={styles.settingsBlock}>
      <div className={styles.settingsItem}>
        <div className={styles.settingsItemBlockOfTitle}>
          <span className={styles.settingsTitle}>Язык</span>
          <span className={styles.settingsCaption}>Выберете язык платформы</span>
        </div>
        <Select value={['Русский', "Английский"]}/>
      </div>
      <div className={styles.settingsItem}>
        <div className={styles.settingsItemBlockOfTitle}>
          <span className={styles.settingsTitle}>Город</span>
          <span className={styles.settingsCaption}>Укажите город для персонализации объявлений</span>
        </div>
        <Select value={["Санкт-Петербург"]}/>
      </div>
    </div>
  )
}