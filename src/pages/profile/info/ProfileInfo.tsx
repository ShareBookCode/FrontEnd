import styles from "./profileInfo.module.scss";
import { Avatar, Typography } from "antd";
import photo from "./anna.png";
import photo2 from "./nikolay.png";
import {
  UserProfileDto,
  UserPublicProfileDto,
} from "../../../services/api/sharebookApi.ts";
import { PropsWithChildren } from "../../../types.ts";
import { useTranslation } from "react-i18next";

type Props = {
  profile?: UserPublicProfileDto | UserProfileDto;
  isOwnProfile: boolean;
};

export function ProfileInfo({
  profile,
  isOwnProfile,
  children,
}: PropsWithChildren<Props>) {
  const { t } = useTranslation("profile");
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.avatar}>
            <Avatar size={150} src={isOwnProfile ? photo : photo2} />
          </div>
          <div className={styles.text}>
            <Typography.Title level={2} className={styles.name}>
              {profile?.name}
            </Typography.Title>
            <Typography.Text className={styles.score}>
              <span className={styles.emoji}>🎯</span> {t("info.score", { giveCount: 1, exchangedCount: 3 })}
            </Typography.Text>
            <Typography.Paragraph className={styles.description}>
              Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </Typography.Paragraph>
          </div>
        </div>
        <div className={styles.actions}>{children}</div>
      </div>
    </div>
  );
}
