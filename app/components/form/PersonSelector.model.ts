export interface PersonSelectorProps {
  modelValue?: number
  name?: string
  min?: number
  max?: number
  required?: boolean
  label?: string
}

export const personSelectorDefaults: Required<Omit<PersonSelectorProps, 'modelValue'>> = {
  name: 'passengers',
  min: 1,
  max: 7,
  required: false,
  label: 'Personen',
}
