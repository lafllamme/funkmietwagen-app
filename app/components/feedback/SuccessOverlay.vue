<script setup lang="ts">
import type { SuccessOverlayProps } from './SuccessOverlay.model'
import { Icon } from '#components'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { successOverlayDefaults } from './SuccessOverlay.model'

const props = withDefaults(defineProps<SuccessOverlayProps>(), successOverlayDefaults)

const stage = ref(0)
let timers: ReturnType<typeof setTimeout>[] = []

onMounted(() => {
  timers = [
    setTimeout(() => stage.value = 1, 300),
    setTimeout(() => stage.value = 2, 800),
    setTimeout(() => stage.value = 3, 1400),
    setTimeout(() => stage.value = 4, 2000),
  ]
})

onBeforeUnmount(() => {
  timers.forEach(clearTimeout)
  timers = []
})
</script>

<template>
  <div class="success-overlay min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
    <div
      class="mb-12 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
      :class="stage >= 1 ? 'opacity-100' : 'opacity-0'"
    >
      <svg width="96" height="96" viewBox="0 0 80 80" class="text-foreground">
        <circle
          cx="40"
          cy="40"
          r="38"
          fill="none"
          stroke="currentColor"
          stroke-width="0.6"
          class="text-foreground/30"
          :style="{
            strokeDasharray: 240,
            strokeDashoffset: stage >= 1 ? 0 : 240,
            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }"
        />
        <path
          d="M26 40 L35 49 L54 30"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-foreground"
          :style="{
            strokeDasharray: 50,
            strokeDashoffset: stage >= 1 ? 0 : 50,
            transition: 'stroke-dashoffset 0.8s ease-out 0.8s',
          }"
        />
      </svg>
    </div>

    <p
      class="mb-3 text-xs text-muted-foreground tracking-[0.4em] uppercase transition-all duration-1000"
      :class="stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'"
    >
      {{ props.label }}
    </p>

    <h1
      class="mb-6 text-4xl tracking-wide font-serif transition-all duration-1000 md:text-5xl"
      :class="stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'"
      style="transition-delay: 100ms"
    >
      {{ props.title }}
    </h1>

    <div
      class="mb-6 h-px w-16 bg-foreground/20 transition-all duration-1000"
      :class="stage >= 3 ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'"
    />

    <p
      class="mb-12 max-w-md text-muted-foreground leading-relaxed tracking-wide transition-all duration-1000"
      :class="stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'"
      style="transition-delay: 150ms"
    >
      {{ props.description }}
    </p>

    <NuxtLink
      :to="props.ctaTo"
      class="group inline-flex items-center gap-3 border-b-2 border-pureWhite border-solid pb-2 text-sm text-foreground font-light tracking-widest uppercase transition-all duration-300 hover:gap-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pureWhite focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      :class="stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'"
    >
      <span>{{ props.ctaLabel }}</span>
      <Icon name="lucide:arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </NuxtLink>
  </div>
</template>
