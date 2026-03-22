export const MODAL_TYPES = {
  FAVORITES_PREVIEW: 'favorites-preview',
} as const

export type ModalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES]

export interface ModalState {
  isOpen: boolean
  type: ModalType | null
  payload: unknown
}
