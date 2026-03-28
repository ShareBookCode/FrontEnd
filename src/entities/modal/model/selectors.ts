import type { ModalState } from './types'

interface PartialState {
  modal: ModalState
}

export const selectModalIsOpen = (state: PartialState): ModalState['isOpen'] =>
  state.modal.isOpen
export const selectModalType = (state: PartialState): ModalState['type'] =>
  state.modal.type
export const selectModalPayload = (
  state: PartialState,
): ModalState['payload'] => state.modal.payload
