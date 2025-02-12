import { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router";
import { useAuthMutation } from "../../../services/api/sharebookApi.ts";
import { SvgPasswordHide } from "../svg/SvgPasswordHide.tsx";
import { SvgPasswordShow } from "../svg/SvgPasswordShow.tsx";
import { useTranslation } from "react-i18next";
import styles from "../auth.module.scss";
import extraStyles from "./signIn.module.scss";

export function SignIn() {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  const [login, { isLoading }] = useAuthMutation();

  const onFinish: FormProps["onFinish"] = async (values) => {
    console.log("Success:", values);
    try {
      await login({ loginRequest: values }).unwrap();
      navigate("/");
    } catch (err) {
      console.log("err:", err);
    }
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.containerContent}>
      <h1 className={styles.title}>{t("titleSignIn")}</h1>
      <div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className={styles.containerForm}>
            <Form.Item
              name="login"
              rules={[
                {
                  required: true,
                  message: t("messageLoginEmpty"),
                },
              ]}
            >
              <Input placeholder={t("email")} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t("messagePasswordEmpty"),
                },
              ]}
            >
              <Input.Password
                placeholder={t("password")}
                iconRender={(visible) => (
                  <div className={styles.svgPassword}>
                    {visible ? <SvgPasswordShow /> : <SvgPasswordHide />}
                  </div>
                )}
              />
            </Form.Item>
          </div>

          <button
            onClick={() => navigate("/auth/forgotPassword")}
            className={extraStyles.linkForgotPassword}
          >
            {t("textForgotPassword")}
          </button>

          <Button
            className={styles.buttonAuth}
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            {t("buttonSignIn")}
          </Button>
        </Form>
      </div>
      <p className={styles.link}>
        {t("textSingIn")}
        <button onClick={() => navigate("/auth/signUp")}>
          {t("linkSingIn")}
        </button>
      </p>
    </div>
  );
}
