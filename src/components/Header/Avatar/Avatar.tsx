import styles from "../header.module.scss";
import { Button } from "antd";
import { SvgAvatar } from "../svg/SvgAvatar.tsx";
import { useNavigate } from "react-router";

export function Avatar() {
  const navigate = useNavigate();

  return (
    <Button
      className={styles.avatar}
      type="primary"
      shape="circle"
      onClick={() => navigate("/auth/signIn")}
    >
      <SvgAvatar />
    </Button>
  );
}
