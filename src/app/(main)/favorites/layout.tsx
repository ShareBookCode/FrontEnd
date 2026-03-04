import clsx from 'clsx'
import styles from './page.module.scss'
import { Container } from '@/shared/ui/container'
import { LayoutProps } from '@shared/lib/types'
import { onest } from '@/shared/assets/fonts'

export default function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <div className={clsx(styles.page, onest.className)}>
        <h1 className={styles.title}>Избранное</h1>
        {children}
      </div>
    </Container>
  )
}
