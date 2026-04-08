'use client'

import { MODAL_TYPES, openModal } from '@/entities/modal'
import { useAppDispatch } from '@/shared/lib/hooks'

export function FavoritesDevModalTrigger() {
  const dispatch = useAppDispatch()

  return (
    <button
      style={{ width: 155, marginTop: 20 }}
      type='button'
      onClick={() =>
        dispatch(openModal({ type: MODAL_TYPES.FAVORITES_PREVIEW }))
      }
    >
      Открыть модалку
    </button>
  )
}
