export const formatAvatar = (
  avatar: string | null | undefined,
): string | null => {
  if (!avatar) return null
  if (avatar.startsWith('http')) return avatar
  return `data:image/png;base64,${avatar}`
}
