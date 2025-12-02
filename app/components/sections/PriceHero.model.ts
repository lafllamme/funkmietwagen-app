export interface PriceTier {
  id: string
  title: string
  price: string
  description: string
  details: string[]
  tag?: string
}

export const priceTiers: PriceTier[] = [
  {
    id: 'airport',
    title: 'Flughafentransfers',
    price: 'ab 45 €',
    description: 'Schnelle, direkte Transfers zu allen Flughäfen der Region.',
    details: ['Köln/Bonn (CGN) ab 45 €', 'Düsseldorf (DUS) ab 85 €', 'Frankfurt (FRA) ab 149 €'],
    tag: 'Beliebt',
  },
  {
    id: 'hourly',
    title: 'Stundenfahrt',
    price: 'ab 55 € / Std.',
    description: 'Flexibel buchbar für Business-Termine, City-Touren oder Events.',
    details: ['Mindestdauer 2 Stunden', 'Wartezeiten inklusive', 'Diskrete, erfahrene Fahrer'],
  },
  {
    id: 'executive',
    title: 'Business & Events',
    price: 'auf Anfrage',
    description: 'Individuelle Shuttle- und Eventkonzepte für Ihr Unternehmen.',
    details: ['Mehrsprachige Fahrer möglich', 'Flexible Routenplanung', 'Abgestimmte Fahrzeugflotte'],
    tag: 'Individuell',
  },
]
