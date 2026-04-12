import { redirect } from 'next/navigation'
import { ProfileHeader } from '@widgets/profile-header'
import { getUser } from '@shared/api/user'

export default async function Page() {
  const user = await getUser()

  if (!user) redirect('/sign-in')

  return <ProfileHeader user={user} isOwner={true} />
}
