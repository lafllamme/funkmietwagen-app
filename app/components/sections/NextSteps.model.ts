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
    description: 'Direkte Preisermittlung für Ihre Wunschfahrt.',
  },
  {
    step: '3',
    title: 'Buchung bestätigen',
    description: 'Einfach per E-Mail oder telefonisch bestätigen.',
  },
  {
    step: '4',
    title: 'Entspannt reisen',
    description: 'Wir kümmern uns um alles Weitere.',
  },
]
