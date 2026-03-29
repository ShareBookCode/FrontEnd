export { modalReducer, openModal, closeModal } from './model/slice'
export {
  selectModalIsOpen,
  selectModalType,
  selectModalPayload,
} from './model/selectors'
export { MODAL_TYPES } from './model/types'
export type { ModalState, ModalType } from './model/types'
