export interface DefaultUser {
  id: string
  name: string
  avatar: string | null
  online: {
    when: number
    isOnline: boolean
  }
  description: string
  stats: {
    given: number
    exchanged: number
  }
  createdAt: number
  updatedAt: number
}
