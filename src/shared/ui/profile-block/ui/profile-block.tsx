import styles from './profile-block.module.scss'

interface ProfileBlockProps {
  label: string
  description: string
  id?: string
}

export function ProfileBlock({ label, description, id }: ProfileBlockProps) {
  return (
    <div className={styles.content}>
      <h3 id={id} className={styles.label}>
        {label}
      </h3>
      <p className={styles.description}>{description}</p>
    </div>
  )
}
