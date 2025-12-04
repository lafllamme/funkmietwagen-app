import type { Time } from '@internationalized/date'
import { parseTime } from '@internationalized/date'

export interface TimeFieldProps {
  modelValue?: Time | null
  name?: string
  required?: boolean
  placeholder?: string
  id?: string
  locale?: string
  preferNative?: boolean
  error?: boolean
}

export const timeFieldDefaults: Required<Omit<TimeFieldProps, 'modelValue'>> = {
  name: 'time',
  required: false,
  placeholder: 'HH:MM',
  id: 'time',
  locale: 'de',
  preferNative: true,
  error: false,
}

export const defaultTimeValue: Time = parseTime('11:11')
