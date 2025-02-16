import extraStyles from "./goToEmail.module.scss";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

export function GoToEmail() {
  const { t } = useTranslation("auth");
  const [searchParams] = useSearchParams();

  return (
    <div className={extraStyles.containerContent}>
      <h1 className={extraStyles.title}>
        {t("titleGoToEmail")} {searchParams.get("email")}
      </h1>
    </div>
  );
}
