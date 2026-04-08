'use client'

import { useSearchParams } from 'next/navigation'
import styles from './RegistrationFlow.module.scss'
import { useEffect } from 'react'
import { RegistrationStepForm } from './RegistrationStepForm'
import { getRegistrationStep } from '../lib/steps'
import {
  fetchRegistrationDraft,
  selectRegistrationDraftIsLoading,
} from '@/entities/registration'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'

export function RegistrationFlow() {
  const searchParams = useSearchParams()
  const isLoading = useAppSelector(selectRegistrationDraftIsLoading)
  const dispatch = useAppDispatch()

  const step = getRegistrationStep(searchParams.get('step'))

  useEffect(() => {
    dispatch(fetchRegistrationDraft())
  }, [dispatch])

  return (
    <main className={styles.container}>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <RegistrationStepForm key={step} step={step} />
      )}
    </main>
  )
}
