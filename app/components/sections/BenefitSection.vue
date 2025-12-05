<script setup lang="ts">
import { Icon } from '#components'
import { useIntervalFn } from '@vueuse/core'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { benefits } from './BenefitSection.model'

const autoIndex = ref(0)
const userInteracting = ref(false)
let resumeTimer: ReturnType<typeof setTimeout> | null = null

const { pause, resume } = useIntervalFn(() => {
  if (userInteracting.value)
    return
  autoIndex.value = (autoIndex.value + 1) % benefits.length
}, 2400, { immediate: false })

function scheduleResume() {
  if (resumeTimer) {
    clearTimeout(resumeTimer)
  }
  resumeTimer = setTimeout(() => {
    userInteracting.value = false
    resume()
  }, 5000)
}
function markInteraction() {
  userInteracting.value = true
  pause()
  scheduleResume()
}

onMounted(() => {
  resumeTimer = setTimeout(() => resume(), 800)
})

onBeforeUnmount(() => {
  pause()
  if (resumeTimer)
    clearTimeout(resumeTimer)
})

const isAutoActive = (index: number) => !userInteracting.value && autoIndex.value === index
</script>

<template>
  <section class="py-24 antialiased">
    <div class="container mx-auto px-4 md:px-6">
      <h2 class="mb-10 text-center text-2xl color-pureWhite font-extralight tracking-normal font-serif md:mb-20 md:text-4xl">
        Ihr Weg. Unser <span class="italic">Service.</span>
      </h2>
      <div class="grid grid-cols-2 mx-auto max-w-7xl gap-4 lg:grid-cols-4 lg:gap-6">
      <div
        v-for="(benefit, i) in benefits"
        :key="i"
        class="benefit-card group [aspect-ratio:3/4] relative flex flex-col items-center overflow-hidden border border-pureWhite/10 rounded-3xl from-pureWhite/[0.06] to-transparent bg-gradient-to-br p-8 transition-all duration-700 lg:aspect-3/4 sm:aspect-unset lg:h-full lg:max-h-none sm:min-h-[320px] <sm:justify-center hover:border-pureWhite/25 hover:from-pureWhite/[0.14] lg:hover:-translate-y-8"
        :class="[isAutoActive(i) ? 'is-auto-active border-pureWhite/25 from-pureWhite/[0.14] lg:-translate-y-8' : '']"
        @pointerenter="markInteraction"
        @pointerdown="markInteraction"
        @focusin="markInteraction"
      >
        <div
          class="benefit-line absolute left-0 top-0 h-px w-full from-transparent via-pureWhite/30 to-transparent bg-gradient-to-r opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          :class="isAutoActive(i) ? 'opacity-100' : ''"
        />
        <Icon
          :name="benefit.icon"
          class="benefit-icon size-6 color-pureWhite/50 transition-all duration-500 md:size-8 group-hover:scale-110 group-hover:color-pureWhite/80"
          :class="isAutoActive(i) ? 'scale-110 color-pureWhite/80' : ''"
        />
        <div class="font-geist mt-4 md:mt-8 space-y-2">
          <h3
            class="mb-8 text-center text-base font-light lg:text-2xl md:text-lg group-hover:color-pureWhite"
            :class="isAutoActive(i) ? 'color-pureWhite' : 'color-gray-9'"
          >
            {{ benefit.title }}
          </h3>
          <p
            class="benefit-desc hidden translate-y-4 text-xs color-pureWhite/60 font-extralight leading-relaxed opacity-0 transition-all duration-500 delay-100 sm:block group-hover:translate-y-0 lg:text-xs sm:text-base xl:text-base group-hover:opacity-100"
            :class="isAutoActive(i) ? 'translate-y-0 opacity-100' : ''"
          >
            {{ benefit.description }}
          </p>
        </div>
        <NuxtLink
          to="/vorbestellung"
          class="benefit-cta absolute inset-x-2 bottom-6 flex translate-y-3 items-center justify-center gap-2 border border-pureWhite/20 rounded-full px-4 py-2 text-[11px] text-pureWhite/70 tracking-[0.25em] uppercase opacity-0 transition-all duration-500 md:inset-x-8 group-hover:translate-y-0 hover:border-pureWhite hover:color-pureWhite group-hover:opacity-100"
          :class="isAutoActive(i) ? 'translate-y-0 opacity-100 border-pureWhite/40' : ''"
        >
          Anfragen
          <Icon name="lucide:arrow-right" class="size-3" />
        </NuxtLink>
      </div>
    </div>
    </div>
  </section>
</template>
