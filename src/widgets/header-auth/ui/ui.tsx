import Link from 'next/link'
import styles from './ui.module.scss'
import Logo from '@icons/logo.svg'

export function HeaderAuth() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.logo} href='/'>
          <Logo />
        </Link>

        <button>Русский</button>
      </nav>
    </header>
  )
}
