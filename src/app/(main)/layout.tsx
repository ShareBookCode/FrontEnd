import { HeaderMain } from '@/src/widgets/header-main'
import { LayoutProps } from '@/src/shared/lib/types'

export default function Layout({ children }: LayoutProps) {
  return (
    <div className=''>
      <HeaderMain />
      {children}
    </div>
  )
}
