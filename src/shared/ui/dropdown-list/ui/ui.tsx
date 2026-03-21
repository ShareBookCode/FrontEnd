import clsx from 'clsx'
import styles from './ui.module.scss'

interface DropdownListProps {
  values: string[]
  idList?: string
  idOption?: string
  label?: string
  classNameList?: string
  classNameOption?: string
}

export function DropdownList({
  values,
  idList,
  idOption,
  label,
  classNameList,
  classNameOption,
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
          key={value + index}
          id={`${idOption}-${index + 1}`}
          className={clsx(styles.option, classNameOption)}
          aria-selected='false'
          role='option'
        >
          {value}
        </li>
      ))}
    </ul>
  )
}
