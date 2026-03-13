interface User {
  id: string
}

interface UserOnline extends User {
  whenOnline: number
  isOnline: boolean
}

export interface Chat {
  users: User[]
  updatedAt: number
}

export interface Message {
  id: string
  chatId: string
  text: string
  senderId: UserOnline
  timestamp: number
  isRead: boolean
}

export interface SendMessageRequest {
  chatId: string
  senderId: User
  text: string
}
