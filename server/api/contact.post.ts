import { consola } from 'consola'
import { Resend } from 'resend'

interface ContactPayload {
  name?: string
  phone?: string
  email?: string
  pickup?: string
  destination?: string
  destinationCode?: string
  destinationLabel?: string
  date?: string
  time?: string
  passengers?: string
  notes?: string
}

const requiredFields: Array<keyof ContactPayload> = ['name', 'phone', 'email', 'pickup', 'destination', 'date', 'time', 'passengers']

function row(label: string, value?: string) {
  return `
  <tr>
    <td style="padding:10px 14px;border:1px solid #2b2b2b;background:#111;font-weight:600;color:#f5f5f5;">${label}</td>
    <td style="padding:10px 14px;border:1px solid #2b2b2b;color:#e5e5e5;">${value ? String(value) : '-'}</td>
  </tr>
`
}

function formatDateGerman(value?: string) {
  if (!value)
    return value
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match)
    return value
  const [, y, m, d] = match
  return `${d}.${m}.${y}`
}

function buildEmailHtml(data: ContactPayload) {
  return `
  <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #f5f5f5; background:#0b0b0b; padding:16px;">
    <h2 style="margin:0 0 12px;font-weight:600;color:#ffffff;">Neue Fahrtanfrage</h2>
    <p style="margin:0 0 16px;color:#d0d0d0;">Es ist eine neue Anfrage eingegangen. Details siehe Tabelle:</p>
    <table style="border-collapse: collapse; width: 100%; max-width: 720px; background:#0f0f0f; border:1px solid #2b2b2b;">
      ${row('Name', data.name)}
      ${row('Telefon', data.phone)}
      ${row('E-Mail', data.email)}
      ${row('Abholadresse', data.pickup)}
      ${row('Ziel', data.destination)}
      ${row('Datum', formatDateGerman(data.date))}
      ${row('Uhrzeit', data.time)}
      ${row('Passagiere', data.passengers)}
      ${row('Anmerkungen', data.notes)}
    </table>
  </div>
`
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { EMAIL_FROM, EMAIL_TO, API_KEY } = config.resend

  if (!EMAIL_FROM || !EMAIL_TO || !API_KEY)
    throw createError({ statusCode: 500, statusMessage: 'Resend config missing' })

  const body = (await readBody<ContactPayload>(event)) || {}
  consola.info('[Resend] Incoming payload', body)

  for (const field of requiredFields) {
    if (!body[field])
      throw createError({ statusCode: 400, statusMessage: `Missing field: ${field}` })
  }

  const formattedDate = formatDateGerman(body.date)
  const html = buildEmailHtml({
    ...body,
    destination: body.destinationLabel || body.destination || body.destinationCode,
  })
  const subject = `FUNKMIETWAGEN // BESTELLUNG // ${formattedDate || body.date || ''}${body.time ? ` // ${body.time}` : ''}`.trim()
  consola.info('[Resend] Sending email', { to: EMAIL_TO, subject })

  try {
    const resend = new Resend(API_KEY)
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: [EMAIL_TO],
      replyTo: body.email,
      subject,
      html,
    })

    if (error) {
      consola.error('[Resend] Error:', error)
      throw createError({ statusCode: 500, statusMessage: 'Mail could not be sent' })
    }

    consola.info('[Resend] Email sent!')
    return { success: true }
  }
  catch (err) {
    consola.error(err)
    throw createError({ statusCode: 500, statusMessage: 'Server Error' })
  }
})
