import { SVGProps } from 'react'

import IconAboutMy from '../../model/icons/about-my.svg'
import IconAccount from '../../model/icons/account.svg'
import IconDocument from '../../model/icons/document.svg'
const iconsMap: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  aboutMy: IconAboutMy,
  account: IconAccount,
  document: IconDocument,
}

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: string
}

export function TabIcons({ name, ...props }: Readonly<IconProps>) {
  const Component = iconsMap[name]
  if (!Component) {
    console.warn(`[TabIcons] Icon "${name}" not found`)
    return null
  }
  return <Component {...props} />
}
