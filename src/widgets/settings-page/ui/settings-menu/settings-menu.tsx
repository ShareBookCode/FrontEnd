'use client'

import styles from './settings-menu.module.scss'
import { PageAccount } from '../test-pages/account'
import { aboutMyself } from '../about-myself-page/about-myself'
import { PageDocuments } from '../test-pages/documents'

import { useState } from 'react'

import clsx from 'clsx'

import { TabMenu } from '@/features/tab-menu'
import { tabData } from '@/features/tab-menu'
import { tabKeys } from '@/features/tab-menu'
import { onest } from '@shared/assets/fonts'

const tabContent = {
  account: PageAccount,
  profile: aboutMyself,
  documents: PageDocuments,
}

export function SettingsMenu() {
  const [activeItem, setActiveItem] = useState<tabKeys>('profile')
  const ActiveContent = tabContent[activeItem]
  return (
    <div className={clsx(styles.wrapper, onest.className)}>
      <div className={styles.container}>
        <div className={styles.menu}>
          <h2 className={styles.title}>Настройки</h2>
          <TabMenu
            items={tabData}
            currentKey={activeItem}
            setTab={setActiveItem}
          />
        </div>
        <ActiveContent />
      </div>
    </div>
  )
}
