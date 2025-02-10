import { Button, Form, Input } from "antd";
import styles from "../auth.module.scss";
import extraStyles from "./signUpName.module.scss";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

export function SignUpName() {
  const { t } = useTranslation("auth");
  const [, setSearchParams] = useSearchParams();

  return (
    <div className={styles.containerContent}>
      <h1 className={styles.title}>{t("titleOneScreen")}</h1>
      <div>
        <Form autoComplete="off" className={styles.containerForm}>
          <Form.Item name="name">
            <Input placeholder={t("name")} />
          </Form.Item>
          <Form.Item name="city">
            <Input placeholder={t("city")} />
          </Form.Item>
        </Form>
        {/*<Checkbox>Не хочу указывать город</Checkbox>*/}
        <div className={extraStyles.containerCheckbox}>
          <input type="checkbox" className={extraStyles.checkbox} />
          {t("textCheckbox")}
        </div>
        <Button
          onClick={() => setSearchParams({ auth: "signUpPassword" })}
          className={styles.buttonAuth}
          type="primary"
          htmlType="submit"
        >
          {t("buttonNext")}
        </Button>
      </div>
    </div>
  );
}
