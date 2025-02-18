import { Link, Outlet, useNavigate, useSearchParams } from "react-router";
import styles from "./auth.module.scss";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HeaderLite } from "../../components/Header";

export function Auth() {
  const { t } = useTranslation("auth");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      navigate(`${location.pathname}?${searchParams}`, { replace: true });
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate, searchParams]);

  return (
    <>
      <HeaderLite />
      <div className={styles.wrapper}>
        <Outlet />
        <p className={styles.legalText}>
          {t("legalText")}
          <Link to="/" className={styles.legalTextLink}>
            {t("legalTextLink")}
          </Link>
        </p>
      </div>
    </>
  );
}
