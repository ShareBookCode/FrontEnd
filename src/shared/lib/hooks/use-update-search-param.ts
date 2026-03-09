import { useSearchParams, useRouter } from 'next/navigation'

export const useUpdateSearchParam = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    name: string,
    value: string,
    type: 'replace' | 'push' = 'replace',
  ) => {
    const params = new URLSearchParams(searchParams)
    params.set(name, value)

    if (type == 'replace') {
      router.replace(`?${params.toString()}`, { scroll: false })
    } else {
      router.push(`?${params.toString()}`)
    }
  }
}
