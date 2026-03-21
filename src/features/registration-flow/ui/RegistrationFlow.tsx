'use client'

import { useSearchParams } from 'next/navigation'
import styles from './RegistrationFlow.module.scss'
import { validateRegistrationStep } from '../model/validate-registration-step'
import { useEffect, useState } from 'react'
import { StepContent } from './StepContent'
import { getNextStep, getRegistrationStep } from '../lib/steps'
import { getDraftPatchByStep } from '../lib/get-draft-patch-by-step'
import {
  fetchRegistrationDraft,
  selectRegistrationDraftIsLoading,
  updateRegistrationDraft,
  ValidateRegistrationResult,
} from '@/entities/registration'
import {
  useAppDispatch,
  useAppSelector,
  useUpdateSearchParam,
} from '@/shared/lib/hooks'
import { Tooltip } from '@/shared/ui/tooltip'

const INITIAL_STATUS: ValidateRegistrationResult = { success: true }

type StepStatusState = {
  step: string
  status: ValidateRegistrationResult
}

export function RegistrationFlow() {
  const searchParams = useSearchParams()
  const updateParam = useUpdateSearchParam()
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectRegistrationDraftIsLoading)

  const step = getRegistrationStep(searchParams.get('step'))

  const [stepStatus, setStepStatus] = useState<StepStatusState>({
    step,
    status: INITIAL_STATUS,
  })

  // сбрасываем status до дефолтого, если возвращаемся на предыдуший шаг регистрации
  if (step !== stepStatus.step) {
    setStepStatus({
      step,
      status: INITIAL_STATUS,
    })
  }

  useEffect(() => {
    dispatch(fetchRegistrationDraft())
  }, [dispatch])

  const handleSubmit = async (formData: FormData) => {
    const result = await validateRegistrationStep(formData, step)
    const nextStep = getNextStep(step)

    if (nextStep && result.success) {
      const draft = getDraftPatchByStep(formData, step)
      dispatch(updateRegistrationDraft(draft))
      updateParam('step', nextStep, 'push')
    }

    setStepStatus({
      step,
      status: result,
    })
  }

  return (
    <main className={styles.container}>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <form noValidate className={styles.form} action={handleSubmit}>
          <StepContent step={step} status={stepStatus.status} />
          {!stepStatus.status.success && (
            <Tooltip
              targetId={stepStatus.status.field}
              error={stepStatus.status.error}
            />
          )}
        </form>
      )}
    </main>
  )
}
