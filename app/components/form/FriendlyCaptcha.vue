<script setup lang="ts">
import type { FRCWidgetCompleteEvent, FRCWidgetResetEvent, FRCWidgetStateChangeEvent, WidgetState } from '@friendlycaptcha/sdk'

import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{
  siteKey: string
  language?: string
}>()

const emit = defineEmits<{
  (e: 'ready'): void
  (e: 'completed', payload: { response: string }): void
  (e: 'reset'): void
  (e: 'state', state: WidgetState): void
}>()

const containerRef = ref<HTMLElement | null>(null)
let sdk: any = null
let widget: any = null

const trackedStatesReady = new Set<WidgetState>([
  'activating',
  'activated',
  'requesting',
  'solving',
  'verifying',
  'completed',
])

onMounted(async () => {
  if (typeof window === 'undefined')
    return

  try {
    const mod = await import('@friendlycaptcha/sdk')
    const FriendlyCaptchaSDK = (mod as any).FriendlyCaptchaSDK || (mod as any).default
    sdk = new FriendlyCaptchaSDK()
    widget = sdk.createWidget({
      element: containerRef.value!,
      sitekey: props.siteKey,
      language: props.language ?? 'de',
      startMode: 'focus',
    })

    const handleStateChange = (event: FRCWidgetStateChangeEvent) => {
      const state = event.detail.state
      emit('state', state)
      if (trackedStatesReady.has(state))
        emit('ready')
    }

    const handleComplete = (event: FRCWidgetCompleteEvent) => {
      emit('completed', { response: event.detail.response })
    }

    const handleReset = (_event: FRCWidgetResetEvent) => {
      emit('reset')
    }

    widget.addEventListener('frc:widget.statechange', handleStateChange)
    widget.addEventListener('frc:widget.complete', handleComplete)
    widget.addEventListener('frc:widget.reset', handleReset)

    onBeforeUnmount(() => {
      try {
        widget.removeEventListener('frc:widget.statechange', handleStateChange)
        widget.removeEventListener('frc:widget.complete', handleComplete)
        widget.removeEventListener('frc:widget.reset', handleReset)
        widget?.destroy?.()
      }
      catch (error) {
        console.warn('[FriendlyCaptcha] destroy failed', error)
      }
    })
  }
  catch (error) {
    console.error('[FriendlyCaptcha] load/init failed', error)
  }
})

function reset() {
  try {
    widget?.reset?.()
  }
  catch (error) {
    console.warn('[FriendlyCaptcha] reset failed', error)
  }
}

defineExpose({ reset })
</script>

<template>
  <div ref="containerRef" class="frc-captcha w-full" />
</template>
