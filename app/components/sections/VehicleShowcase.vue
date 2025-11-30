<script setup lang="ts">
import { NuxtLink } from '#components'
import { computed, ref } from 'vue'
import type { VehicleCard } from './VehicleShowcase.model'
import { vehicles } from './VehicleShowcase.model'

const expanded = ref(0)
const activeVehicle = computed<VehicleCard>(() => vehicles[expanded.value] ?? vehicles[0])

function setExpanded(index: number) {
  expanded.value = index
}
</script>

<template>
  <section class="border-y border-border py-20 md:py-24">
    <div class="container mx-auto px-4 md:px-6">
      <p class="mb-4 text-center text-xs text-muted-foreground font-light tracking-[0.4em] uppercase">
        Unsere Fahrzeuge
      </p>
      <h2 class="mb-12 text-center text-3xl text-foreground font-medium font-serif md:text-4xl">
        Komfort trifft Raum
      </h2>

      <div class="flex flex-col gap-4 md:h-[70vh] md:flex-row">
        <div
          v-for="(car, index) in vehicles"
          :key="car.id"
          class="bg-black relative cursor-pointer overflow-hidden border border-border rounded-sm transition-[flex,opacity] duration-700"
          :class="expanded === index ? 'flex-[3]' : 'flex-1 opacity-70 hover:opacity-90'"
          @click="setExpanded(index)"
        >
          <img
            :src="car.image"
            :alt="car.name"
            class="h-full w-full object-cover transition-opacity duration-500"
            :class="expanded === index ? 'opacity-85' : 'opacity-30'"
          >
          <div
            class="absolute inset-0 transition-colors duration-500"
            :class="expanded === index
              ? 'bg-gradient-to-t from-black/85 via-black/70 to-black/30'
              : 'bg-gradient-to-t from-black/70 via-black/50 to-black/20'"
          />

          <div v-if="expanded !== index" class="absolute inset-0 flex items-end justify-center pb-10 -translate-y-1/2">
            <h3 class="vertical-rl rotate-90 whitespace-nowrap text-xl text-foreground/80 tracking-[0.3em] tracking-widest">
              {{ car.name }}
            </h3>
          </div>

          <div v-else class="absolute inset-0 flex items-end p-8 md:p-12">
            <NuxtLink
              :to="`/vorbestellung?vehicle=${car.id}`"
              class="absolute right-4 top-4 inline-flex items-center gap-2 rounded-sm border border-foreground bg-foreground px-4 py-2 text-[11px] uppercase tracking-widest text-background transition-all hover:bg-transparent hover:text-foreground"
            >
              Reservieren
              <Icon name="lucide:arrow-right" class="h-4 w-4" />
            </NuxtLink>
            <div class="max-w-xl space-y-4">
              <p class="text-[10px] text-muted-foreground tracking-[0.4em] uppercase">
                {{ car.type }}
              </p>
              <h3 class="text-3xl text-foreground font-light tracking-wide md:text-4xl">
                {{ car.name }}
              </h3>
              <p class="text-sm text-muted-foreground leading-relaxed">
                {{ car.description }}
              </p>
              <div class="flex flex-wrap gap-6 text-sm">
                <div v-for="spec in car.specs" :key="spec.label">
                  <p class="mb-1 text-[10px] text-muted-foreground tracking-[0.3em] uppercase">
                    {{ spec.label }}
                  </p>
                  <p class="text-foreground">
                    {{ spec.value }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-center gap-3">
        <button
          v-for="(car, index) in vehicles"
          :key="car.id"
          type="button"
          class="h-2 w-10 rounded-full bg-border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pureWhite"
          :class="expanded === index ? 'bg-foreground w-12' : 'bg-border/70 hover:bg-border'"
          @click="setExpanded(index)"
        >
          <span class="sr-only">{{ car.name }}</span>
        </button>
      </div>
    </div>
  </section>
</template>
