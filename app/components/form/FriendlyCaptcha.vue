<script setup lang="ts">
import type { FRCWidgetCompleteEvent, FRCWidgetStateChangeEvent, WidgetState } from '@friendlycaptcha/sdk'
import { consola } from 'consola'
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
const sdk = ref<any>(null)
const widget = ref<any>(null)
const handleStateChange = ref<((event: FRCWidgetStateChangeEvent) => void) | null>(null)
const handleComplete = ref<((event: FRCWidgetCompleteEvent) => void) | null>(null)
const handleReset = ref<((_event: Event) => void) | null>(null)

const trackedStatesReady = new Set<WidgetState>([
  'activating',
  'activated',
  'requesting',
  'solving',
  'verifying',
  'completed',
])

// Singleton pattern: reuse SDK instance across component mounts
function getOrCreateSDK() {
  if (typeof window === 'undefined')
    return null

  const win = window as any
  if (win.__friendlyCaptchaSDK) {
    return win.__friendlyCaptchaSDK
  }

  return null
}

async function initSDK() {
  if (typeof window === 'undefined')
    return null

  const existingSDK = getOrCreateSDK()
  if (existingSDK) {
    return existingSDK
  }

  const mod = await import('@friendlycaptcha/sdk')
  const FriendlyCaptchaSDK = (mod as any).FriendlyCaptchaSDK || (mod as any).default
  const sdkInstance = new FriendlyCaptchaSDK()

  const win = window as any
  win.__friendlyCaptchaSDK = sdkInstance

  return sdkInstance
}

onMounted(async () => {
  if (typeof window === 'undefined')
    return

  try {
    sdk.value = await initSDK()
    if (!sdk.value) {
      consola.warn('[FriendlyCaptcha] SDK initialization failed')
      return
    }
    widget.value = sdk.value.createWidget({
      element: containerRef.value!,
      sitekey: props.siteKey,
      language: props.language ?? 'de',
      startMode: 'focus',
    })

    handleStateChange.value = (event: FRCWidgetStateChangeEvent) => {
      const state = event.detail.state
      emit('state', state)
      if (trackedStatesReady.has(state))
        emit('ready')
    }

    handleComplete.value = (event: FRCWidgetCompleteEvent) => {
      emit('completed', { response: event.detail.response })
    }

    handleReset.value = (_event: Event) => {
      emit('reset')
    }

    widget.value.addEventListener('frc:widget.statechange', handleStateChange.value)
    widget.value.addEventListener('frc:widget.complete', handleComplete.value)
    widget.value.addEventListener('frc:widget.reset', handleReset.value)
  }
  catch (error) {
    consola.error('[FriendlyCaptcha] load/init failed', error)
  }
})

onBeforeUnmount(() => {
  if (!widget.value)
    return

  try {
    if (handleStateChange.value)
      widget.value.removeEventListener('frc:widget.statechange', handleStateChange.value)
    if (handleComplete.value)
      widget.value.removeEventListener('frc:widget.complete', handleComplete.value)
    if (handleReset.value)
      widget.value.removeEventListener('frc:widget.reset', handleReset.value)
    widget.value?.destroy?.()
  }
  catch (error) {
    consola.warn('[FriendlyCaptcha] destroy failed', error)
  }
})

function reset() {
  try {
    widget.value?.reset?.()
  }
  catch (error) {
    consola.warn('[FriendlyCaptcha] reset failed', error)
  }
}

defineExpose({ reset })
</script>

<template>
  <div
    ref="containerRef"
    class="frc-captcha captcha-wrapper w-full"
  />
</template>

<style scoped>
.frc-captcha {
  border-radius: 0 !important;
  border: none !important;
  box-shadow: none !important;
}
</style>
