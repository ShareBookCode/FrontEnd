'use client'
import styles from './settings-tabs-menu.module.scss'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { TabIcons } from '../tab-icons/tab-icons'

import clsx from 'clsx'
import { settingsTabsVariants } from '../../model/data'
import { getTabsByVariant } from '../../lib/getTabsByVariant'
import { onest } from '@shared/assets/fonts'

interface Props {
  variant: keyof typeof settingsTabsVariants
}

export function SettingsTabsMenu({ variant }: Readonly<Props>) {
  const tabs = getTabsByVariant(variant)
  const pathname = usePathname()

  return (
    <div className={clsx(styles.menu, onest.className)}>
      <h2 className={styles.title}>Настройки</h2>
      <div>
        {tabs.map(tab => {
          const isActive = pathname === tab.href

          return (
            <Link
              className={clsx(styles.link, isActive && styles.linkActive)}
              href={tab.href}
              key={tab.href}
            >
              <TabIcons
                name={tab.icon}
                className={clsx(styles.icon, isActive && styles.iconActive)}
                width={18}
                height={18}
                aria-hidden
              />
              {tab.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
