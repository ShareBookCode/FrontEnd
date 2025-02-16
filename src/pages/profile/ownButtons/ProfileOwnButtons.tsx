import { Button } from "antd";
import styles from "./profileOwnButtons.module.scss";

interface IProfileOwnButtons {
  setIsOpenSettingModal: (isOpenSettingModal: boolean) => void
}

export function ProfileOwnButtons({ setIsOpenSettingModal}: IProfileOwnButtons) {
  return (
    <>
      <Button onClick={() => setIsOpenSettingModal(true)} className={styles.settingsButton}>⚙️</Button>
      <Button type="primary">Новое объявление</Button>
    </>
  );
}
