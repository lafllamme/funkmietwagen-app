<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{
  siteKey: string
  language?: string
}>()

const containerRef = ref<HTMLElement | null>(null)
let sdk: any = null
let widget: any = null

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
  }
  catch (error) {
    console.error('[FriendlyCaptcha] load/init failed', error)
  }
})

onBeforeUnmount(() => {
  try {
    widget?.destroy?.()
  }
  catch (error) {
    console.warn('[FriendlyCaptcha] destroy failed', error)
  }
})
</script>

<template>
  <div ref="containerRef" class="frc-captcha w-full" />
</template>
