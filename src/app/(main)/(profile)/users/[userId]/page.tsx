'use client'

import { use } from 'react'
import { ProfileHeader } from '@widgets/profile-header'
import { useGetCurrentUserQuery, useGetUserByIdQuery } from '@entities/user'

interface PageProps {
  params: Promise<{ userId: string }>
}

export default function Page({ params }: PageProps) {
  const { userId } = use(params)

  const { data: currentUser } = useGetCurrentUserQuery()
  const { data: viewedUser, isLoading, isError } = useGetUserByIdQuery(userId)

  if (isLoading) return <div>Загрузка...</div>
  if (isError || !viewedUser) return <div>Пользователь не найден</div>

  const isOwner = currentUser?.id === viewedUser.id

  return <ProfileHeader user={viewedUser} isOwner={isOwner} />
}
