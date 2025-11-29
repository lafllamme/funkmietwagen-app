import type { TimeValue } from '@internationalized/date'

export interface TimeFieldProps {
  modelValue?: TimeValue | null
  name?: string
  required?: boolean
  placeholder?: string
  id?: string
  locale?: string
}

export const timeFieldDefaults: Required<Omit<TimeFieldProps, 'modelValue'>> = {
  name: 'time',
  required: false,
  placeholder: 'HH:MM',
  id: 'time',
  locale: 'de',
}
