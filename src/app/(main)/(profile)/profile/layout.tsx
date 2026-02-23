'use client'

import { Container } from '@shared/ui/container'
import { ProfileNav } from '@widgets/profile-nav'
import { LayoutProps } from '@shared/lib/types'
import { onest } from '@shared/fonts'
import styles from './layout.module.scss'

export default function ProfileLayout({ children }: LayoutProps) {
  return (
    <Container>
      <div className={`${styles.wrapper} ${onest.className}`}>
        <ProfileNav />
        <main className={styles.main}>{children}</main>
      </div>
    </Container>
  )
}
