import { consola } from 'consola'
import { getHeader, getRequestIP } from 'h3'
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
  vehicle?: string
  bookingType?: string
  hours?: string
  notes?: string
}

const requiredFields: Array<keyof ContactPayload> = ['name', 'phone', 'email', 'pickup', 'date', 'time', 'passengers', 'vehicle', 'bookingType']
const FRIENDLY_DEFAULT_URL = 'https://global.frcapi.com/api/v2/captcha/siteverify'

function validatePayload(body: ContactPayload) {
  const urlLike = /https?:\/\/|www\./i
  const domainLike = /\b[a-z0-9.-]+\.(?:com|net|org|info|biz|ru|xyz|top|shop|online|site|club|vip|link)\b/i
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
  const phoneRegex = /^[+()\d\s-]{6,}$/u
  const bookingTypes = new Set(['route', 'hourly'])

  if (body.name && (urlLike.test(body.name) || domainLike.test(body.name) || body.name.length > 120))
    throw createError({ statusCode: 400, statusMessage: 'Ungültiger Name' })
  if (body.email && !emailRegex.test(body.email))
    throw createError({ statusCode: 400, statusMessage: 'Ungültige E-Mail' })
  if (body.phone && !phoneRegex.test(body.phone))
    throw createError({ statusCode: 400, statusMessage: 'Ungültige Telefonnummer' })
  if (body.pickup && (body.pickup.length > 400 || domainLike.test(body.pickup)))
    throw createError({ statusCode: 400, statusMessage: 'Abholadresse ist ungültig' })
  if (body.notes && (body.notes.length > 1000 || domainLike.test(body.notes)))
    throw createError({ statusCode: 400, statusMessage: 'Anmerkungen sind ungültig' })
  if (body.bookingType && !bookingTypes.has(body.bookingType))
    throw createError({ statusCode: 400, statusMessage: 'Ungültiger Buchungstyp' })
  if (body.destination && (body.destination.length > 400 || domainLike.test(body.destination)))
    throw createError({ statusCode: 400, statusMessage: 'Ziel ist ungültig' })
}

function buildAkismetPayload(event: H3Event, data: ContactPayload, blogUrl: string) {
  const userIp = getRequestIP(event) || getHeader(event, 'x-forwarded-for') || ''
  const userAgent = getHeader(event, 'user-agent') || 'Unknown-UA'
  const referrer = getHeader(event, 'referer') || ''
  const permalink = `${blogUrl.replace(/\/$/, '')}/vorbestellung`

  const contentLines = [
    `Pickup: ${data.pickup || '-'}`,
    `Destination: ${data.destinationLabel || data.destination || data.destinationCode || '-'}`,
    `Notes: ${data.notes || '-'}`,
    `Phone: ${data.phone || '-'}`,
    `Email: ${data.email || '-'}`,
  ]

  const commentContext = [
    'booking',
    'chauffeur',
    'transport',
    data.bookingType || '',
  ].filter(Boolean)

  const formData = new URLSearchParams({
    blog: blogUrl,
    user_ip: userIp,
    user_agent: userAgent,
    referrer,
    permalink,
    comment_type: 'contact-form',
    comment_author: data.name || '',
    comment_author_email: data.email || '',
    comment_author_url: '',
    comment_content: contentLines.join('\n'),
    blog_lang: 'de',
    blog_charset: 'UTF-8',
  })

  for (const tag of commentContext)
    formData.append('comment_context[]', tag)

  return formData
}

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
      ${row('Buchungstyp', data.bookingType === 'hourly' ? 'Stunden' : 'Strecke')}
      ${row('Ziel', data.bookingType === 'hourly' ? '—' : data.destination)}
      ${row('Stunden', data.bookingType === 'hourly' ? data.hours : '—')}
      ${row('Datum', formatDateGerman(data.date))}
      ${row('Uhrzeit', data.time)}
      ${row('Passagiere', data.passengers)}
      ${row('Fahrzeugklasse', data.vehicle)}
      ${row('Anmerkungen', data.notes)}
    </table>
  </div>
`
}

async function checkAkismet(event: H3Event, data: ContactPayload, blogUrl: string, apiKey: string) {
  const payload = buildAkismetPayload(event, data, blogUrl)
  const endpoint = `https://${apiKey}.rest.akismet.com/1.1/comment-check`
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'FunkmietwagenADE/1.0 | Akismet/1.1',
    },
    body: payload.toString(),
  })

  if (!res.ok)
    throw createError({ statusCode: 500, statusMessage: 'Spam-Prüfung fehlgeschlagen' })

  const text = (await res.text()).trim()
  consola.info('[Akismet] response', { text })
  return text === 'true'
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { EMAIL_FROM, EMAIL_TO, API_KEY } = config.resend
  const friendlyApiUrl = config.friendly?.API_URL || FRIENDLY_DEFAULT_URL
  const friendlyApiKey = config.friendly?.API_KEY || ''
  const akismetKey = config.akismet?.API_KEY || ''
  const akismetBlog = config.akismet?.BLOG_URL || ''

  if (!EMAIL_FROM || !EMAIL_TO || !API_KEY)
    throw createError({ statusCode: 500, statusMessage: 'Resend config missing' })

  const body = (await readBody<ContactPayload>(event)) || {}
  consola.info('[Resend] Incoming payload', body)

  const captchaResponse = (body as any)['frc-captcha-response'] as string | undefined
  if (!captchaResponse)
    throw createError({ statusCode: 400, statusMessage: 'Captcha missing' })

  if (!friendlyApiKey) {
    consola.warn('[Captcha] Missing API key; skipping verification')
  }
  else {
    consola.info('[Captcha] verify:start', { hasResponse: !!captchaResponse })
    const verifyRes = await fetch(friendlyApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': friendlyApiKey,
      },
      body: JSON.stringify({ response: captchaResponse }),
    })
    const verifyJson = await verifyRes.json() as { success?: boolean, error?: unknown }
    consola.info('[Captcha] verify:response', { status: verifyRes.status, ok: verifyRes.ok, success: verifyJson?.success })
    if (!verifyRes.ok || !verifyJson?.success)
      throw createError({ statusCode: 400, statusMessage: 'Invalid captcha' })
  }

  for (const field of requiredFields) {
    if (!body[field])
      throw createError({ statusCode: 400, statusMessage: `Missing field: ${field}` })
  }

  if (body.bookingType === 'route' && !body.destination)
    throw createError({ statusCode: 400, statusMessage: 'Missing field: destination' })
  if (body.bookingType === 'hourly' && !body.hours)
    throw createError({ statusCode: 400, statusMessage: 'Missing field: hours' })

  validatePayload(body)

  const formattedDate = formatDateGerman(body.date)
  const destination = body.destinationLabel || body.destination || body.destinationCode

  const payload = buildAkismetPayload(event, { ...body, destination }, akismetBlog)
  const isSpam = await checkAkismet(event, { ...body, destination }, akismetBlog, akismetKey).catch((error) => {
    consola.error('[Akismet] Failed', error)
    throw createError({ statusCode: 500, statusMessage: 'Spam-Prüfung fehlgeschlagen' })
  })
  if (isSpam)
    throw createError({ statusCode: 400, statusMessage: 'Ihre Anfrage wurde als Spam erkannt.' })
  // If Akismet missed obvious spam terms, submit for training and block
  const spamSignals = [body.pickup, destination, body.notes, body.phone, body.email]
    .filter(Boolean)
    .join(' ')
  if (/hurensohn|sex|casino|viagra|crypto|loan|free|spam|buy/i.test(spamSignals)) {
    submitAkismetSpam(payload, akismetKey).catch(err => consola.error('[Akismet] submit-spam failed', err))
    throw createError({ statusCode: 400, statusMessage: 'Ihre Anfrage wurde als Spam erkannt.' })
  }

  const html = buildEmailHtml({
    ...body,
    destination,
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
async function submitAkismetSpam(payload: URLSearchParams, apiKey: string) {
  const endpoint = `https://${apiKey}.rest.akismet.com/1.1/submit-spam`
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'FunkmietwagenADE/1.0 | Akismet/1.1',
    },
    body: payload.toString(),
  })
  const text = (await res.text()).trim()
  consola.warn('[Akismet] submit-spam response', { text, status: res.status })
}
