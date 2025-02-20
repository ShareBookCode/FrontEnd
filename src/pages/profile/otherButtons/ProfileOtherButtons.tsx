import { Button } from "antd";
import { useTranslation } from "react-i18next";

export function ProfileOtherButtons() {
  const { t } = useTranslation("profile");
  return <Button type="primary">{t("otherButtons.write")}</Button>;
}
