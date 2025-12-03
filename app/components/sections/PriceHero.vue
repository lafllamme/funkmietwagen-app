<script setup lang="ts">
import { NuxtLink } from '#components'
import { useElementVisibility } from '@vueuse/core'
import { Motion } from 'motion-v'
import { computed, onMounted, ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = useElementVisibility(sectionRef, { threshold: 0.25 })
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const heroVisible = computed(() => mounted.value && isVisible.value)
const cardInitial = { opacity: 0, y: 30 }
const cardVisible = { opacity: 1, y: 0 }

const airports = [
  { city: 'Köln/Bonn', price: 45 },
  { city: 'Düsseldorf', price: 85 },
  { city: 'Frankfurt', price: 149 },
]
</script>

<template>
  <section
    ref="sectionRef"
    class="bg-black border-y border-border transition-opacity duration-500"
    :class="heroVisible ? 'opacity-100' : 'opacity-0'"
  >
    <Motion
      tag="div"
      class="container mx-auto max-w-7xl px-4 py-20 md:py-28"
      :initial="{ opacity: 0 }"
      :animate="heroVisible ? { opacity: 1 } : { opacity: 0 }"
      :transition="{ duration: 0.8 }"
    >
      <div class="grid items-start gap-16 md:grid-cols-12">
        <Motion
          tag="div"
          class="md:col-span-4"
          :initial="{ opacity: 0, x: -30 }"
          :animate="heroVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }"
          :transition="{ delay: 0.15, duration: 0.8 }"
        >
          <div class="font-geist md:sticky md:top-40">
            <div class="mb-8 text-[10px] color-gray-10 tracking-[0.5em] uppercase">
              Preisgestaltung
            </div>
            <h2 class="mb-8 text-5xl color-pureWhite font-extralight leading-[0.9] tracking-tight md:text-7xl">
              Faire
              <br>
              Kondi-
              <br>
              <span class="color-pureWhite/30">tionen</span>
            </h2>
            <p class="mb-10 max-w-xs text-sm color-pureWhite/40 font-normal leading-relaxed tracking-tight">
              Transparente Preise ohne versteckte Kosten. Qualität, auf die Sie sich verlassen können.
            </p>
            <Motion
              tag="div"
              class="inline-flex"
              :while-hover="{ x: 4 }"
            >
              <NuxtLink
                to="/vorbestellung"
                class="group inline-flex items-center gap-2 text-xs color-pureWhite/60 tracking-widest uppercase transition-colors hover:color-pureWhite"
              >
                Verfügbarkeit prüfen
                <Icon name="lucide:arrow-up-right" class="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </NuxtLink>
            </Motion>
          </div>
        </Motion>

        <div class="font-geist md:col-span-8 space-y-6">
          <Motion
            tag="div"
            class="border border-gray-12 border-solid p-12 transition-colors duration-500 hover:border-gray-10"
            :initial="cardInitial"
            :animate="heroVisible ? cardVisible : cardInitial"
            :transition="{ delay: 0.25, duration: 0.8 }"
          >
            <div class="mb-10 flex items-start justify-between">
              <h3 class="text-3xl color-pureWhite font-extralight tracking-tight">
                Flughafentransfers
              </h3>
              <span class="text-xs color-pureWhite/20 tracking-widest uppercase">
                01
              </span>
            </div>
            <div class="space-y-0">
              <Motion
                v-for="(item, i) in airports"
                :key="item.city"
                tag="div"
                class="group flex items-baseline justify-between border-b border-pureWhite/5 border-solid py-5 last:border-0"
                :initial="{ opacity: 0 }"
                :animate="heroVisible ? { opacity: 1 } : { opacity: 0 }"
                :transition="{ delay: 0.35 + i * 0.1 }"
              >
                <span class="text-sm color-pureWhite/50 tracking-normal transition-colors group-hover:color-pureWhite/70">
                  {{ item.city }}
                </span>
                <div class="flex items-baseline gap-2">
                  <span class="text-xs color-pureWhite/30">ab</span>
                  <span class="text-2xl color-pureWhite font-light tabular-nums">{{ item.price }}</span>
                  <span class="text-sm color-pureWhite/20">€</span>
                </div>
              </Motion>
            </div>
          </Motion>

          <Motion
            tag="div"
            class="border border-gray-12 border-solid bg-pureWhite/[0.02] p-12 transition-colors duration-500 hover:border-gray-10"
            :initial="cardInitial"
            :animate="heroVisible ? cardVisible : cardInitial"
            :transition="{ delay: 0.4, duration: 0.8 }"
          >
            <div class="mb-8 flex items-start justify-between">
              <h3 class="text-3xl color-pureWhite font-extralight tracking-tight">
                Stundenfahrt
              </h3>
              <span class="text-xs color-pureWhite/20 tracking-widest uppercase">
                02
              </span>
            </div>
            <div class="mb-3 flex items-end gap-3">
              <span class="text-6xl color-pureWhite font-extralight tracking-tighter">55</span>
              <span class="pb-2 text-lg color-pureWhite/40">€ / Stunde</span>
            </div>
            <p class="text-xs color-pureWhite/30 tracking-wide">
              Mindestens 2 Stunden · Ideal für Geschäftstermine
            </p>
          </Motion>

          <Motion
            tag="p"
            class="pt-4 text-right text-xs color-pureWhite/20"
            :initial="{ opacity: 0 }"
            :animate="heroVisible ? { opacity: 1 } : { opacity: 0 }"
            :transition="{ delay: 0.55, duration: 0.8 }"
          >
            Alle Preise sind Richtwerte. Individuelles Angebot auf Anfrage.
          </Motion>
        </div>
      </div>
    </Motion>
  </section>
</template>
