import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import styles from "../auth.module.scss";
import { useNavigate, useSearchParams } from "react-router";
import { useRegisterUserMutation } from "../../../services/api/sharebookApi.ts";
import { SvgPasswordShow } from "../svg/SvgPasswordShow.tsx";
import { SvgPasswordHide } from "../svg/SvgPasswordHide.tsx";
import { useTranslation } from "react-i18next";

export function SignUpPassword() {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [register, { isLoading }] = useRegisterUserMutation();

  const onFinish: FormProps["onFinish"] = async (values) => {
    console.log("Success:", values);
    try {
      const registerValues = {
        userRegistrationDto: {
          name: searchParams.get("name") || "",
          login: "test",
          password: values.password || "",
          passwordConfirm: values.passwordConfirm || "",
          email: searchParams.get("email") || "",
          city: searchParams.get("city") || "",
        },
      };
      await register(registerValues).unwrap();
      navigate(`/auth/goToEmail?${searchParams.toString()}`);
    } catch (err) {
      console.log("err:", err);
    }
  };

  return (
    <div className={styles.containerContent}>
      <h1 className={styles.title}>{t("titleSignUp")}</h1>
      <div>
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className={styles.containerForm}>
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
            loading={isLoading}
          >
            {t("buttonNext")}
          </Button>
        </Form>
      </div>
    </div>
  );
}
