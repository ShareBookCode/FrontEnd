import { Button } from "antd";
import styles from "./profileOwnButtons.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export function ProfileOwnButtons() {
  const { t } = useTranslation("profile");
  const navigate = useNavigate();

  return (
    <>
      <Button className={styles.settingsButton}>⚙️</Button>
      <Button type="primary" onClick={() => navigate("/createBook")}>
        {t("ownButtons.newAd")}
      </Button>
    </>
  );
}
