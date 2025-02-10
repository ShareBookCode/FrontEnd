import { useNavigate, useSearchParams } from "react-router";
import cn from "classnames";
import { ChangeScreen } from "../ChangeScreen";
import { SvgCloseModal } from "../svg/SvgCloseModal.tsx";
import styles from "./screenAuth.module.scss";
import { SvgBack } from "../svg/SvgBack.tsx";
import { useTranslation } from "react-i18next";

const screensSignIn = ["signIn", "forgotPassword", "goToEmailSignIn"];

export function ScreenAuth() {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const [searchParams, setSearchParams] = useSearchParams();
  const activeScreen = searchParams.get("auth");

  const closeAuth = () => {
    searchParams.delete("auth");
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => navigate(-1)}
        className={cn(styles.buttonModal, {
          [styles.buttonHide]: activeScreen == "signIn",
        })}
      >
        <SvgBack />
      </button>
      {screensSignIn.includes(String(activeScreen)) ? (
        <ChangeScreen activeScreen={activeScreen} />
      ) : (
        <div className={styles.signUp}>
          <div></div>
          <ChangeScreen activeScreen={activeScreen} />
          <div className={styles.legalText}>{t("legalText")}</div>
        </div>
      )}
      <button onClick={closeAuth} className={styles.buttonModal}>
        <SvgCloseModal />
      </button>
    </div>
  );
}
