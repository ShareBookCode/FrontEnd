import { CONDITION_OPTIONS, EXCHANGE_TYPE_OPTIONS } from './types'

type InputField = {
  type: 'input'
  key: 'title' | 'author' | 'language' | 'publisher' | 'year' | 'pages'
  required?: boolean
  inputType?: string
  min?: string
  max?: string
}

type GenreField = {
  type: 'genre'
  key: 'genre'
}

type ToggleField = {
  type: 'toggle'
  key: 'exchangeType' | 'condition'
  options: ReadonlyArray<{ value: string; label: string }>
}

export type FieldConfig = InputField | GenreField | ToggleField

export const FIELD_CONFIG: FieldConfig[] = [
  { type: 'input', key: 'title', required: true },
  { type: 'input', key: 'author', required: true },
  { type: 'genre', key: 'genre' },
  { type: 'input', key: 'language', required: true },
  { type: 'input', key: 'publisher' },
  { type: 'input', key: 'year', inputType: 'number', min: '1000', max: '2100' },
  { type: 'input', key: 'pages', inputType: 'number', min: '1' },
  { type: 'toggle', key: 'exchangeType', options: EXCHANGE_TYPE_OPTIONS },
  { type: 'toggle', key: 'condition', options: CONDITION_OPTIONS },
]
