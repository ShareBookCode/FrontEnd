export { modalReducer, openModal, closeModal } from './model/slice'
export {
  selectModalIsOpen,
  selectModalType,
  selectModalPayload,
} from './model/selectors'
export type { ModalState, ModalType } from './model/types'
