import style from './back-link.module.scss'

import ArrowBack from '../model/icons/arrow-back.svg'
import Link from 'next/link'

interface Props {
  path: string
  text: string
}

export function BackLink({ path, text }: Props) {
  return (
    <Link className={style.link} href={path}>
      <ArrowBack />
      <span>{text}</span>
    </Link>
  )
}
