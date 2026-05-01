import clsx from 'clsx'
import styles from './skeleton.module.scss'
import { Container } from '@shared/ui/container'

export function ProfileHeaderSkeleton() {
  return (
    <section className={styles.profileHeader}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.userInfo}>
            <div className={styles.avatar} />
            <div className={styles.details}>
              <div className={clsx(styles.bone, styles.name)} />
              <div className={clsx(styles.bone, styles.stats)} />
              <div className={clsx(styles.bone, styles.bio)} />
            </div>
          </div>
          <div className={clsx(styles.bone, styles.button)} />
        </div>
      </Container>
    </section>
  )
}
