export type ModalType = string

export interface ModalState {
  isOpen: boolean
  type: ModalType | null
  payload: unknown
}
