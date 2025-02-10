import { Button, Form, Input } from "antd";
import styles from "../auth.module.scss";
import { useSearchParams } from "react-router";
import { SvgPasswordShow } from "../svg/SvgPasswordShow.tsx";
import { SvgPasswordHide } from "../svg/SvgPasswordHide.tsx";
import { useTranslation } from "react-i18next";

export function ForgotPassword() {
  const { t } = useTranslation("auth");
  const [, setSearchParams] = useSearchParams();

  return (
    <div className={styles.containerContent}>
      <h1 className={styles.title}>{t("titleForgotPassword")}</h1>
      <div>
        <Form autoComplete="off" className={styles.containerForm}>
          <Form.Item
            name="login"
            rules={[
              {
                required: true,
                message: "Please input your login!",
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
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              placeholder={t("newPassword")}
              autoComplete="new-password"
              iconRender={(visible) => (
                <div className={styles.svgPassword}>
                  {visible ? <SvgPasswordShow /> : <SvgPasswordHide />}
                </div>
              )}
            />
          </Form.Item>

          <Form.Item name="passwordConfirm">
            <Input.Password
              placeholder={t("confirmPassword")}
              autoComplete="new-password"
              iconRender={(visible) => (
                <div className={styles.svgPassword}>
                  {visible ? <SvgPasswordShow /> : <SvgPasswordHide />}
                </div>
              )}
            />
          </Form.Item>
        </Form>

        <Button
          onClick={() => setSearchParams({ auth: "goToEmailSignUp" })}
          className={styles.buttonAuth}
          type="primary"
        >
          {t("buttonResetPassword")}
        </Button>
      </div>
    </div>
  );
}
