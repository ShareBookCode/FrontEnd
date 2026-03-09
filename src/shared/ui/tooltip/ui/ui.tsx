import { useEffect } from 'react'
import styles from './ui.module.scss'

export function Tooltip({ inputId }: { inputId: string }) {
  useEffect(() => {
    const tooltip = document.getElementById('tooltip')
    const inputCoordinats = document
      .getElementById(inputId)
      ?.getBoundingClientRect()

    if (tooltip && inputCoordinats) {
      tooltip.style.left = `${inputCoordinats.left + 328}px`
      tooltip.style.top = `${inputCoordinats.top - 35}px`
    }

    tooltip?.classList.add(styles.tooltipActive)
  }, [inputId])

  return (
    <div id='tooltip' className={styles.tooltip}>
      <p className={styles.title}>Слабый пароль</p>
      <p className={styles.description}>
        Мы обнаружили совпадение с базами утекших паролей. Придумайте более
        сложный пароль
      </p>
    </div>
  )
}
