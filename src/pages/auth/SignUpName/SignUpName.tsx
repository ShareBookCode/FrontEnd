import { Button, Form, FormProps, Input } from "antd";
import styles from "../auth.module.scss";
import { useNavigate, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

export function SignUpName() {
  const { t } = useTranslation("auth");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onFinish: FormProps["onFinish"] = (values) => {
    searchParams.set("name", values.name);
    searchParams.set("city", values.city ?? "");
    navigate(`/auth/signUpPassword?${searchParams.toString()}`);
  };

  return (
    <div className={styles.containerContent}>
      <h1 className={styles.title}>{t("titleSignUp")}</h1>
      <Form
        preserve={false}
        initialValues={{
          name: searchParams.get("name"),
          city: searchParams.get("city"),
        }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <div className={styles.containerForm}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: t("messageNameEmpty"),
              },
            ]}
          >
            <Input placeholder={t("name")} />
          </Form.Item>
          <Form.Item name="city">
            <Input placeholder={t("city")} />
          </Form.Item>
        </div>
        <Button className={styles.buttonAuth} type="primary" htmlType="submit">
          {t("buttonNext")}
        </Button>
      </Form>
    </div>
  );
}
