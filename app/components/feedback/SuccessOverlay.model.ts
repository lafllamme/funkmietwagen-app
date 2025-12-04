export interface SuccessOverlayProps {
  label?: string
  title?: string
  description?: string
  ctaLabel?: string
  ctaTo?: string
}

export const successOverlayDefaults: Required<SuccessOverlayProps> = {
  label: 'Bestätigung',
  title: 'Vielen Dank',
  description: 'Ihre Anfrage wurde erfolgreich übermittelt. Ein Mitarbeiter wird sich zeitnah bei Ihnen melden.',
  ctaLabel: 'Zur Startseite',
  ctaTo: '/',
}
