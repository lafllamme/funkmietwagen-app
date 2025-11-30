export interface VehicleSpec {
  label: string
  value: string
}

export interface VehicleCard {
  id: string
  name: string
  type: string
  image: string
  description: string
  specs: VehicleSpec[]
}

export const vehicles: VehicleCard[] = [
  {
    id: 'v-klasse',
    name: 'Mercedes V-Klasse',
    type: 'GROSSRAUM',
    image: 'https://wallpapercave.com/wp/wp10473679.jpg',
    description:
      'Großzügiger Innenraum für bis zu 7 Passagiere. Perfekt für Gruppen, Familien oder Business-Transfers mit viel Gepäck.',
    specs: [
      { label: 'PASSAGIERE', value: 'Bis zu 7' },
      { label: 'GEPÄCK', value: 'XXL' },
      { label: 'KLASSE', value: 'Premium' },
    ],
  },
  {
    id: 'lexus',
    name: 'Lexus Limousine',
    type: 'LIMOUSINE',
    image: 'https://images.unsplash.com/photo-1577496549804-8b05f1f67338?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGV4dXN8ZW58MHx8MHx8fDA%3D',
    description:
      'Elegante Limousine für exklusive Einzelfahrten. Höchster Komfort und Diskretion für anspruchsvolle Kunden.',
    specs: [
      { label: 'PASSAGIERE', value: 'Bis zu 3' },
      { label: 'GEPÄCK', value: 'Standard' },
      { label: 'KLASSE', value: 'Executive' },
    ],
  },
]
