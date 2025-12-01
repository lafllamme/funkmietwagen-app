<script setup lang="ts">
import type { BookingType } from './BookingTypeSwitch.model'
import { bookingTypeOptions } from './BookingTypeSwitch.model'

withDefaults(defineProps<{
  modelValue?: BookingType
}>(), {
  modelValue: 'route',
})

const emit = defineEmits<{
  'update:modelValue': [BookingType]
}>()

function select(value: BookingType) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="inline-flex border border-gray-12 rounded-full border-solid p-1">
    <button
      v-for="option in bookingTypeOptions"
      :key="option.value"
      type="button"
      class="rounded-full px-8 py-3 text-sm font-light tracking-[0.2em] uppercase transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      :class="modelValue === option.value
        ? 'bg-foreground text-background'
        : 'text-muted-foreground hover:text-foreground'"
      @click="select(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
