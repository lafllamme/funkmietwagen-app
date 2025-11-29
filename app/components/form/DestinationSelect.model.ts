export interface DestinationOption {
  code: string
  label: string
}

export interface DestinationSelectProps {
  modelValue?: DestinationOption | null
  inputId?: string
  inputName?: string
  codeName?: string
  labelName?: string
  required?: boolean
  placeholder?: string
}

export const destinationOptions: DestinationOption[] = [
  { code: 'cgn', label: 'Flughafen Köln/Bonn (CGN)' },
  { code: 'dus', label: 'Flughafen Düsseldorf (DUS)' },
  { code: 'fra', label: 'Flughafen Frankfurt (FRA)' },
]

export const destinationSelectDefaults: Required<Omit<DestinationSelectProps, 'modelValue'>> = {
  inputId: 'destination',
  inputName: 'destination',
  codeName: 'destinationCode',
  labelName: 'destinationLabel',
  required: false,
  placeholder: 'Eigenes Ziel eingeben oder wählen',
}
