import style from './page.module.scss'
import { BooksFeed } from '@/widgets/bookList/index'

export default function Page() {
  return (
    <div className={style.main}>
      <BooksFeed />
    </div>
  )
}
