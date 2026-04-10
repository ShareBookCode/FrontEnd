import styles from './chat-window.module.scss'
import { ChatMessage } from '@features/chat-message/index'
import type { Message } from '@entities/chat'

interface Props {
  data: Message[]
  currentUserId: string
}
export function ChatWindow({ data, currentUserId }: Props) {
  return (
    <div className={styles.wrapper}>
      {data.map(message => (
        <ChatMessage
          message={message}
          key={message.text + message.id + message.status}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  )
}
