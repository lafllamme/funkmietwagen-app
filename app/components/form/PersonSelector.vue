<script setup lang="ts">
import type { PersonSelectorProps } from './PersonSelector.model'
import { computed } from 'vue'
import { personSelectorDefaults } from './PersonSelector.model'

const props = withDefaults(defineProps<PersonSelectorProps>(), {
  modelValue: personSelectorDefaults.min,
  ...personSelectorDefaults,
})

const emit = defineEmits<{
  'update:modelValue': [number]
}>()

const value = computed({
  get: () => clampValue(props.modelValue ?? props.min),
  set: val => emit('update:modelValue', clampValue(val)),
})

function clampValue(val: number) {
  return Math.min(props.max, Math.max(props.min, val))
}

function inc() {
  value.value = clampValue(value.value + 1)
}

function dec() {
  value.value = clampValue(value.value - 1)
}

function setValue(n: number) {
  value.value = clampValue(n)
}
</script>

<template>
  <div class="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
    <div class="flex items-center justify-center gap-1 md:justify-start">
      <button
        v-for="n in props.max"
        :key="n"
        type="button"
        class="touch-manipulation rounded-sm p-1 text-foreground/70 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pureWhite"
        :class="n <= value ? 'opacity-100 scale-100 text-foreground' : 'opacity-25 scale-95'"
        :aria-pressed="n === value"
        :aria-label="`${n} ${n === 1 ? 'Person' : 'Personen'}`"
        @click="setValue(n)"
      >
        <Icon name="bxs:user" class="size-6" />
      </button>
    </div>
    <div class="flex items-center justify-center gap-4 text-foreground md:justify-end">
      <button
        type="button"
        :disabled="value <= props.min"
        class="group size-10 flex touch-manipulation items-center justify-center border border-pureWhite/15 rounded-full bg-pureWhite/[0.06] text-lg text-muted-foreground leading-none transition-colors focus:border-pureWhite/80 hover:border-pureWhite/30 hover:text-foreground disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pureWhite disabled:hover:border-pureWhite/15 disabled:hover:text-muted-foreground"
        aria-label="Weniger Personen"
        @click="dec"
      >
        <Icon name="lucide:minus" class="size-4 group-focus:color-pureWhite" />
      </button>
      <div class="h-8 w-10 flex items-center justify-center overflow-hidden text-center text-lg tabular-nums">
        <Transition name="slide" mode="out-in">
          <span :key="value">
            {{ value }}
          </span>
        </Transition>
      </div>
      <button
        type="button"
        :disabled="value >= props.max"
        class="group size-10 flex touch-manipulation items-center justify-center border border-pureWhite/15 rounded-full bg-pureWhite/[0.06] text-lg text-muted-foreground leading-none transition-colors focus:border-pureWhite/80 hover:border-pureWhite/30 hover:text-foreground disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pureWhite disabled:hover:border-pureWhite/15 disabled:hover:text-muted-foreground"
        aria-label="Mehr Personen"
        @click="inc"
      >
        <Icon name="lucide:plus" class="size-4 group-focus:color-pureWhite" />
      </button>
    </div>

    <input type="hidden" :name="props.name" :value="value" :required="props.required">
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.18s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
