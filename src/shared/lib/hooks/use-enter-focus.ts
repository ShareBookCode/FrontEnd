import { KeyboardEvent, useRef } from 'react'

export const useEnterFocus = () => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const register = (index: number) => (el: HTMLInputElement | null) => {
    inputsRef.current[index] = el
  }

  const handleKeyDown =
    (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()

        const nextInput = inputsRef.current[index + 1]

        if (nextInput) {
          nextInput.focus()
        } else {
          e.currentTarget.form?.requestSubmit()
        }
      }
    }

  return {
    register,
    handleKeyDown,
  }
}
