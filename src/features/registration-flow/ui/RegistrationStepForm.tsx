'use client'

import styles from './RegistrationFlow.module.scss'
import { validateRegistrationStep } from '../model/validate-registration-step'
import { useState } from 'react'
import { StepContent } from './StepContent'
import { getNextStep } from '../lib/steps'
import { getDraftPatchByStep } from '../lib/get-draft-patch-by-step'
import { registerUser } from '../model/register-user'
import { RegistrationStep } from '../lib/types'
import {
  clearRegistrationDraft,
  RegisterUserPayload,
  selectRegistrationDraftData,
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

export function RegistrationStepForm({ step }: { step: RegistrationStep }) {
  const updateParam = useUpdateSearchParam()
  const dispatch = useAppDispatch()
  const draft = useAppSelector(selectRegistrationDraftData)

  const [status, setStatus] =
    useState<ValidateRegistrationResult>(INITIAL_STATUS)

  const handleSubmit = async (formData: FormData) => {
    const result = await validateRegistrationStep(formData, step)
    const nextStep = getNextStep(step)

    if (nextStep && result.success) {
      const draftPatchByStep = getDraftPatchByStep(formData, step)

      dispatch(updateRegistrationDraft(draftPatchByStep))
      updateParam('step', nextStep, 'push')
    } else if (!nextStep && result.success) {
      const psw = formData.get('password')?.toString() || ''
      const registerUserPayload: RegisterUserPayload = {
        ...draft,
        psw,
      }

      dispatch(clearRegistrationDraft())
      await registerUser(registerUserPayload)
    }

    setStatus(result)
  }

  return (
    <form noValidate className={styles.form} action={handleSubmit}>
      <StepContent step={step} status={status} />
      {!status.success && (
        <Tooltip targetId={status.field} error={status.error} />
      )}
    </form>
  )
}
