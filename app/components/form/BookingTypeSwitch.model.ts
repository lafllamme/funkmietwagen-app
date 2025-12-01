export type BookingType = 'route' | 'hourly'

export const bookingTypeOptions: Array<{ value: BookingType, label: string }> = [
  { value: 'route', label: 'Strecke' },
  { value: 'hourly', label: 'Stunden' },
]
