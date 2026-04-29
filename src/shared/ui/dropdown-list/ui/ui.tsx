import clsx from 'clsx'
import styles from './ui.module.scss'

type DropdownListValue = {
  primary: string
  secondary?: string
}

interface DropdownListProps {
  values: DropdownListValue[]
  idList?: string
  idOption?: string
  label?: string
  classNameList?: string
  classNameOption?: string
  onSelect?: (value: DropdownListValue) => void
}

export function DropdownList({
  values,
  idList,
  idOption,
  label,
  classNameList,
  classNameOption,
  onSelect,
}: DropdownListProps) {
  return (
    <ul
      id={idList}
      className={clsx(styles.list, classNameList)}
      aria-label={label}
      role='listbox'
    >
      {values.map((value, index) => (
        <li
          key={value.primary + index}
          id={`${idOption}-${index + 1}`}
          onClick={() => onSelect?.(value)}
          className={clsx(styles.option, classNameOption)}
          aria-selected='false'
          role='option'
        >
          {value.primary} {value.secondary && <span>, {value.secondary}</span>}
        </li>
      ))}
    </ul>
  )
}
