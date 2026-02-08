'use client'

import Link from 'next/link'
import styles from './ui.module.scss'
import ProfileIcon from '@/src/shared/icons/profile.svg'
import Logo from '@/src/shared/icons/logo.svg'
import SearchIcon from '@/src/shared/icons/search.svg'
import { onest } from '@/src/shared/fonts/fonts'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

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
      <nav className={`${styles.header__nav} ${onest.className}`}>
        <Link className={styles.header__logo} href='/'>
          <Logo />
        </Link>

        <ul className={styles.header__menu}>
          {links.map(link => (
            <li key={link.name}>
              <Link
                className={clsx(
                  styles.header__link,
                  pathname === link.href && styles.header__linkActive,
                )}
                href={link.href}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.header__spacer}></div>

        <form action='/search' method='get'>
          <label className={styles.header__searchContainer}>
            <input
              className={`${styles.header__search} ${onest.className}`}
              type='search'
              name='q'
              placeholder='Ищите фэнтези, детективы, романы'
            />
            <SearchIcon />
          </label>
        </form>

        <Link href='/profile' className={styles.header__profile}>
          <ProfileIcon />
        </Link>
      </nav>
    </header>
  )
}
