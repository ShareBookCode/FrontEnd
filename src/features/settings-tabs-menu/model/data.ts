import type { SettingsItem } from '../types/type'

export const settingsTabsVariants: Record<string, SettingsItem[]> = {
  settings: [
    { label: 'О себе', href: '/settings/about-myself', icon: 'aboutMy' },
    { label: 'Аккаунт', href: '/settings/account', icon: 'account' },
    { label: 'Документы', href: '/documents', icon: 'document' },
  ],
}
