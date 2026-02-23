'use client'

import { useState } from 'react'
import styles from './password-change.module.scss'

import { Modal } from '@shared/ui/modal'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { ProfileBlock } from '@shared/ui/profile-block'
import PasswordChangeIcon from '@/shared/assets/icons/password-change.svg'
import EyeOpenedIcon from '@/shared/assets/icons/eye-open.svg'

interface IProps {
  isOpen: boolean
  onClose: () => void
  onNext?: (currentPassword: string) => void
}

export function PasswordChange({ isOpen, onClose, onNext }: IProps) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleClose = () => {
    setPassword('')
    setShowPassword(false)
    onClose()
  }

  const handleNext = () => {
    onNext?.(password)
    handleClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className={styles.panel}>
      <div className={styles.content}>
        <div className={styles.iconWrap}>
          <PasswordChangeIcon className={styles.icon} aria-hidden />
        </div>
        <div className={styles.textBlock}>
          <ProfileBlock
            label='Смена пароля'
            description='Ваш аккаунт защищен паролем, для его смены введите текущий пароль.'
          />
        </div>
        <div className={styles.inputWrap}>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder='Текущий пароль'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.inputFullWidth}
          />
          <button
            type='button'
            className={styles.eyeButton}
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
          >
            <EyeOpenedIcon className={styles.eyeIcon} aria-hidden />
          </button>
        </div>
        <div className={styles.actions}>
          <Button
            variant='secondary'
            onClick={handleClose}
            className={styles.actionBtn}
          >
            Отмена
          </Button>
          <Button
            variant='primary'
            onClick={handleNext}
            className={styles.actionBtn}
          >
            Далее
          </Button>
        </div>
      </div>
    </Modal>
  )
}
