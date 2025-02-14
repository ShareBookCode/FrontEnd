import styles from "../auth.module.scss";
import extraStyles from "./goToEmail.module.scss";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

export function GoToEmail() {
  const { t } = useTranslation("auth");

  return (
    <div className={extraStyles.containerContent}>
      <h1 className={extraStyles.title}>
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
