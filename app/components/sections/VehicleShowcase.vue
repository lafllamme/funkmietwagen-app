<script setup lang="ts">
import type { VehicleCard } from './VehicleShowcase.model'
import { NuxtLink } from '#components'
import { computed, ref } from 'vue'
import { vehicles } from './VehicleShowcase.model'

const expanded = ref<string>(vehicles[0]?.id ?? '')
const activeVehicle = computed<VehicleCard>(() => {
  return vehicles.find(v => v.id === expanded.value) ?? vehicles[0]!
})

const isActive = (vehicle: VehicleCard) => vehicle.id === activeVehicle.value.id

function setExpanded(vehicleId: string) {
  expanded.value = vehicleId
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

      <div class="flex flex-col gap-3 md:h-[70vh] md:flex-row md:gap-4">
        <div
          v-for="car in vehicles"
          :key="car.id"
          class="bg-black relative cursor-pointer overflow-hidden border border-border rounded-sm transition-[flex,opacity,height] duration-500"
          :class="isActive(car)
            ? 'h-[420px] md:h-auto md:flex-[3]'
            : 'h-[260px] md:h-auto md:flex-1 opacity-90 md:opacity-70 md:hover:opacity-90'"
          @click="setExpanded(car.id)"
        >
          <img
            :src="car.image"
            :alt="car.name"
            class="h-full w-full object-cover transition-opacity duration-500"
            :class="isActive(car) ? 'opacity-85' : 'opacity-40 md:opacity-30'"
          >
          <div
            class="absolute inset-0 transition-colors duration-500"
            :class="isActive(car)
              ? 'bg-gradient-to-t from-black/85 via-black/70 to-black/30'
              : 'bg-gradient-to-t from-black/75 via-black/55 to-black/20'"
          />

          <div
            v-if="!isActive(car)"
            class="absolute inset-0 flex items-end justify-center pb-6 md:pb-10 md:-translate-y-1/2"
          >
            <h3
              class="md:vertical-rl animate-fade-in text-center text-sm text-foreground/80 tracking-[0.2em] uppercase md:rotate-90 md:whitespace-nowrap md:text-2xl md:tracking-[0.3em]"
            >
              {{ car.name }}
            </h3>
          </div>

          <div v-else class="absolute inset-0 flex items-end p-6 md:p-12">
            <NuxtLink
              :to="`/vorbestellung?vehicle=${car.id}`"
              class="absolute right-3 top-3 inline-flex items-center gap-2 border border-foreground rounded-sm bg-foreground px-3 py-2 text-[11px] text-background tracking-widest uppercase transition-all delay-50 md:right-4 md:top-4 hover:bg-transparent md:px-4 hover:text-foreground hover:backdrop-blur-sm"
            >
              Reservieren
              <Icon name="lucide:arrow-right" class="h-4 w-4" />
            </NuxtLink>
            <div class="animate-slide-in-bottom max-w-xl rounded-sm bg-pureBlack/60 backdrop-blur-sm">
              <div class="p-2 space-y-2">
                <p class="text-[10px] text-muted-foreground tracking-[0.4em] uppercase">
                  {{ car.type }}
                </p>
                <h3 class="text-2xl color-pureWhite font-light tracking-wide md:text-4xl">
                  {{ car.name }}
                </h3>
                <p class="text-sm color-sand-8 font-light leading-relaxed tracking-normal md:max-w-xl">
                  {{ car.description }}
                </p>
                <div class="flex flex-wrap gap-4 text-sm md:gap-6">
                  <div v-for="spec in car.specs" :key="spec.label">
                    <p class="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">
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
      </div>

      <div class="mt-6 flex justify-center gap-3">
        <button
          v-for="car in vehicles"
          :key="car.id"
          type="button"
          class="h-2 w-10 rounded-full bg-border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pureWhite"
          :class="isActive(car) ? 'bg-foreground w-12' : 'bg-border/70 hover:bg-border'"
          @click="setExpanded(car.id)"
        >
          <span class="sr-only">{{ car.name }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes slide-in-bottom {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slide-in-bottom {
  animation: slide-in-bottom 0.9s cubic-bezier(0.76, 0, 0.24, 1) both;
}
</style>
