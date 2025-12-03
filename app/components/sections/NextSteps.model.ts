export interface StepItem {
  step: string
  title: string
  description: string
}

export const steps: StepItem[] = [
  {
    step: '1',
    title: 'Anfrage senden',
    description: 'Formular ausfüllen und abschicken.',
  },
  {
    step: '2',
    title: 'Angebot erhalten',
    description: 'In der Regel innerhalb von 2 Stunden.',
  },
  {
    step: '3',
    title: 'Buchung bestätigen',
    description: 'Einfach per E-Mail bestätigen.',
  },
  {
    step: '4',
    title: 'Entspannt reisen',
    description: 'Wir kümmern uns um alles Weitere.',
  },
]
