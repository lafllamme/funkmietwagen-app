export interface BenefitItem {
  icon: string
  title: string
  description: string
}

export const benefits: BenefitItem[] = [
  {
    icon: 'ph:clock',
    title: 'Pünktlichkeit',
    description: 'Zuverlässig und immer rechtzeitig.',
  },
  {
    icon: 'ph:car-profile',
    title: 'Komfort',
    description: 'Moderne, gepflegte Fahrzeuge.',
  },
  {
    icon: 'ph:seal-check',
    title: 'Sicherheit',
    description: 'Erfahrene professionelle Fahrer.',
  },
  {
    icon: 'ph:star',
    title: 'Exzellenz',
    description: 'Erstklassiger persönlicher Service.',
  },
]
