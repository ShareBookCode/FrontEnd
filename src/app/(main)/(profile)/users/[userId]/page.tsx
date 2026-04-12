import { redirect, notFound } from 'next/navigation'
import { ProfileHeader } from '@widgets/profile-header'
import { getUser, getUserById } from '@shared/api/user'

interface PageProps {
  params: Promise<{ userId: string }>
}

export default async function Page({ params }: PageProps) {
  const { userId } = await params

  const [currentUser, viewedUser] = await Promise.all([
    getUser(),
    getUserById(userId),
  ])

  if (!currentUser) redirect('/sign-in')
  if (!viewedUser) notFound()

  const isOwner = currentUser.id === viewedUser.id

  return <ProfileHeader user={viewedUser} isOwner={isOwner} />
}
