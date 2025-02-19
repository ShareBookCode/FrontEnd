import { Button, Form, FormProps, Input } from "antd";
import styles from "../auth.module.scss";
import extraStyles from "./signUp.module.scss";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { regex } from "../../../utils/regex";

export function SignUp() {
  const { t } = useTranslation("auth");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onFinish: FormProps["onFinish"] = (values) => {
    searchParams.set("email", values.email);
    navigate(`/auth/signUpName?${searchParams.toString()}`);
  };

  return (
    <div className={styles.containerContent}>
      <h1 className={extraStyles.titleOneScreen}>
        {t("titleOne")}
        <span>{t("titleTwo")}</span>
        {t("titleThree")}
        <span>{t("titleFour")}</span>
      </h1>
      <div>
        <Form
          preserve={false}
          initialValues={{ email: searchParams.get("email") }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <div className={styles.containerForm}>
            <Form.Item
              name="email"
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: t("messageEmailEmpty"),
                },
                {
                  pattern: regex,
                  message: t("messageEmailIncorrect"),
                },
              ]}
            >
              <Input placeholder={t("email")} autoComplete="email" />
            </Form.Item>
          </div>
          <Button
            className={styles.buttonAuth}
            type="primary"
            htmlType="submit"
          >
            {t("buttonNext")}
          </Button>
        </Form>
      </div>
      <p className={styles.link}>
        {t("textSignUp")}
        <Link to="/auth/signIn">{t("linkSignUp")}</Link>
      </p>
    </div>
  );
}
