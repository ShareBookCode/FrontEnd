import styles from './page.module.scss'
import HeartIcon from '@icons/heart.svg'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import type { BookPreview } from '@/entities/book/model'
import { Container } from '@/shared/ui/container'
import { onest } from '@shared/fonts'

function Layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <div className={clsx(styles.page, onest.className)}>
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
    return (
      <Layout>
        <div>Загрузка...</div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div>Ошибка загрузки</div>
      </Layout>
    )
  }

  if (favorites.length === 0) {
    return (
      <Layout>
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
      </Layout>
    )
  }

  return (
    <Layout>
      <div className={styles.list}>
        {favorites.map(book => (
          <div key={book.id}>{book.title}</div>
        ))}
      </div>
    </Layout>
  )
}
