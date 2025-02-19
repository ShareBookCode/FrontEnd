import extraStyles from "../goToEmail.module.scss"
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

export function GoToEmailForgotPassword() {
	const { t } = useTranslation("auth");
	const [searchParams] = useSearchParams();

	return (
		<div className={extraStyles.containerContent}>
			<h1 className={extraStyles.title}>
				{t("titleGoToEmailResetPassword")} {searchParams.get("email")}
			</h1>
		</div>
	);
}
