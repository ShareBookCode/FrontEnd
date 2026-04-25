import styles from './layout.module.scss'

import { SettingsTabsMenu } from '@/features/settings-tabs-menu'

import { LayoutProps } from '@shared/lib/types'
import { Container } from '@/shared/ui/container'

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <Container className={styles.container}>
      <SettingsTabsMenu variant='settings' />
      {children}
    </Container>
  )
}
