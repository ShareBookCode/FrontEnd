export interface User {
  id: string
  name: string
  avatar: string | null
  createdAt: number
}

export interface UserProfile extends User {
  stats: {
    given: number
    exchanged: number
  }
  description: string
}

export interface UserAboutMyself extends User {
  description: string
}

export interface UserAccount {
  email: string
  city: string
  language: string
}
