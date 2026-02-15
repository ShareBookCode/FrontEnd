'use client'

import Link from 'next/link'
import styles from './header.module.scss'
import ProfileIcon from '@icons/profile.svg'
import Logo from '@icons/logo.svg'
import SearchIcon from '@icons/search.svg'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { LangSwitcher } from '@/features/language-switcher'
import { onest } from '@shared/fonts'

const links = [
  { name: 'Главная', href: '/' },
  { name: 'Избранное', href: '/favorites' },
  { name: 'Чаты', href: '/chats' },
  { name: 'Новое объявление', href: '/new-book' },
]

export function HeaderMain() {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <nav className={clsx(styles.nav, onest.className)}>
        <div className={styles.leftSection}>
          <Link className={styles.logo} href='/'>
            <Logo />
          </Link>

          <ul className={styles.menu}>
            {links.map(link => (
              <li key={link.name}>
                <Link
                  className={clsx(
                    styles.link,
                    pathname === link.href && styles.linkActive,
                  )}
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.rightSection}>
          <form action='/search' method='get'>
            <label className={styles.searchContainer}>
              <input
                className={clsx(styles.search, onest.className)}
                type='search'
                name='q'
                placeholder='Ищите фэнтези, детективы, романы'
              />
              <SearchIcon />
            </label>
          </form>

          <LangSwitcher />

          <Link href='/profile' className={styles.profile}>
            <ProfileIcon />
          </Link>
        </div>
      </nav>
    </header>
  )
}