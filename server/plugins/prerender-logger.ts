export default defineNitroPlugin((nitro) => {
  // Log every prerender start to correlate with failures
  nitro.hooks.hook('prerender:render-route', ({ route }) => {
    nitro.logger.info(`[prerender:start] ${route}`)
    // Ensure output even if logger level is filtered
    console.log(`[prerender:start] ${route}`)
  })

  // Log detailed errors (route + stack) so Netlify shows the root cause
  nitro.hooks.hook('prerender:route', ({ route, error }) => {
    if (!error)
      return
    const payload = error?.stack || error?.message || error
    nitro.logger.error(
      `[prerender:error] ${route}`,
      payload,
    )
    console.error(`[prerender:error] ${route}`, payload)
  })
})
