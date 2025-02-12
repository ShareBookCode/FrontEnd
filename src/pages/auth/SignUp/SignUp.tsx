import { Button, Form, FormProps, Input } from "antd";
import styles from "../auth.module.scss";
import extraStyles from "./signUp.module.scss";
import { useNavigate, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

let emailValue = "";

export function SignUp() {
  const { t } = useTranslation("auth");
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm<{ email: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue({ email: searchParams.get("email") ?? "" });
  }, [form, searchParams]);

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
        <Form name="basic" autoComplete="off" onFinish={onFinish} form={form}>
          <div className={styles.containerForm}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: t("messageEmailEmpty"),
                },
              ]}
            >
              <Input
                value={emailValue}
                onChange={(e) => {
                  emailValue = e.target.value;
                }}
                placeholder={t("email")}
                autoComplete="email"
              />
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
        <button onClick={() => navigate("/auth/signIn")}>
          {t("linkSignUp")}
        </button>
      </p>
    </div>
  );
}
