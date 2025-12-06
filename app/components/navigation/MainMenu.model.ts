export interface MainMenuLink {
  label: string
  href?: string
  submenu?: MainMenuLink[]
}

export interface MainMenuContact {
  email: string
  phone: string
  address?: string
}

export interface MainMenuSocial {
  label: string
  href: string
}

export const mainMenuItems: MainMenuLink[] = [
  { label: 'Start', href: '/' },
  { label: 'Reservieren', href: '/vorbestellung' },
  { label: 'Über uns', href: '/ueber-uns' },
  {
    label: 'Rechtliches',
    submenu: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
      { label: 'Nutzungsbedingungen', href: '/nutzungsbedingungen' },
    ],
  },
]

export const mainMenuContact: MainMenuContact = {
  email: 'info@funkmietwagen-ade.de',
  phone: '+49 123 456789',
  address: 'Köln & Umgebung · nach Vereinbarung',
}

export const mainMenuSocial: MainMenuSocial[] = [
  { label: 'LI', href: 'https://www.linkedin.com' },
  { label: 'IG', href: 'https://www.instagram.com' },
]
