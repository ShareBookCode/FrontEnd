import { Outlet, useNavigate, useSearchParams } from "react-router";
import styles from "./auth.module.scss";
import { useEffect } from "react";

export function Auth() {
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
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  );
}
