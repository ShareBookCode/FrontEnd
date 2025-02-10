import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import styles from "../auth.module.scss";
import { useSearchParams } from "react-router";
import { useRegisterUserMutation } from "../../../services/api/sharebookApi.ts";
import { SvgPasswordShow } from "../svg/SvgPasswordShow.tsx";
import { SvgPasswordHide } from "../svg/SvgPasswordHide.tsx";
import { useTranslation } from "react-i18next";

export function SignUpPassword() {
  const { t } = useTranslation("auth");
  const [, setSearchParams] = useSearchParams();

  const [register, { isLoading }] = useRegisterUserMutation();

  const onFinish: FormProps["onFinish"] = async (values) => {
    console.log("Success:", values);
    try {
      await register(values).unwrap();
    } catch (err) {
      console.log("err:", err);
    }
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.containerContent}>
      <h1 className={styles.title}>{t("titleSignUp")}</h1>
      <div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={styles.containerForm}
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {},
            ]}
          >
            <Input.Password
              placeholder={t("password")}
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
                message: "Please input your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The new password that you entered do not match!",
                    ),
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
        </Form>

        <Button
          onClick={() => setSearchParams({ auth: "goToEmailSignUp" })}
          className={styles.buttonAuth}
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          {t("buttonNext")}
        </Button>
      </div>
    </div>
  );
}
