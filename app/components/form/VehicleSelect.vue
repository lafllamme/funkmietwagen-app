<script setup lang="ts">
import type { VehicleOption, VehicleSelectProps } from './VehicleSelect.model'
import { computed } from 'vue'
import { vehicleOptions, vehicleSelectDefaults } from './VehicleSelect.model'

const props = withDefaults(defineProps<VehicleSelectProps>(), {
  modelValue: null,
  ...vehicleSelectDefaults,
})

const emit = defineEmits<{
  'update:modelValue': [VehicleOption | null]
}>()

const selected = computed<VehicleOption | null>({
  get: () => props.modelValue ?? null,
  set: val => emit('update:modelValue', val),
})

function toggle(option: VehicleOption) {
  selected.value = option
}

const hiddenValue = computed(() => {
  if (!selected.value)
    return ''
  return `${selected.value.name} (${selected.value.type}, ${selected.value.seats})`
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col gap-3 sm:flex-row">
      <button
        v-for="option in vehicleOptions"
        :key="option.id"
        type="button"
        class="group flex-1 touch-manipulation border rounded-sm border-solid p-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pureWhite"
        :class="selected?.id === option.id ? 'border-foreground bg-foreground text-background' : 'border-gray-5 bg-transparent text-foreground hover:border-foreground/40'"
        @click="toggle(option)"
      >
        <div class="flex flex-col items-center gap-3">
          <Icon
            :name="option.icon"
            class="h-8 w-8 transition-transform duration-300"
            :class="selected?.id === option.id ? 'group-hover:scale-105' : 'group-hover:scale-110'"
          />
          <div class="text-center">
            <p class="font-medium">
              {{ option.name }}
            </p>
            <p
              class="mt-1 text-xs"
              :class="selected?.id === option.id ? 'text-background/80' : 'text-muted-foreground'"
            >
              {{ option.type }} · {{ option.seats }}
            </p>
          </div>
        </div>
      </button>
    </div>
    <input type="hidden" :name="props.name" :value="hiddenValue" :required="props.required">
  </div>
</template>
