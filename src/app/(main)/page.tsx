import style from './page.module.scss'
import { BookFeed } from '@/widgets/bookfeed/index'

export default function Page() {
  return (
    <div className={style.main}>
      <BookFeed />
    </div>
  )
}
