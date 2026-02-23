'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import clsx from 'clsx'
import styles from './profile-nav.module.scss'
import { onest } from '@shared/fonts'
import AboutIcon from '@/shared/assets/icons/about.svg'
import ProfileIcon from '@/shared/assets/icons/profile.svg'
import DocumentIcon from '@/shared/assets/icons/document.svg'

const navItems = [
  { href: '/profile/about', label: 'О себе', icon: 'about' as const },
  { href: '/profile/account', label: 'Аккаунт', icon: 'account' as const },
  { href: '/profile/documents', label: 'Документы', icon: 'document' as const },
]

const iconMap = {
  about: AboutIcon,
  account: ProfileIcon,
  document: DocumentIcon,
}

export function ProfileNav() {
  const pathname = usePathname()

  return (
    <aside
      className={`${styles.aside} ${onest.className}`}
      aria-label='Навигация настроек'
    >
      <div className={styles.asideInner}>
        <h1 className={styles.title}>Настройки</h1>
        <nav className={styles.nav}>
          {navItems.map(({ href, label, icon }) => {
            const isActive = pathname === href
            const Icon = iconMap[icon]
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  styles.navLink,
                  isActive && styles.navLinkActive,
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={styles.navIcon} />
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
