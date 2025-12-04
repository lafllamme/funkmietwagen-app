export interface BenefitItem {
  icon: string
  title: string
  description: string
}

export const benefits: BenefitItem[] = [
  {
    icon: 'lucide:calendar-clock',
    title: 'Planbar auf die Minute',
    description: 'Verlässliche Abholzeiten mit aktivem Monitoring von Verkehr und Flugplänen.',
  },
  {
    icon: 'ph:car-profile-light',
    title: 'Komfortable Flotte',
    description: 'Gepflegte Business- und First-Class Fahrzeuge mit leiser Fahrt und diskretem Auftreten.',
  },
  {
    icon: 'ph:seal-check',
    title: 'Diskrete Chauffeure',
    description: 'Erfahrene Fahrer mit Ortskenntnis, sicherer Fahrweise und Blick für Details.',
  },
  {
    icon: 'ph:handshake',
    title: 'Service mit Haltung',
    description: 'Persönliche Betreuung, klare Kommunikation, zuverlässige Begleitung vom Einstieg bis Ziel.',
  },
]
