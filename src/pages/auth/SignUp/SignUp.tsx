import { Button, Form, FormProps, Input } from "antd";
import styles from "../auth.module.scss";
import extraStyles from "./signUp.module.scss";
import { useNavigate, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

let emailValue = "";

export function SignUp() {
  const { t } = useTranslation("auth");
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  // console.log(emailValue);

  // useEffect(() => {
  //   console.log(34);
  //   window.history.replaceState({}, "", "/auth/signUp");
  // }, []);

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
          name="basic"
          initialValues={{ email: searchParams.get("email") }}
          autoComplete="off"
          onFinish={onFinish}
        >
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
