import clsx from 'clsx'
import styles from './skeleton.module.scss'

export function BookPreviewSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.cover} />
      <div className={clsx(styles.line, styles.title)} />
      <div className={clsx(styles.line, styles.titleSecond)} />
      <div className={clsx(styles.line, styles.author)} />
      <div className={clsx(styles.line, styles.location)} />
    </div>
  )
}
