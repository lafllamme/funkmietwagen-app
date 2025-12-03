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
        class="group relative overflow-hidden rounded-3xl from-pureWhite/[0.03] to-transparent bg-gradient-to-br p-8 transition-all duration-700 hover:from-pureWhite/[0.08]"
        :class="i % 2 === 0 ? 'lg:translate-y-8' : ''"
        style="aspect-ratio: 3 / 4"
      >
        <div class="absolute left-0 top-0 h-px w-full from-transparent via-pureWhite/20 to-transparent bg-gradient-to-r opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <Icon
          :name="benefit.icon"
          class="h-8 w-8 color-pureWhite/30 transition-all duration-500 group-hover:scale-110 group-hover:color-pureWhite/70"
        />
        <div class="mt-auto pt-20">
          <h3 class="mb-2 text-lg color-pureWhite font-light">
            {{ benefit.title }}
          </h3>
          <p class="translate-y-4 text-xs color-pureWhite/30 font-light leading-relaxed opacity-0 transition-all duration-500 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
            {{ benefit.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
