'use client'

import styles from './layout.module.scss'
import { ProfileNav } from '@widgets/profile-nav'
import { onest } from '@shared/fonts'
import { LayoutProps } from '@shared/lib/types'
import { Container } from '@shared/ui/container'

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
