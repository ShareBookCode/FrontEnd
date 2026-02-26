import styles from './page.module.scss'
import HeartIcon from '@icons/heart.svg'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import { Container } from '@/shared/ui/container'
import { BookPreview } from '@/entities/book'

function Layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <div className={clsx(styles.page)}>
        <h1 className={styles.title}>Избранное</h1>
        {children}
      </div>
    </Container>
  )
}


export default function Page() {
  const favorites: BookPreview[] = []
  const isLoading = false
  const error = null

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (error) {
    return <div>Ошибка загрузки</div>
  }

  if (favorites.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyInner}>
          <div className={styles.iconWrap} aria-hidden='true'>
            <HeartIcon className={styles.icon} />
          </div>

          <div className={styles.emptyTitle}>Здесь пока пусто</div>

          <div className={styles.emptySubtitle}>
            Добавляйте сюда книги с помощью
            <HeartIcon className={styles.inlineIcon} aria-hidden='true' />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.list}>
      {favorites.map(book => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  )
}
