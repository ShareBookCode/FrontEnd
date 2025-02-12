import { Outlet, useSearchParams } from "react-router";
import styles from "./auth.module.scss";
import { useEffect } from "react";
import * as events from "node:events";

export function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const handlePopState = (e) => {
      console.log(e.state);
      console.log(document.location.search);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  );
}
