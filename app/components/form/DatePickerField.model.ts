import type { DateValue } from '@internationalized/date'

export type DatePickerFieldProps = {
  modelValue?: DateValue | null
  name?: string
  required?: boolean
  placeholder?: string
  id?: string
}

export const datePickerDefaults: Required<Omit<DatePickerFieldProps, 'modelValue'>> = {
  name: 'date',
  required: false,
  placeholder: 'Datum wählen',
  id: 'date',
}
