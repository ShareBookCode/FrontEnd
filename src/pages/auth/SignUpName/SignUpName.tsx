import { Button, Form, FormProps, Input } from "antd";
import styles from "../auth.module.scss";
import { useNavigate, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useDisabledForm } from "../hooks/useDisabledForm.tsx";

export function SignUpName() {
  const { t } = useTranslation("auth");
  const { form, disabledButton, handleFormChange } = useDisabledForm();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onFinish: FormProps["onFinish"] = (values) => {
    searchParams.set("name", values.name);
    searchParams.set("login", values.login);
    searchParams.set("city", values.city);
    navigate(`/auth/signUpPassword?${searchParams.toString()}`);
  };

  return (
    <div className={styles.containerContent}>
      <h1 className={styles.title}>{t("titleSignUp")}</h1>
      <Form
        form={form}
        preserve={false}
        initialValues={{
          name: searchParams.get("name"),
          login: searchParams.get("login"),
          city: searchParams.get("city"),
        }}
        autoComplete="off"
        onFinish={onFinish}
        onChange={handleFormChange}
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
          <Form.Item
            name="login"
            rules={[
              {
                required: true,
                message: t("messageLoginEmpty"),
              },
            ]}
          >
            <Input placeholder={t("login")} />
          </Form.Item>
          <Form.Item name="city">
            <Input placeholder={t("city")} />
          </Form.Item>
        </div>
        <Button
          className={styles.buttonAuth}
          type="primary"
          htmlType="submit"
          disabled={disabledButton}
        >
          {t("buttonNext")}
        </Button>
      </Form>
    </div>
  );
}
