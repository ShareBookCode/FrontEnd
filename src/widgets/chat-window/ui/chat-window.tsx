import styles from './chat-window.module.scss'
import type { MessageData } from '@shared/lib/types/chat'
import { ChatMessage } from '@features/chat-message/index'

interface Props {
  data: MessageData[]
  currentUserId: string
}
export function ChatWindow({ data, currentUserId }: Props) {
  return (
    <div className={styles.wrapper}>
      {data.map(chat => (
        <ChatMessage
          message={chat}
          key={chat.message + chat.id + chat.status}
          currentUserId={currentUserId}

        />
      ))}
    </div>
  )
}
