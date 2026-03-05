import type { RootState } from '../../types'

export const selectModalIsOpen = (state: RootState) => state.modal.isOpen
export const selectModalType = (state: RootState) => state.modal.type
export const selectModalPayload = (state: RootState) => state.modal.payload
