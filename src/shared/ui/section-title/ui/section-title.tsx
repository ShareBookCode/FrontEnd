import clsx from 'clsx'
import styles from './section-title.module.scss'

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2 className={clsx(styles.title, className)}>
      {children}
    </h2>
  )
}
