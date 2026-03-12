export interface DefaultUser {
  id: string
  name: string
  avatar: string | null
  isOnline: boolean
  stats: {
    given: number
    exchanged: number
  }
  location: {
    city: string
    district: string
  }
}
