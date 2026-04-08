'use client'

import {
  closeModal,
  MODAL_TYPES,
  selectModalIsOpen,
  selectModalType,
} from '@/entities/modal'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { Modal } from '@/shared/ui/modal'

export function FavoritesDevModalPreview() {
  const dispatch = useAppDispatch()
  const isModalOpen = useAppSelector(selectModalIsOpen)
  const modalType = useAppSelector(selectModalType)

  const isOpen = isModalOpen && modalType === MODAL_TYPES.FAVORITES_PREVIEW

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal())}
      ariaLabel='Favorites modal preview'
    >
      <div style={{ display: 'grid', gap: 12 }}>
        <div
          style={{
            display: 'grid',
            gap: 8,
            textAlign: 'center',
            padding: '8px 0 4px',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 600,
              color: '#101828',
            }}
          >
            Удалить что-нибудь?
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: '#667085',
              lineHeight: '20px',
            }}
          >
            Вы уверены, что хотите удалить это?
            <br />
            Это действие будет иметь последствия
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            paddingTop: 8,
          }}
        >
          <button
            type='button'
            onClick={() => dispatch(closeModal())}
            style={{
              border: '1px solid #e4e7ec',
              background: '#f2f4f7',
              color: '#344054',
              borderRadius: 10,
              padding: '11px 16px',
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Отмена
          </button>
          <button
            type='button'
            style={{
              border: 'none',
              background: '#d92d20',
              color: '#fff',
              borderRadius: 10,
              padding: '11px 16px',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Удалить
          </button>
        </div>
      </div>
    </Modal>
  )
}
