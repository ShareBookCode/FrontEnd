import styles from "./chatBody.module.scss";
import { useAppSelector } from "../../../store.ts";
import { useGetCorrespondenceQuery } from "../../../services/api/sharebookApi.ts";
import { ChatMessage } from "../chatMessage";

export function ChatBody() {
  const activeChatId = useAppSelector((state) => state.chat.activeId);

  const response = useGetCorrespondenceQuery({
    firstUserId: "6",
    secondUserId: "4",
    zone: 4,
  });

  if (!activeChatId) return <div className={styles.centered}>Кому писать?</div>;

  return (
    <div className={styles.scroll}>
      {response.currentData?.map((item) => (
        <ChatMessage key={item.messageId} message={item} profileId={6} />
      ))}
    </div>
  );
}
