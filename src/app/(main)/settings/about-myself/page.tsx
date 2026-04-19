import { AboutMyselfPage } from '@/widgets/about-myself-page'
import { getTokenTest } from './lib/getTokenTest'
import { getUserDataTest } from './lib/getUserDataTest'
import { submitProfile } from './lib/action'

export default async function Page() {
  const user = {
    login: '1',
    psw: 'Simple',
  }
  const token = await getTokenTest(user)
  const userData = await getUserDataTest(token)

  const initialData = {
    name: userData?.name || 'Тестовый Пользователь',
    description: userData?.description || 'Био пока не заполнено',
    avatarUrl: userData?.avatarUrl || '',
  }
  const actionWithToken = submitProfile.bind(null, token)
  return (
    <AboutMyselfPage initialData={initialData} submitAction={actionWithToken} />
  )
}
