export default defineNitroPlugin((nitro) => {
  // Log every prerender start to correlate with failures
  nitro.hooks.hook('prerender:render-route', ({ route }) => {
    nitro.logger.info(`[prerender:start] ${route}`)
  })

  // Log detailed errors (route + stack) so Netlify shows the root cause
  nitro.hooks.hook('prerender:route', ({ route, error }) => {
    if (!error)
      return
    nitro.logger.error(
      `[prerender:error] ${route}`,
      error?.stack || error?.message || error,
    )
  })
})
