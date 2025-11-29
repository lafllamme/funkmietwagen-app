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
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center justify-center gap-1">
      <div
        v-for="n in props.max"
        :key="n"
        class="text-foreground/70 transition-all duration-300"
        :class="n <= value ? 'opacity-100 scale-100 text-foreground' : 'opacity-25 scale-95'"
      >
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
    </div>
    <div class="flex items-center justify-center gap-4 text-foreground">
      <button
        type="button"
        :disabled="value <= props.min"
        class="text-xl text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40 disabled:hover:text-muted-foreground"
        aria-label="Weniger Personen"
        @click="dec"
      >
        −
      </button>
      <div class="w-10 text-center text-lg tabular-nums">
        {{ value }}
      </div>
      <button
        type="button"
        :disabled="value >= props.max"
        class="text-xl text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40 disabled:hover:text-muted-foreground"
        aria-label="Mehr Personen"
        @click="inc"
      >
        +
      </button>
    </div>

    <input type="hidden" :name="props.name" :value="value" :required="props.required">
  </div>
</template>
