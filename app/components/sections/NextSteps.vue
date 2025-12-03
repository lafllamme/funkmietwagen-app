<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { steps } from './NextSteps.model'

const progress = ref(0)

function updateProgress() {
  if (typeof window === 'undefined')
    return
  const doc = document.documentElement
  const scrollable = doc.scrollHeight - window.innerHeight
  const raw = scrollable > 0 ? window.scrollY / scrollable : 0
  progress.value = Math.min(1, Math.max(0, raw))
}

onMounted(() => {
  updateProgress()
  useEventListener(window, 'scroll', updateProgress, { passive: true })
  useEventListener(window, 'resize', updateProgress)
})

const activeCount = computed(() => {
  // Reveal steps progressively while scrolling down the page
  const total = steps.length
  const revealed = Math.floor(progress.value * total) + 1
  return Math.min(total, Math.max(1, revealed))
})

const isActive = (index: number) => index < activeCount.value
</script>

<template>
  <div class="bg-black border border-pureWhite border-solid p-8">
    <span class="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
      So funktioniert's
    </span>

    <h3 class="mt-4 text-lg text-foreground font-light font-serif">
      In 4 Schritten zum Ziel
    </h3>

    <div class="relative mt-8">
      <div class="absolute bottom-8 left-4 top-8 w-px bg-border" />

      <div class="space-y-8">
        <div
          v-for="(step, index) in steps"
          :key="step.step"
          class="relative flex items-start gap-5"
        >
          <div
            class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs transition-colors bg-foreground text-background"
            :class="isActive(index) ? 'md:bg-foreground md:text-background' : 'md:bg-border md:text-muted-foreground'"
          >
            {{ step.step }}
          </div>
          <div class="flex-1 pt-1">
            <h4
              class="text-sm transition-colors text-foreground"
              :class="isActive(index) ? 'md:text-foreground' : 'md:text-muted-foreground'"
            >
              {{ step.title }}
            </h4>
            <p class="mt-0.5 text-[11px] text-muted-foreground">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 border-t border-gray-12 border-solid pt-6">
      <div class="flex items-center justify-between text-[11px]">
        <span class="text-muted-foreground">Durchschnittliche Antwortzeit</span>
        <span class="text-foreground">2 Std.</span>
      </div>
    </div>
  </div>
</template>
