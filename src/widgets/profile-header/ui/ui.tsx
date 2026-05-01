'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import clsx from 'clsx'
import HitIcon from '@icons/hit.svg'
import SettingsIcon from '@icons/settings.svg'
import styles from './ui.module.scss'
import { getInitials } from '../lib/get-initials'
import type { UserProfile } from '@entities/user'
import { Container } from '@shared/ui/container'
import { PrimaryButton, PrimaryLinkButton } from '@shared/ui/primary-button'
import { literata } from '@shared/assets/fonts'

interface ProfileHeaderProps {
  user: UserProfile
  isOwner: boolean
}

export function ProfileHeader({ user, isOwner }: ProfileHeaderProps) {
  const { name, avatar, stats, description } = user
  const t = useTranslations('ProfileHeader')

  return (
    <section className={styles.profileHeader}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.userInfo}>
            {avatar ? (
              // TODO: заменить на <Image>, когда появятся аватары в API
              <div
                className={styles.avatar}
                role='img'
                aria-label={name}
                style={{ backgroundImage: `url(${avatar})` }}
              />
            ) : (
              <div className={styles.avatar} aria-hidden='true'>
                <span className={styles.avatarInitial}>
                  {getInitials(name)}
                </span>
              </div>
            )}

            <div className={styles.details}>
              <h3 className={styles.name}>{name}</h3>

              <div className={styles.stats}>
                <HitIcon width={24} height={24} />
                <p className={styles.statsText}>
                  {t('given', { count: stats.given })}
                  <span className={styles.bullet}>•</span>
                  {t('exchanged', { count: stats.exchanged })}
                </p>
              </div>

              {description && (
                <p className={clsx(styles.bio, literata.className)}>
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className={styles.controls}>
            {isOwner ? (
              <>
                <Link
                  href='/settings/about-myself'
                  className={styles.settingsBtn}
                  aria-label={t('settingsAriaLabel')}
                >
                  <SettingsIcon width={24} height={24} />
                </Link>
                <PrimaryLinkButton
                  href='/new-book'
                  size='large'
                  className={styles.actionBtn}
                >
                  {t('newAd')}
                </PrimaryLinkButton>
              </>
            ) : (
              // TODO: подключить переход в чат с пользователем
              <PrimaryButton size='large' className={styles.actionBtn}>
                {t('writeMessage')}
              </PrimaryButton>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
