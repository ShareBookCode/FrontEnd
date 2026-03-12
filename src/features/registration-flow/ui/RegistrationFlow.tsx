'use client'

import { useSearchParams } from 'next/navigation'
import styles from './RegistrationFlow.module.scss'
import { validateRegistrationStep } from '../model/validate-registration-step'
import { ValidateRegistrationResult } from '../lib/types'
import { useState } from 'react'
import { StepContent } from './StepContent'
import { getRegistrationParams } from '../lib/get-registration-params'
import { getNextStep } from '../lib/steps'
import { useUpdateSearchParam } from '@/shared/lib/hooks'
import { Tooltip } from '@/shared/ui/tooltip'

const INITIAL_STATUS: ValidateRegistrationResult = { success: true }

export function RegistrationFlow() {
  const searchParams = useSearchParams()
  const updateParam = useUpdateSearchParam()
  const [status, setStatus] =
    useState<ValidateRegistrationResult>(INITIAL_STATUS)

  const params = getRegistrationParams(searchParams)
  const currentStep = params.step

  const handleSubmit = async () => {
    const result = await validateRegistrationStep(params)
    const nextStep = getNextStep(currentStep)
    if (nextStep && result.success) {
      updateParam('step', nextStep, 'push')
    }

    setStatus(result)
  }

  return (
    <main className={styles.container}>
      <form noValidate className={styles.form} action={handleSubmit}>
        <StepContent step={currentStep} status={status} />
        {!status.success && (
          <Tooltip targetId={status.field} error={status.error} />
        )}
      </form>
    </main>
  )
}
