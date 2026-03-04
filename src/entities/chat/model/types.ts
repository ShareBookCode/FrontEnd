export interface Chat {
  id: string
  users: string[]
  lastMessage?: Message
  updatedAt: number
}

export interface Message {
  id: string
  chatId: string
  text: string
  senderId: string
  timestamp: number
  isRead: boolean
}

export interface SendMessageRequest {
  chatId: string
  senderId: string
  text: string
}
