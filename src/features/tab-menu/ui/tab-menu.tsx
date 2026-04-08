import styles from './tab-menu.module.scss'
import { TabItem, tabKeys } from '../types/type'
import clsx from 'clsx'

type Props = {
  items: TabItem[]
  currentKey: 'profile' | 'account' | 'documents'
  setTab: (el: tabKeys) => void
}

export function TabMenu({ items, currentKey, setTab }: Props) {
  return (
    <div className={styles.menu}>
      {items.map(item => {
        const Icon = item.icon
        return (
          <button
            type='button'
            className={clsx(
              styles.item,
              currentKey === item.key && styles.itemActive,
            )}
            key={`${item.key}-${item.label}`}
            tabIndex={0}
            onClick={() => setTab(item.key as tabKeys)}
          >
            <Icon
              className={clsx(
                styles.icon,
                currentKey === item.key && styles.iconActive,
              )}
              width={18}
              height={18}
              aria-hidden
            />
            <span
              className={clsx(
                styles.label,
                currentKey === item.key && styles.labelActive,
              )}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
