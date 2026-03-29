export interface MessageData {
  id: string
  senderId: string
  status: 'received' | 'send' | 'error'
  message: string
  timestamp: string
}

export interface ChatData {
  messages: MessageData[]
}
