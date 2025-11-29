import { consola } from 'consola'
import { Resend } from 'resend'

interface ContactPayload {
  name?: string
  phone?: string
  email?: string
  pickup?: string
  destination?: string
  date?: string
  time?: string
  passengers?: string
  notes?: string
}

const requiredFields: Array<keyof ContactPayload> = ['name', 'phone', 'email', 'pickup', 'destination', 'date', 'time', 'passengers']

const row = (label: string, value?: string) => `
  <tr>
    <td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;">${label}</td>
    <td style="padding:8px 12px;border:1px solid #e5e7eb;">${value ? String(value) : '-'}</td>
  </tr>
`

const buildEmailHtml = (data: ContactPayload) => `
  <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #111827;">
    <h2 style="margin-bottom:12px;">Neue Fahrtanfrage</h2>
    <p style="margin:0 0 12px;">Es ist eine neue Anfrage eingegangen. Details siehe Tabelle:</p>
    <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
      ${row('Name', data.name)}
      ${row('Telefon', data.phone)}
      ${row('E-Mail', data.email)}
      ${row('Abholadresse', data.pickup)}
      ${row('Ziel', data.destination)}
      ${row('Datum', data.date)}
      ${row('Uhrzeit', data.time)}
      ${row('Passagiere', data.passengers)}
      ${row('Anmerkungen', data.notes)}
    </table>
  </div>
`

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

  const html = buildEmailHtml(body)
  const subject = `Neue Vorbestellung ${body.date ?? ''} ${body.time ?? ''}`.trim()
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
