export interface User {
  id: string
  name: string
  avatar: string | null
  createdAt: string
}

export interface UserProfile extends User {
  stats: {
    given: number
    exchanged: number
  }
  description: string | null
}

export interface UserAboutMyself extends User {
  description: string | null
}

export interface UserAccount {
  email: string
  city: string
  language: string
}
