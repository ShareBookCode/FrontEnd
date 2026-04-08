import { useEffect } from 'react'
import styles from './ui.module.scss'
import { useTranslations } from 'next-intl'

interface TooltipProps {
  targetId: string
  error: string
}

export function Tooltip({ targetId, error }: TooltipProps) {
  const t = useTranslations('Authentication.ErrorsField')

  useEffect(() => {
    const tooltip = document.getElementById('tooltip')
    const inputCoordinats = document
      .getElementById(targetId)
      ?.getBoundingClientRect()

    if (tooltip && inputCoordinats) {
      tooltip.style.left = `${inputCoordinats.left + 328}px`
      tooltip.style.top = `${inputCoordinats.bottom - tooltip.offsetHeight}px`
    }

    tooltip?.classList.add(styles.tooltipActive)
  }, [targetId, error])

  useEffect(() => {
    const handleResize = () => {
      const tooltip = document.getElementById('tooltip')
      const inputCoordinats = document
        .getElementById(targetId)
        ?.getBoundingClientRect()

      if (tooltip && inputCoordinats) {
        tooltip.style.left = `${inputCoordinats.left + 328}px`
        tooltip.style.top = `${inputCoordinats.bottom - tooltip.offsetHeight}px`
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [targetId])

  return (
    <div id='tooltip' className={styles.tooltip}>
      <p className={styles.title}>{t(`${error}.title`)}</p>
      <p className={styles.description}>{t(`${error}.description`)}</p>
    </div>
  )
}
