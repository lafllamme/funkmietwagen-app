<script setup lang="ts">
import { Icon } from '#components'
import { benefits } from './BenefitSection.model'
</script>

<template>
  <section class="px-4 py-24 md:px-6">
    <h2 class="mb-20 text-center text-xs color-pureWhite/40 tracking-[0.4em]">
      WARUM FUNKMIETWAGEN ADE
    </h2>
    <div class="grid grid-cols-2 mx-auto max-w-5xl gap-4 lg:grid-cols-4">
      <div
        v-for="(benefit, i) in benefits"
        :key="i"
        class="group border-white/10 hover:border-white/25 relative h-full flex flex-col overflow-hidden border rounded-3xl from-pureWhite/[0.06] to-transparent bg-gradient-to-br p-8 transition-all duration-700 hover:from-pureWhite/[0.14]"
        :class="i % 2 === 0 ? 'lg:translate-y-8' : ''"
        style="aspect-ratio: 3 / 4"
      >
        <div class="absolute left-0 top-0 h-px w-full from-transparent via-pureWhite/30 to-transparent bg-gradient-to-r opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <Icon
          :name="benefit.icon"
          class="h-8 w-8 color-pureWhite/50 transition-all duration-500 group-hover:scale-110 group-hover:color-pureWhite/80"
        />
        <div class="mt-4 md:mt-8 space-y-2">
          <h3 class="text-lg color-pureWhite font-light">
            {{ benefit.title }}
          </h3>
          <p class="translate-y-4 text-xs color-pureWhite/60 font-light leading-relaxed opacity-0 transition-all duration-500 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
            {{ benefit.description }}
          </p>
        </div>
        <NuxtLink
          to="/vorbestellung"
          class="border-white/20 text-white/70 hover:border-white hover:text-white absolute inset-x-8 bottom-6 flex translate-y-3 items-center justify-center gap-2 border rounded-full px-4 py-2 text-[11px] tracking-[0.25em] uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Anfragen
          <Icon name="lucide:arrow-right" class="h-3 w-3" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
