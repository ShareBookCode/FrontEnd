'use client'

import Link from 'next/link'
import styles from './ui.module.scss'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import ProfileIcon from '@/shared/assets/icons/profile.svg'
import Logo from '@/shared/assets/icons/logo.svg'
import SearchIcon from '@/shared/assets/icons/search.svg'
import { Container } from '@/shared/ui/container'
import { useTranslations } from 'next-intl'

const links = [
  { name: 'Главная', href: '/' },
  { name: 'Избранное', href: '/favorites' },
  { name: 'Чаты', href: '/chats' },
  { name: 'Новое объявление', href: '/new-book' },
]

export function HeaderMain() {
  const t = useTranslations('Header-main')
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <Container>
        <nav aria-label={t('navAriaLabel')} className={styles.nav}>
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
                  aria-label={t('inputAriaLabel')}
                  className={styles.search}
                  type='search'
                  name='q'
                  placeholder='Ищите фэнтези, детективы, романы'
                />
                <SearchIcon />
              </label>
            </form>

            <Link
              aria-label={t('profileAriaLabel')}
              href='/profile'
              className={styles.profile}
            >
              <ProfileIcon />
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  )
}
