import {useGetProfileQuery} from "../../services/api/sharebookApi.ts";
import {Modal, Segmented} from "antd";
import {ProfileInfo} from "./info";
import {useParams} from "react-router";
import {ProfileOwnButtons} from "./ownButtons";
import {ProfileOtherButtons} from "./otherButtons";
import {useState} from "react";
import {AboutMySelf} from "./AboutMySelf";
import styles from "./Proflie.module.scss";
import {Account} from "./Account";

type Section = 'О себе' | 'Аккаунт';

export function Profile() {
  let { userId } = useParams();
  const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('О себе');

  if (userId === "0" || userId === "my" || !userId || !isFinite(+userId)) {
    userId = "-1";
  }

  const isOwnProfile = userId === "-1";

  const { data } = useGetProfileQuery({ userId, zone: 1 });

  return (
    <ProfileInfo profile={data} isOwnProfile={isOwnProfile}>
      {isOwnProfile ? (
        <ProfileOwnButtons setIsOpenSettingModal={setIsOpenSettingModal} />
      ) : (
        <ProfileOtherButtons />
      )}

      <Modal
        width={650}
        centered
        closable
        maskClosable
        footer={null}
        getContainer={false}
        open={isOpenSettingModal}
        onCancel={() => setIsOpenSettingModal(false)}
        classNames={{
          content: styles.modal,
          body: styles.containerModal,
        }}
        title={
          <div style={{marginTop: "-6px", marginBottom: "20px"}}>
            <Segmented
              value={activeSection}
              style={{ width: "90%" }}
              onChange={setActiveSection}
              block
              options={['О себе', 'Аккаунт']}
            />
          </div>
        }
      >
        {activeSection === 'О себе' ? (
          <AboutMySelf />
        ) : (
          <Account />
        )}
      </Modal>
    </ProfileInfo>
  );
}
