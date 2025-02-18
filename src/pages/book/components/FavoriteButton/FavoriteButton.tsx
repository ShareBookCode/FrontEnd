import { Button } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { useState } from "react";
import styles from "./favoriteButton.module.scss";
import cn from "classnames";

export const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Button
      type="text"
      className={cn(styles.favoriteButton, isFavorite && styles.isFavorite)}
      icon={<HeartFilled />}
      onClick={() => setIsFavorite((isFavorite) => !isFavorite)}
    />
  );
};
