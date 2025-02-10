import styles from "../auth.module.scss";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

export function GoToEmail() {
  const { t } = useTranslation("auth");

  return (
    <div className={styles.containerContent}>
      <h1 className={styles.title}>
        {t("titleGoToEmail")} {"sharebook.inc@gmail.com"}
      </h1>
      <div className={styles.containerForm}>
        <Button className={styles.buttonAuth} type="primary" htmlType="submit">
          {t("buttonRepeatLetter")}
        </Button>
      </div>
    </div>
  );
}
