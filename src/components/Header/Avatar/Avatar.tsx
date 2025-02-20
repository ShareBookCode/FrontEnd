import styles from "../header.module.scss";
import { Button } from "antd";
import { SvgAvatar } from "../svg/SvgAvatar.tsx";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../store.ts";
import {
  sharebookApi,
  UserProfileDto,
} from "../../../services/api/sharebookApi.ts";

export function Avatar() {
  const navigate = useNavigate();

  const profile = useAppSelector(
    sharebookApi.endpoints.getProfile.select({
      userId: "-1",
      zone: 4,
    }),
  );

  return (
    <Button
      className={styles.avatar}
      type="primary"
      shape="circle"
      onClick={() =>
        navigate(
          (profile.data as UserProfileDto).userId ? "/profile" : "/auth/signIn",
        )
      }
    >
      <SvgAvatar />
    </Button>
  );
}
