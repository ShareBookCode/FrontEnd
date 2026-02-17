import styles from './ui.module.scss'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { BookPreview as IBookPreview } from '../model/types'
import { literata } from '@/shared/assets/fonts'
import FavoriteIcon from '@/shared/assets/icons/favorite.svg'

export function BookPreview({ bookPreview }: { bookPreview: IBookPreview }) {
  const t = useTranslations('BookPreview')

  return (
    <article className={styles.card}>
      <div className={styles.cover}>
        <Link
          className={styles.coverLink}
          href={`/books/${bookPreview.id}`}
          aria-label={`${t('linkAriaLabel')} ${bookPreview.title}`}
        />

        <Image
          src={bookPreview.thumbnail}
          alt={`${t('imageAlt')} ${bookPreview.title}`}
          fill
        />

        <button
          type='button'
          className={styles.favorite}
          aria-label={t('buttonFavoriteAriaLabel')}
        >
          <FavoriteIcon />
        </button>
      </div>

      <h3 className={clsx(styles.title, literata.className)}>
        <Link href={`/books/${bookPreview.id}`}>{bookPreview.title}</Link>
      </h3>

      <p className={styles.author}>{bookPreview.author}</p>
      <p className={styles.location}>
        {bookPreview.location.city}, {bookPreview.location.district}
      </p>
    </article>
  )
}
