import type { DateValue } from '@internationalized/date'

export interface DatePickerFieldProps {
  modelValue?: DateValue | null
  name?: string
  required?: boolean
  placeholder?: string
  id?: string
  locale?: string
}

export const datePickerDefaults: Required<Omit<DatePickerFieldProps, 'modelValue'>> = {
  name: 'date',
  required: false,
  placeholder: 'TT.MM.JJJJ',
  id: 'date',
  locale: 'de',
}
