'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'
import HitIcon from '@icons/hit.svg'
import SettingsIcon from '@icons/settings.svg'
import styles from './ui.module.scss'
import { getInitials } from '../lib/get-initials'
import type { UserProfile } from '@entities/user'
import { Container } from '@shared/ui/container'
import { PrimaryButton } from '@shared/ui/primary-button'
import { literata } from '@shared/assets/fonts'

const DESCRIPTION_LIMIT = 220

interface ProfileHeaderProps {
  user: UserProfile
  isOwner: boolean
}

export function ProfileHeader({ user, isOwner }: ProfileHeaderProps) {
  const { name, avatar, stats, description } = user
  const t = useTranslations('ProfileHeader')

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const shouldShowToggle = description.length > DESCRIPTION_LIMIT
  const descriptionText =
    shouldShowToggle && !isDescriptionExpanded
      ? `${description.slice(0, DESCRIPTION_LIMIT)}...`
      : description

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
                  {descriptionText}
                  {shouldShowToggle && (
                    <button
                      type='button'
                      className={styles.toggle}
                      onClick={() => setIsDescriptionExpanded(prev => !prev)}
                    >
                      {isDescriptionExpanded ? 'Свернуть' : 'Читать полностью'}
                    </button>
                  )}
                </p>
              )}
            </div>
          </div>

          <div className={styles.controls}>
            {isOwner ? (
              <>
                {/* TODO: подключить переход на страницу настроек */}
                <button
                  type='button'
                  className={styles.settingsBtn}
                  aria-label={t('settingsAriaLabel')}
                >
                  <SettingsIcon width={24} height={24} />
                </button>
                {/* TODO: подключить открытие формы нового объявления */}
                <PrimaryButton size='large' className={styles.actionBtn}>
                  {t('newAd')}
                </PrimaryButton>
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
