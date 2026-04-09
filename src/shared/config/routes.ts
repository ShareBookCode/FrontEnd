export const ROUTES = {
  home: '/',
  newBook: '/new-book',

  book: (bookId: string) => `/books/${bookId}`,

  signIn: '/sign-in',
  signUp: '/sign-up',
  forgotPassword: '/forgot-password',

  profile: '/profile',
  user: (userId: string) => `/users/${userId}`,

  chats: '/chats',
  favorites: '/favorites',

  rules: '/rules',

  settings: {
    account: '/settings/account',
    aboutMyself: '/settings/about-myself',
  },
} as const
