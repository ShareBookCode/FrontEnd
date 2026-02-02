import { HeaderMain } from '@/src/widgets/header-main'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=''>
      <HeaderMain />
      {children}
    </div>
  )
}
