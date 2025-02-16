import styles from "./AboutMySelf.module.scss";
import {Button, Input} from "antd";
import avatar from "../info/nikolay.png"
import {useTranslation} from "react-i18next";

export function AboutMySelf() {
  const {t} = useTranslation("profile")
  return (
    <>
      <div className={styles.blockAvatar}>
        <img
          src={avatar}
          className={styles.avatar}
          alt="avatar"/>
        <div>
          <Button danger type="link">{t("deletePhoto")}</Button>
          <Button type="link">{t("changePhoto")}</Button>
        </div>
      </div>
      <form className={styles.form}>
        <div>
          <span className={styles.titleOfInput}>{t("nameAndUsername")}</span>
          <div className={styles.blockOfNameAndLoginInput}>
            <Input placeholder={t("name")}/>
            <Input placeholder={t("username")}/>
          </div>
        </div>
        <div>
          <span className={styles.titleOfInput}>{t("tellAboutYou")}</span>
          <Input.TextArea rows={5} autoSize={false}/>
        </div>
        <div className={styles.blockOfButton}>
          <Button type="primary">{t("save")}</Button>
        </div>
      </form>
    </>
  )
}