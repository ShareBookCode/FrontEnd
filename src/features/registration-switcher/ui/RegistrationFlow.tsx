'use client'

import { useSearchParams } from 'next/navigation'
import styles from './RegistrationFlow.module.scss'
import { EmailStep } from './steps/email-step'
import { NameStep } from './steps/name-step'
import { PasswordStep } from './steps/password-step'
import { registration } from '../model/registration'
import { RegistrationParams, RegistrationState } from '../lib/types'
import { useState } from 'react'
import { useUpdateSearchParam } from '@/shared/lib/hooks'
import { Tooltip } from '@/shared/ui/tooltip'

export function RegistrationFlow() {
  const searchParams = useSearchParams()
  const updateParam = useUpdateSearchParam()
  const [state, setState] = useState<RegistrationState>({ success: true })
  const step = searchParams.get('step') || 'email'

  const onFinish = async () => {
    const params: RegistrationParams = {
      step: step,
      email: searchParams.get('email') || '',
      name: searchParams.get('name') || '',
      city: searchParams.get('city') || '',
    }

    const result = await registration(params)

    if (result.success) {
      if (step == 'email') {
        updateParam('step', 'name', 'push')
      } else if (step == 'name') {
        updateParam('step', 'password', 'push')
      }
    }

    setState(result)
  }

  return (
    <main className={styles.container}>
      <form noValidate className={styles.form} action={onFinish}>
        {step == 'email' && <EmailStep success={state.success} />}
        {step == 'name' && (
          <NameStep success={state.success} field={state.field} />
        )}
        {step == 'password' && (
          <PasswordStep success={state.success} field={state.field} />
        )}
        {state.field && <Tooltip inputId={state.field} />}
      </form>
    </main>
  )
}
