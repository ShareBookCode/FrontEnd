import styles from "./auth.module.scss";
import { Modal } from "antd";
import { useSearchParams } from "react-router";
import { ScreenAuth } from "./ScreenAuth";

export function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isModalOpen = searchParams.get("auth") != null;

  const closeAuth = () => {
    searchParams.delete("auth");
    setSearchParams(searchParams);
  };

  return (
    <Modal
      width={826}
      centered={true}
      footer={null}
      closable={false}
      maskClosable={true}
      getContainer={false}
      open={isModalOpen}
      onCancel={closeAuth}
      classNames={{
        mask: styles.maskModal,
        content: styles.modal,
        body: styles.containerModal,
      }}
    >
      <ScreenAuth />
    </Modal>
  );
}
