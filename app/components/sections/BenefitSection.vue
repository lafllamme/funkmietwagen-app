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
        class="group relative h-full flex flex-col overflow-hidden border border-pureWhite/10 rounded-3xl from-pureWhite/[0.06] to-transparent bg-gradient-to-br p-8 transition-all duration-700 hover:border-pureWhite/25 hover:from-pureWhite/[0.14]"
        :class="i % 2 === 0 ? 'lg:translate-y-8' : ''"
        style="aspect-ratio: 3 / 4"
      >
        <div class="absolute left-0 top-0 h-px w-full from-transparent via-pureWhite/30 to-transparent bg-gradient-to-r opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <Icon
          :name="benefit.icon"
          class="size-6 color-pureWhite/50 transition-all duration-500 md:size-8 group-hover:scale-110 group-hover:color-pureWhite/80"
        />
        <div class="mt-4 md:mt-8 space-y-2">
          <h3 class="text-base color-pureWhite font-light md:text-lg">
            {{ benefit.title }}
          </h3>
          <p class="hidden translate-y-4 text-xs color-pureWhite/60 font-light leading-relaxed opacity-0 transition-all duration-500 delay-100 md:block group-hover:translate-y-0 group-hover:opacity-100">
            {{ benefit.description }}
          </p>
        </div>
        <NuxtLink
          to="/vorbestellung"
          class="absolute inset-x-2 bottom-6 flex translate-y-3 items-center justify-center gap-2 border border-pureWhite/20 rounded-full px-4 py-2 text-[11px] text-pureWhite/70 tracking-[0.25em] uppercase opacity-0 transition-all duration-500 md:inset-x-8 group-hover:translate-y-0 hover:border-pureWhite hover:color-pureWhite group-hover:opacity-100"
        >
          Anfragen
          <Icon name="lucide:arrow-right" class="size-3" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
