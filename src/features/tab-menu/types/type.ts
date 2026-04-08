import type { FC, SVGProps } from 'react'

export type TabItem = {
  label: string
  key: string
  icon: FC<SVGProps<SVGSVGElement>>
}

export type tabKeys = 'profile' | 'account' | 'documents'
