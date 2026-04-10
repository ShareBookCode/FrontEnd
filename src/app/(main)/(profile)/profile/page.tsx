'use client'

import { ProfileHeader } from '@widgets/profile-header'
import { useGetCurrentUserQuery } from '@entities/user'

export default function Page() {
  const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery()

  if (isLoading) return <div>Загрузка...</div>
  if (isError || !currentUser) return <div>Не удалось загрузить профиль</div>

  return <ProfileHeader user={currentUser} isOwner={true} />
}
