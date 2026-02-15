import { HeaderMain } from '@widgets/header-main'
import { LayoutProps } from '@shared/lib/types'

export default function Layout({ children }: LayoutProps) {
  return (
    <div className=''>
      <HeaderMain />
      {children}
    </div>
  )
}
