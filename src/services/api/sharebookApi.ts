import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<GetProfileApiResponse, GetProfileApiArg>({
      query: (queryArg) => ({
        url: `/user/profile`,
        headers: {
          userId: queryArg.userId,
        },
        params: {
          zone: queryArg.zone,
        },
      }),
    }),
    putProfile: build.mutation<PutProfileApiResponse, PutProfileApiArg>({
      query: (queryArg) => ({
        url: `/user/profile`,
        method: "PUT",
        body: queryArg.userPutProfileDto,
      }),
    }),
    putMessage: build.mutation<PutMessageApiResponse, PutMessageApiArg>({
      query: (queryArg) => ({
        url: `/user/correspondence/message`,
        method: "PUT",
        body: queryArg.messagePutRequest,
      }),
    }),
    sendMessage: build.mutation<SendMessageApiResponse, SendMessageApiArg>({
      query: (queryArg) => ({
        url: `/user/correspondence/message`,
        method: "POST",
        body: queryArg.messageRequest,
      }),
    }),
    deleteForEveryoneMessage: build.mutation<
      DeleteForEveryoneMessageApiResponse,
      DeleteForEveryoneMessageApiArg
    >({
      query: (queryArg) => ({
        url: `/user/correspondence/message`,
        method: "DELETE",
        params: {
          messageId: queryArg.messageId,
        },
      }),
    }),
    bookList: build.query<BookListApiResponse, BookListApiArg>({
      query: () => ({ url: `/user/myBook` }),
    }),
    saveBook: build.mutation<SaveBookApiResponse, SaveBookApiArg>({
      query: (queryArg) => ({
        url: `/user/myBook`,
        method: "POST",
        body: queryArg.bookDto,
      }),
    }),
    deleteBook: build.mutation<DeleteBookApiResponse, DeleteBookApiArg>({
      query: (queryArg) => ({
        url: `/user/myBook`,
        method: "DELETE",
        params: {
          bookId: queryArg.bookId,
        },
      }),
    }),
    findAttachment: build.query<
      FindAttachmentApiResponse,
      FindAttachmentApiArg
    >({
      query: (queryArg) => ({
        url: `/user/myBook/attachment`,
        params: {
          id: queryArg.id,
          format: queryArg.format,
        },
      }),
    }),
    saveAttachment: build.mutation<
      SaveAttachmentApiResponse,
      SaveAttachmentApiArg
    >({
      query: (queryArg) => ({
        url: `/user/myBook/attachment`,
        method: "POST",
        params: {
          attachmentMultipartDto: queryArg.attachmentMultipartDto,
        },
      }),
    }),
    deleteAttachment: build.mutation<
      DeleteAttachmentApiResponse,
      DeleteAttachmentApiArg
    >({
      query: (queryArg) => ({
        url: `/user/myBook/attachment`,
        method: "DELETE",
        params: {
          bookId: queryArg.bookId,
        },
      }),
    }),
    getCorrespondence: build.query<
      GetCorrespondenceApiResponse,
      GetCorrespondenceApiArg
    >({
      query: (queryArg) => ({
        url: `/user/correspondence`,
        headers: {
          firstUserId: queryArg.firstUserId,
          secondUserId: queryArg.secondUserId,
        },
        params: {
          zone: queryArg.zone,
        },
      }),
    }),
    createCorrespondence: build.mutation<
      CreateCorrespondenceApiResponse,
      CreateCorrespondenceApiArg
    >({
      query: (queryArg) => ({
        url: `/user/correspondence`,
        method: "POST",
        headers: {
          userId: queryArg.userId,
        },
      }),
    }),
    deleteCorrespondence: build.mutation<
      DeleteCorrespondenceApiResponse,
      DeleteCorrespondenceApiArg
    >({
      query: (queryArg) => ({
        url: `/user/correspondence`,
        method: "DELETE",
        headers: {
          userId: queryArg.userId,
        },
      }),
    }),
    getAll: build.query<GetAllApiResponse, GetAllApiArg>({
      query: () => ({ url: `/user/bookmarks` }),
    }),
    saveBookmarks: build.mutation<
      SaveBookmarksApiResponse,
      SaveBookmarksApiArg
    >({
      query: (queryArg) => ({
        url: `/user/bookmarks`,
        method: "POST",
        params: {
          bookId: queryArg.bookId,
        },
      }),
    }),
    deleteBookmarks: build.mutation<
      DeleteBookmarksApiResponse,
      DeleteBookmarksApiArg
    >({
      query: (queryArg) => ({
        url: `/user/bookmarks`,
        method: "DELETE",
        params: {
          bookId: queryArg.bookId,
        },
      }),
    }),
    updatePassword: build.mutation<
      UpdatePasswordApiResponse,
      UpdatePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/reset/update`,
        method: "POST",
        body: queryArg.userPasswordDto,
        params: {
          token: queryArg.token,
        },
      }),
    }),
    sendResetPasswordEmail: build.mutation<
      SendResetPasswordEmailApiResponse,
      SendResetPasswordEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/reset/send`,
        method: "POST",
        params: {
          email: queryArg.email,
        },
      }),
    }),
    registerUser: build.mutation<RegisterUserApiResponse, RegisterUserApiArg>({
      query: (queryArg) => ({
        url: `/registration`,
        method: "POST",
        body: queryArg.userRegistrationDto,
      }),
    }),
    refresh: build.mutation<RefreshApiResponse, RefreshApiArg>({
      query: (queryArg) => ({
        url: `/refresh`,
        method: "POST",
        cookies: {
          "refresh-token": queryArg["refresh-token"],
        },
      }),
    }),
    searchWithFilters: build.mutation<
      SearchWithFiltersApiResponse,
      SearchWithFiltersApiArg
    >({
      query: (queryArg) => ({
        url: `/books/searchWithFilters`,
        method: "POST",
        body: queryArg.bookFiltersRequest,
      }),
    }),
    auth: build.mutation<AuthApiResponse, AuthApiArg>({
      query: (queryArg) => ({
        url: `/auth`,
        method: "POST",
        body: queryArg.loginRequest,
      }),
    }),
    nonLockedUser: build.mutation<
      NonLockedUserApiResponse,
      NonLockedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/adm/nonLocked`,
        method: "POST",
        params: {
          login: queryArg.login,
        },
      }),
    }),
    lockedUser: build.mutation<LockedUserApiResponse, LockedUserApiArg>({
      query: (queryArg) => ({
        url: `/adm/locked`,
        method: "POST",
        body: queryArg.lockedUserDto,
      }),
    }),
    getAllProfile: build.query<GetAllProfileApiResponse, GetAllProfileApiArg>({
      query: (queryArg) => ({
        url: `/user/profile/users`,
        params: {
          zone: queryArg.zone,
        },
      }),
    }),
    mailConfirm: build.query<MailConfirmApiResponse, MailConfirmApiArg>({
      query: (queryArg) => ({
        url: `/registration/confirmation`,
        params: {
          token: queryArg.token,
        },
      }),
    }),
    findAllGenre: build.query<FindAllGenreApiResponse, FindAllGenreApiArg>({
      query: (queryArg) => ({
        url: `/genre`,
        params: {
          locale: queryArg.locale,
        },
      }),
    }),
    generateLogin: build.query<GenerateLoginApiResponse, GenerateLoginApiArg>({
      query: () => ({ url: `/generate-login` }),
    }),
    searchByTitle: build.query<SearchByTitleApiResponse, SearchByTitleApiArg>({
      query: (queryArg) => ({
        url: `/books/searchByTitle`,
        params: {
          title: queryArg.title,
        },
      }),
    }),
    bookInfo: build.query<BookInfoApiResponse, BookInfoApiArg>({
      query: (queryArg) => ({
        url: `/books/info`,
        params: {
          bookId: queryArg.bookId,
        },
      }),
    }),
    booksByUser: build.query<BooksByUserApiResponse, BooksByUserApiArg>({
      query: (queryArg) => ({
        url: `/books/by-user`,
        params: {
          id: queryArg.id,
        },
      }),
    }),
    books: build.query<BooksApiResponse, BooksApiArg>({
      query: () => ({ url: `/books/all` }),
    }),
    userList: build.query<UserListApiResponse, UserListApiArg>({
      query: (queryArg) => ({
        url: `/adm`,
        params: {
          zone: queryArg.zone,
        },
      }),
    }),
    deleteForMeMessage: build.mutation<
      DeleteForMeMessageApiResponse,
      DeleteForMeMessageApiArg
    >({
      query: (queryArg) => ({
        url: `/user/correspondence/message/deleteForMe`,
        method: "DELETE",
        params: {
          messageId: queryArg.messageId,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as sharebookApi };
export type GetProfileApiResponse =
  /** status 200 Возвращает профиль пользователя */ object;
export type GetProfileApiArg = {
  /** Идентификатор пользователя */
  userId?: string;
  /** Часовой пояс пользователя */
  zone: number;
};
export type PutProfileApiResponse =
  /** status 200 Возвращает обновленный профиль пользователя */ UserProfileDto;
export type PutProfileApiArg = {
  userPutProfileDto: UserPutProfileDto;
};
export type PutMessageApiResponse =
  /** status 200 Сообщение изменено */ MessageDto;
export type PutMessageApiArg = {
  messagePutRequest: MessagePutRequest;
};
export type SendMessageApiResponse =
  /** status 201 Сообщение отправлено */ MessageDto;
export type SendMessageApiArg = {
  messageRequest: MessageRequest;
};
export type DeleteForEveryoneMessageApiResponse = unknown;
export type DeleteForEveryoneMessageApiArg = {
  messageId: number;
};
export type BookListApiResponse =
  /** status 200 Возвращает список книг */ BookModelDto[];
export type BookListApiArg = void;
export type SaveBookApiResponse =
  /** status 201 Возвращает сохраненную книгу */ BookModelDto;
export type SaveBookApiArg = {
  bookDto: BookDto;
};
export type DeleteBookApiResponse = unknown;
export type DeleteBookApiArg = {
  bookId: number;
};
export type FindAttachmentApiResponse =
  /** status 200 Вложение отправлено */ Blob;
export type FindAttachmentApiArg = {
  id: number;
  format: string;
};
export type SaveAttachmentApiResponse = unknown;
export type SaveAttachmentApiArg = {
  attachmentMultipartDto: AttachmentMultipartDto;
};
export type DeleteAttachmentApiResponse = unknown;
export type DeleteAttachmentApiArg = {
  bookId: number;
};
export type GetCorrespondenceApiResponse =
  /** status 200 Возвращает список сообщений */ MessageDto[];
export type GetCorrespondenceApiArg = {
  /** Идентификатор первого пользователя */
  firstUserId: string;
  /** Идентификатор второго пользователя */
  secondUserId: string;
  zone: number;
};
export type CreateCorrespondenceApiResponse =
  /** status 201 Чат создан */ UsersCorrKeyDto;
export type CreateCorrespondenceApiArg = {
  /** Идентификатор пользователя */
  userId: string;
};
export type DeleteCorrespondenceApiResponse = unknown;
export type DeleteCorrespondenceApiArg = {
  /** Идентификатор пользователя */
  userId: string;
};
export type GetAllApiResponse =
  /** status 200 Возвращает список закладок */ BookModelDto[];
export type GetAllApiArg = void;
export type SaveBookmarksApiResponse =
  /** status 201 Возвращает список закладок */ BookModelDto[];
export type SaveBookmarksApiArg = {
  /** Идентификатор книги */
  bookId: number;
};
export type DeleteBookmarksApiResponse = unknown;
export type DeleteBookmarksApiArg = {
  /** Идентификатор книги */
  bookId: number;
};
export type UpdatePasswordApiResponse = unknown;
export type UpdatePasswordApiArg = {
  token: string;
  userPasswordDto: UserPasswordDto;
};
export type SendResetPasswordEmailApiResponse = unknown;
export type SendResetPasswordEmailApiArg = {
  email: string;
};
export type RegisterUserApiResponse =
  /** status 201 Отправляет ссылку для подтверждения на почту */ UserDto;
export type RegisterUserApiArg = {
  userRegistrationDto: UserRegistrationDto;
};
export type RefreshApiResponse =
  /** status 200 Возвращает токены */ AuthResponse;
export type RefreshApiArg = {
  "refresh-token": string;
};
export type SearchWithFiltersApiResponse =
  /** status 200 Возвращает найденные книги */ BookModelDto[];
export type SearchWithFiltersApiArg = {
  bookFiltersRequest: BookFiltersRequest;
};
export type AuthApiResponse = /** status 200 Возвращает токены */ AuthResponse;
export type AuthApiArg = {
  loginRequest: LoginRequest;
};
export type NonLockedUserApiResponse = unknown;
export type NonLockedUserApiArg = {
  login: string;
};
export type LockedUserApiResponse = unknown;
export type LockedUserApiArg = {
  lockedUserDto: LockedUserDto;
};
export type GetAllProfileApiResponse =
  /** status 200 Возвращает найденных пользователей */ UserPublicProfileDto[];
export type GetAllProfileApiArg = {
  zone: number;
};
export type MailConfirmApiResponse =
  /** status 200 Подтверждает почту для аккаунта и возвращает токены */ AuthResponse;
export type MailConfirmApiArg = {
  token: string;
};
export type FindAllGenreApiResponse =
  /** status 200 Список жанров */ GenreDto[];
export type FindAllGenreApiArg = {
  locale: string;
};
export type GenerateLoginApiResponse =
  /** status 200 Уникальный на данный момент логин */ OriginalLoginResponse;
export type GenerateLoginApiArg = void;
export type SearchByTitleApiResponse =
  /** status 200 Возвращает найденные книги */ BookModelDto[];
export type SearchByTitleApiArg = {
  title: string;
};
export type BookInfoApiResponse =
  /** status 200 Возвращает данные книги */ BookModelDto;
export type BookInfoApiArg = {
  bookId: number;
};
export type BooksByUserApiResponse =
  /** status 200 Возвращает все книги пользователя */ BookModelDto[];
export type BooksByUserApiArg = {
  id: string;
};
export type BooksApiResponse =
  /** status 200 Возвращает все книги */ BookModelDto[];
export type BooksApiArg = void;
export type UserListApiResponse =
  /** status 200 Возвращает список пользователей */ InfoUsersDto[];
export type UserListApiArg = {
  /** Часовой пояс */
  zone: number;
};
export type DeleteForMeMessageApiResponse = unknown;
export type DeleteForMeMessageApiArg = {
  messageId: number;
};
export type NewErrorBody = {
  message?: string;
};
export type UserProfileDto = {
  /** Идентификатор */
  userId?: number;
  /** Имя */
  name?: string;
  /** Логин */
  login?: string;
  /** Город */
  city?: string;
  /** Почтовый адрес */
  email?: string;
};
export type UserPutProfileDto = {
  /** Имя */
  name: string;
  /** Старый пароль */
  oldPassword: string;
  /** Новый пароль */
  newPassword: string;
  /** Подвержение пароля */
  passwordConfirm: string;
  /** Город */
  city?: string;
};
export type MessageDto = {
  messageId?: number;
  sender?: number;
  text?: string;
  departureDate?: string;
  declaim?: boolean;
};
export type MessagePutRequest = {
  /** Идентификатор сообщения */
  messageId?: number;
  /** Текст сообщения */
  text: string;
};
export type UsersCorrKeyDto = {
  /** Идентификатор первого пользователя */
  firstUserId?: number;
  /** Идентификатор второго пользователя */
  secondUserId?: number;
};
export type MessageRequest = {
  usersCorrKeyDto?: UsersCorrKeyDto;
  /** Текст сообщения */
  text: string;
};
export type BookModelDto = {
  /** Название */
  title: string;
  /** Автор */
  author: string;
  /** Идентификатор жанра */
  genre?: number;
  /** Издательство */
  publishingHouse?: string;
  /** Год издания */
  year?: number;
  /** Идентификатор */
  bookId?: number;
  /** Идентификатор вложения */
  attachmentId?: number;
};
export type BookDto = {
  /** Название */
  title: string;
  /** Автор */
  author: string;
  /** Идентификатор жанра */
  genre?: number;
  /** Язык книги */
  language?: string;
  /** Издательство */
  publishingHouse?: string;
  /** Год издания */
  year?: number;
  /** Год издания */
  condition?: 'good' | 'bad' | 'normal';
  description?: string;
};
export type AttachmentMultipartDto = {
  /** Идентификатор книги */
  bookId?: number;
  file?: Blob;
};
export type UserPasswordDto = {
  /** Пароль */
  password: string;
  /** Подвержение пароля */
  passwordConfirm: string;
};
export type UserDto = {
  /** Идентификатор */
  userId?: number;
  /** Имя */
  name?: string;
  /** Логин */
  login?: string;
  /** Почта */
  email?: string;
  /** Город */
  city?: string;
  /** Заблокирован ли аккаунт */
  accountNonLocked?: boolean;
  /** Активирован ли аккаунт */
  enabled?: boolean;
  /** Время последнего входа */
  loginDate?: number;
};
export type UserRegistrationDto = {
  /** Имя */
  name: string;
  /** Логин */
  login: string;
  /** Пароль */
  password: string;
  /** Подвержение пароля */
  passwordConfirm?: string;
  /** Почта */
  email?: string;
  /** Город */
  city?: string;
};
export type AuthResponse = {
  /** Токен доступа */
  accessToken?: string;
};
export type BookFiltersRequest = {
  /** Город */
  city?: string;
  /** Название */
  title?: string;
  /** Автор */
  author?: string;
  /** Идентификатор жанра */
  genre?: number;
  /** Издательство */
  publishingHouse?: string;
  /** Год издания */
  year?: number;
};
export type LoginRequest = {
  /** Логин */
  login: string;
  /** Пароль */
  password?: string;
  /** Часовой пояс пользователя */
  zone?: number;
};
export type LockedUserDto = {
  /** Логин */
  login: string;
  /** Комментарий */
  comment: string;
};
export type UserPublicProfileDto = {
  /** Идентификатор */
  userId?: string;
  /** Имя */
  name?: string;
  /** Город */
  city?: string;
  /** Время последнего входа */
  loginDate?: string;
};
export type GenreDto = {
  id?: number;
  name?: string;
};
export type OriginalLoginResponse = {
  /** Уникальный логин */
  originalLogin?: string;
};
export type InfoUsersDto = {
  /** Идентификатор */
  userId?: number;
  /** Имя */
  name?: string;
  /** Логин */
  login?: string;
  /** Почта */
  email?: string;
  /** Город */
  city?: string;
  /** Заблокирован ли аккаунт */
  accountNonLocked?: boolean;
  /** Активирован ли аккаунт */
  enabled?: boolean;
  /** Время последнего входа */
  loginDate?: string;
};
export const {
  useGetProfileQuery,
  useLazyGetProfileQuery,
  usePutProfileMutation,
  usePutMessageMutation,
  useSendMessageMutation,
  useDeleteForEveryoneMessageMutation,
  useBookListQuery,
  useLazyBookListQuery,
  useSaveBookMutation,
  useDeleteBookMutation,
  useFindAttachmentQuery,
  useLazyFindAttachmentQuery,
  useSaveAttachmentMutation,
  useDeleteAttachmentMutation,
  useGetCorrespondenceQuery,
  useLazyGetCorrespondenceQuery,
  useCreateCorrespondenceMutation,
  useDeleteCorrespondenceMutation,
  useGetAllQuery,
  useLazyGetAllQuery,
  useSaveBookmarksMutation,
  useDeleteBookmarksMutation,
  useUpdatePasswordMutation,
  useSendResetPasswordEmailMutation,
  useRegisterUserMutation,
  useRefreshMutation,
  useSearchWithFiltersMutation,
  useAuthMutation,
  useNonLockedUserMutation,
  useLockedUserMutation,
  useGetAllProfileQuery,
  useLazyGetAllProfileQuery,
  useMailConfirmQuery,
  useLazyMailConfirmQuery,
  useFindAllGenreQuery,
  useLazyFindAllGenreQuery,
  useGenerateLoginQuery,
  useLazyGenerateLoginQuery,
  useSearchByTitleQuery,
  useLazySearchByTitleQuery,
  useBookInfoQuery,
  useLazyBookInfoQuery,
  useBooksByUserQuery,
  useLazyBooksByUserQuery,
  useBooksQuery,
  useLazyBooksQuery,
  useUserListQuery,
  useLazyUserListQuery,
  useDeleteForMeMessageMutation,
} = injectedRtkApi;
