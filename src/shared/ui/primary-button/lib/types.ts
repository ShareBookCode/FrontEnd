import styles from '../ui/ui.module.scss'

export const sizeClass = {
  small: styles.sizeS,
  medium: styles.sizeM,
  large: styles.sizeL,
} as const

export type ButtonSizes = keyof typeof sizeClass

export const variantClass = {
  primaryFirst: styles['primary-first'],
  primarySecond: styles['primary-second'],
  primaryThird: styles['primary-third'],
  dangerFirst: styles['danger-first'],
  dangerSecond: styles['danger-second'],
  dangerThird: styles['danger-third'],
} as const

export type ButtonVariants = keyof typeof variantClass
