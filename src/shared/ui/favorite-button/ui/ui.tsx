import styles from './ui.module.scss'
import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import FavoriteIcon from '@/shared/assets/icons/favorite.svg'

interface FavoriteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export function FavoriteButton({ className, ...props }: FavoriteButtonProps) {
  const t = useTranslations('Book')

  return (
    <button
      type='button'
      className={clsx(styles.button, className)}
      aria-pressed='false'
      aria-label={t('buttonFavoriteAriaLabel')}
      {...props}
    >
      <FavoriteIcon />
    </button>
  )
}
