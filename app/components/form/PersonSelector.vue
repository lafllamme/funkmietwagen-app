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
  <div class="flex flex-col gap-3">
    <div class="flex items-center justify-center gap-1">
      <button
        v-for="n in props.max"
        :key="n"
        type="button"
        class="rounded-sm p-1 text-foreground/70 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pureWhite touch-manipulation"
        :class="n <= value ? 'opacity-100 scale-100 text-foreground' : 'opacity-25 scale-95'"
        :aria-pressed="n === value"
        :aria-label="`${n} ${n === 1 ? 'Person' : 'Personen'}`"
        @click="setValue(n)"
      >
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </button>
    </div>
    <div class="flex items-center justify-center gap-4 text-foreground">
      <button
        type="button"
        :disabled="value <= props.min"
        class="text-xl text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40 disabled:hover:text-muted-foreground touch-manipulation"
        aria-label="Weniger Personen"
        @click="dec"
      >
        −
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
        class="text-xl text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40 disabled:hover:text-muted-foreground touch-manipulation"
        aria-label="Mehr Personen"
        @click="inc"
      >
        +
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
