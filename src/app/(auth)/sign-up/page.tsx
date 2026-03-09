import styles from './page.module.scss'
import Link from 'next/link'
import { RegistrationFlow } from '@/features/registration-switcher'

export default function Page() {
  return (
    <>
      <RegistrationFlow />
      <footer className={styles.footer}>
        Регистрируясь, вы соглашаетесь с 
        <Link href=''>политикой конфиденциальности и обработки данных</Link>
      </footer>
    </>
  )
}
