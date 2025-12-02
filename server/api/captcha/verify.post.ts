import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ response?: string, sitekey?: string }>(event)
  const response = body?.response || ''
  const sitekey = body?.sitekey || ''
  const config = useRuntimeConfig(event)
  const apiUrl = config.friendly?.API_URL || 'https://global.frcapi.com/api/v2/captcha/siteverify'
  const apiKey = config.friendly?.API_KEY || ''

  if (!response)
    return { success: false, error: { message: 'captcha_missing' } }
  if (!apiKey)
    return { success: false, error: { message: 'captcha_api_key_missing' } }

  try {
    console.info('[Captcha] verify:start', { hasResponse: !!response, sitekey })
    const verifyRes = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({ response, sitekey }),
    })

    const data = await verifyRes.json() as { success?: boolean, error?: unknown }
    console.info('[Captcha] verify:response', { status: verifyRes.status, ok: verifyRes.ok, bodySuccess: data?.success })
    if (verifyRes.ok && data?.success)
      return { success: true }

    return { success: false, error: data?.error || { message: 'captcha_invalid' } }
  }
  catch (error) {
    console.error('[Captcha] verification failed', error)
    return { success: false, error: { message: 'captcha_error' } }
  }
})
