import { Button, Form, FormProps, Input } from "antd";
import styles from "../auth.module.scss";
import extraStyles from "./signUpName.module.scss";
import { useNavigate, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

export function SignUpName() {
  const { t } = useTranslation("auth");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const onFinish: FormProps["onFinish"] = (values) => {
    searchParams.set("name", values.name);
    searchParams.set("login", values.login);
    searchParams.set("city", values.city);
    setSearchParams(searchParams);
    navigate(`/auth/signUpPassword?${searchParams.toString()}`);
  };

  return (
    <div className={styles.containerContent}>
      <h1 className={styles.title}>{t("titleSignUp")}</h1>
      <Form autoComplete="off" onFinish={onFinish}>
        <div className={styles.containerForm}>
          <Form.Item name="name">
            <Input placeholder={t("name")} />
          </Form.Item>
          <Form.Item name="login">
            <Input placeholder={t("login")} />
          </Form.Item>
          <Form.Item name="city">
            <Input placeholder={t("city")} />
          </Form.Item>
        </div>
        {/*<Checkbox>Не хочу указывать город</Checkbox>*/}
        <div className={extraStyles.containerCheckbox}>
          <input type="checkbox" className={extraStyles.checkbox} />
          {t("textCheckbox")}
        </div>
        <Button className={styles.buttonAuth} type="primary" htmlType="submit">
          {t("buttonNext")}
        </Button>
      </Form>
    </div>
  );
}
