import style from './text-input.module.scss'
import clsx from 'clsx'

interface Props {
  value: string
  onChange: (text: string) => void
  title: string
  description: string
  id: string
  variant: 'vertical' | 'horizontal'
  type: 'input' | 'textarea'
}

export function TextInput({
  value,
  onChange,
  title,
  description,
  id,
  variant,
  type,
}: Props) {
  return (
    <div className={clsx(style.wrapper, style[variant])}>
      <label htmlFor={id} className={style.label}>
        <span className={style.title}>{title}</span>
        <span className={style.description}>{description}</span>
      </label>
      {type === 'input' && (
        <input
          type='text'
          id={id}
          className={style.input}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}
      {type === 'textarea' && (
        <textarea
          id={id}
          className={style.textarea}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </div>
  )
}
