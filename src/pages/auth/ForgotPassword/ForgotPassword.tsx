import { Button, Form, FormProps, Input } from "antd";
import styles from "../auth.module.scss";
import { SvgPasswordShow } from "../svg/SvgPasswordShow.tsx";
import { SvgPasswordHide } from "../svg/SvgPasswordHide.tsx";
import { useTranslation } from "react-i18next";
import { useSendResetPasswordEmailMutation } from "../../../services/api/sharebookApi.ts";

export function ForgotPassword() {
  const { t } = useTranslation("auth");
  const [resetPassword] = useSendResetPasswordEmailMutation();

  const onFinish: FormProps["onFinish"] = async (values) => {
    console.log("Success:", values);
    try {
      await resetPassword({ e }).unwrap();
      navigate("/");
    } catch (err) {
      console.log("err:", err);
    }
  };

  return (
    <div className={styles.containerContent}>
      <h1 className={styles.title}>{t("titleForgotPassword")}</h1>
      <div>
        <Form onFinish={onFinish} autoComplete="off">
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
              <Input placeholder={t("email")} />
            </Form.Item>
            <Form.Item
              name="password"
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: t("messagePasswordEmpty"),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password").length >= 8) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t("messagePasswordLength")),
                    );
                  },
                }),
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

            <Form.Item
              name="passwordConfirm"
              validateDebounce={1000}
              rules={[
                {
                  required: true,
                  message: t("messagePasswordEmpty"),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t("messagePasswordDontMatch")),
                    );
                  },
                }),
              ]}
            >
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
          </div>
          <Button
            className={styles.buttonAuth}
            type="primary"
            htmlType="submit"
          >
            {t("buttonResetPassword")}
          </Button>
        </Form>
      </div>
    </div>
  );
}
