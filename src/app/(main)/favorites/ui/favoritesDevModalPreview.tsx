'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Modal } from '@/shared/ui/modal'

const PREVIEW_QUERY_VALUE = 'true'

export function FavoritesDevModalPreview() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const isDev = process.env.NODE_ENV !== 'production'
  const isOpen = isDev && searchParams.get('modal') === PREVIEW_QUERY_VALUE

  const handleClose = () => {
    const nextParams = new URLSearchParams(searchParams.toString())
    nextParams.delete('modal')
    const query = nextParams.toString()
    router.replace(query ? `${pathname}?${query}` : pathname)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
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
            onClick={handleClose}
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
