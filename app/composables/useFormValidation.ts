import type { DateValue, Time } from '@internationalized/date'
import type { DestinationOption } from '@/components/form/DestinationSelect.model'
import type { VehicleOption } from '@/components/form/VehicleRadioGroup.model'
import { reactive } from 'vue'

export type FieldKey
  = | 'name'
    | 'phone'
    | 'email'
    | 'pickup'
    | 'destination'
    | 'date'
    | 'time'
    | 'vehicle'

type Errors = Record<FieldKey, string | null>

const initialErrors: Errors = {
  name: null,
  phone: null,
  email: null,
  pickup: null,
  destination: null,
  date: null,
  time: null,
  vehicle: null,
}

interface ValidationPayload {
  name: string
  phone: string
  email: string
  pickup: string
  destination: DestinationOption | null
  date: DateValue | null
  time: Time | null
  vehicle: VehicleOption | null
  bookingType: 'route' | 'hourly'
}

export function useFormValidation() {
  const errors = reactive<Errors>({ ...initialErrors })

  const clearErrors = () => {
    (Object.keys(errors) as FieldKey[]).forEach(key => (errors[key] = null))
  }

  const setError = (key: FieldKey, message: string) => {
    errors[key] = message
  }

  const validate = (payload: ValidationPayload) => {
    clearErrors()
    let firstInvalid: FieldKey | null = null
    const mark = (key: FieldKey, message: string) => {
      setError(key, message)
      if (!firstInvalid)
        firstInvalid = key
    }

    if (!payload.name.trim())
      mark('name', 'Bitte Name angeben.')

    const emailPattern = /^[^@\s]+@[^\s@][^\s.@]*\.[^\s@]+$/
    if (!payload.email.trim() || !emailPattern.test(payload.email))
      mark('email', 'Bitte gültige E-Mail-Adresse eingeben.')

    const phoneDigits = payload.phone.replace(/\D/g, '')
    if (phoneDigits.length < 6)
      mark('phone', 'Bitte gültige Telefonnummer eingeben.')

    if (!payload.pickup.trim())
      mark('pickup', 'Bitte Abholadresse angeben.')

    if (payload.bookingType === 'route' && !payload.destination)
      mark('destination', 'Bitte Ziel wählen oder eingeben.')

    if (!payload.date)
      mark('date', 'Bitte Datum wählen.')

    if (!payload.time)
      mark('time', 'Bitte Uhrzeit wählen.')

    if (!payload.vehicle)
      mark('vehicle', 'Bitte Fahrzeugklasse wählen.')

    return { valid: !firstInvalid, firstInvalid }
  }

  return {
    errors,
    validate,
    clearErrors,
  }
}
