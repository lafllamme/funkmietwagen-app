export interface VehicleOption {
  id: string
  name: string
  type: string
  seats: string
  icon: string
  features: string[]
}

export interface VehicleRadioGroupProps {
  modelValue?: VehicleOption | null
  name?: string
  required?: boolean
  orientation?: 'vertical' | 'horizontal'
}

export const vehicleOptions: VehicleOption[] = [
  {
    id: 'v-klasse',
    name: 'V-Klasse',
    type: 'Großraum',
    seats: 'bis 7 Personen',
    icon: 'lucide:users',
    features: ['7 Sitze', 'Klimaanlage', 'WiFi'],
  },
  {
    id: 'lexus',
    name: 'ES Klasse',
    type: 'Limousine',
    seats: 'bis 3 Personen',
    icon: 'lucide:briefcase',
    features: ['4 Sitze', 'Leder', 'Premium Sound'],
  },
]

export const vehicleRadioGroupDefaults: Required<Omit<VehicleRadioGroupProps, 'modelValue'>> = {
  name: 'vehicle',
  required: false,
  orientation: 'vertical',
}
