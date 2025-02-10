import { Button, Form, Input } from "antd";
import styles from "../auth.module.scss";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

export function SignUp() {
  const { t } = useTranslation("auth");
  const [, setSearchParams] = useSearchParams();
  return (
    <div className={styles.containerContent}>
      <h1 className={styles.title}>{t("titleSignUp")}</h1>
      <div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          className={styles.containerForm}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder={t("email")} autoComplete="email" />
          </Form.Item>
        </Form>

        <Button
          onClick={() => setSearchParams({ auth: "signUpName" })}
          className={styles.buttonAuth}
          type="primary"
          htmlType="submit"
        >
          {t("buttonNext")}
        </Button>
      </div>
      <p className={styles.link}>
        {t("textSignUp")}
        <button onClick={() => setSearchParams({ auth: "signIn" })}>
          {t("linkSignUp")}
        </button>
      </p>
    </div>
  );
}
