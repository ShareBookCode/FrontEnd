import { settingsTabsVariants } from '../model/data'
import { SettingsItem } from '../types/type'

export const getTabsByVariant = (
  variant: keyof typeof settingsTabsVariants,
): SettingsItem[] => {
  return settingsTabsVariants[variant] || []
}
