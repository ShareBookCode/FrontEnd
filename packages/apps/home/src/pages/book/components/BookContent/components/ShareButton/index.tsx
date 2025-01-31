import { Button, Dropdown } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import {
  TelegramIcon,
  WhatsAppIcon,
  XIcon,
  EmailIcon,
  LinkIcon,
} from "./svg-icons";

const shareMenu = {
  items: [
    { key: "x", label: "X (Twitter)", icon: <XIcon /> },
    { key: "telegram", label: "Telegram", icon: <TelegramIcon /> },
    { key: "whatsapp", label: "WhatsApp", icon: <WhatsAppIcon /> },
    { key: "email", label: "Почта", icon: <EmailIcon /> },
    { key: "link", label: "Ссылка", icon: <LinkIcon /> },
  ],
};

export const ShareButton = () => (
  <Dropdown
    menu={shareMenu}
    trigger={["click"]}
    overlayClassName={styles.shareDropdown}
  >
    <Button
      type="text"
      icon={<ShareAltOutlined />}
      className={styles.shareButton}
    >
      Поделиться
    </Button>
  </Dropdown>
);
