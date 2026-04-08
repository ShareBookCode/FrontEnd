import styles from './layout.module.scss'
import { HeaderAuth } from '@/widgets/header-auth'
import { LayoutProps } from '@shared/lib/types'

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.wrapper}>
      <HeaderAuth />
      {children}
    </div>
  )
}
