export interface VehicleOption {
  id: string
  name: string
  type: string
  seats: string
  icon: string
}

export interface VehicleSelectProps {
  modelValue?: VehicleOption | null
  name?: string
  required?: boolean
}

export const vehicleOptions: VehicleOption[] = [
  {
    id: 'v-klasse',
    name: 'V-Klasse',
    type: 'Großraum',
    seats: 'bis 7 Personen',
    icon: 'mdi:van-passenger',
  },
  {
    id: 'lexus',
    name: 'Lexus',
    type: 'Limousine',
    seats: 'bis 3 Personen',
    icon: 'ion:car-sport',
  },
]

export const vehicleSelectDefaults: Required<Omit<VehicleSelectProps, 'modelValue'>> = {
  name: 'vehicle',
  required: false,
}
