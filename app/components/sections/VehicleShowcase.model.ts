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
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2071&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2070&auto=format&fit=crop',
    description:
      'Elegante Limousine für exklusive Einzelfahrten. Höchster Komfort und Diskretion für anspruchsvolle Kunden.',
    specs: [
      { label: 'PASSAGIERE', value: 'Bis zu 3' },
      { label: 'GEPÄCK', value: 'Standard' },
      { label: 'KLASSE', value: 'Executive' },
    ],
  },
]
