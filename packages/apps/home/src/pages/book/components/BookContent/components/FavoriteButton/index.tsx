import { Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";

export const FavoriteButton = () => {
  return (
    <Button
      type="text"
      shape="circle"
      icon={<HeartOutlined />}
      className={styles.favoriteButton}
    />
  );
};
