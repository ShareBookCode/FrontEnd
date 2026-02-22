'use client'

import Link from 'next/link'
import styles from './ui.module.scss'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import ProfileIcon from '@/shared/assets/icons/profile.svg'
import Logo from '@/shared/assets/icons/logo.svg'
import SearchIcon from '@/shared/assets/icons/search.svg'
import { Container } from '@/shared/ui/container'

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
      <Container>
        <nav className={styles.nav}>
          <div>
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

          <div>
            <form action='/search' method='get'>
              <label className={styles.searchContainer}>
                <input
                  className={styles.search}
                  type='search'
                  name='q'
                  placeholder='Ищите фэнтези, детективы, романы'
                />
                <SearchIcon />
              </label>
            </form>

            <Link href='/profile' className={styles.profile}>
              <ProfileIcon />
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  )
}
