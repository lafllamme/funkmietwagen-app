<script setup lang="ts">
import type { VehicleOption, VehicleRadioGroupProps } from './VehicleRadioGroup.model'
import {
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupRoot,
} from 'reka-ui'
import { computed } from 'vue'
import { vehicleOptions, vehicleRadioGroupDefaults } from './VehicleRadioGroup.model'

const props = withDefaults(defineProps<VehicleRadioGroupProps>(), {
  modelValue: null,
  ...vehicleRadioGroupDefaults,
})

const emit = defineEmits<{
  'update:modelValue': [VehicleOption | null]
}>()

const selected = computed<VehicleOption | null>({
  get: () => props.modelValue ?? null,
  set: val => emit('update:modelValue', val),
})

const hiddenValue = computed(() => selected.value
  ? `${selected.value.name} (${selected.value.type}, ${selected.value.seats})`
  : '',
)
</script>

<template>
  <div class="space-y-3">
    <RadioGroupRoot
      v-model="selected"
      class="flex flex-col gap-3"
      :name="props.name"
      :required="props.required"
      :loop="false"
      :orientation="props.orientation"
    >
      <RadioGroupItem
        v-for="option in vehicleOptions"
        :key="option.id"
        :value="option"
        :name="props.name"
        class="group w-full touch-manipulation border rounded-sm border-solid p-5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pureWhite"
        :class="selected?.id === option.id ? 'border-pureWhite bg-gray-12' : 'hover:border-gray-10'"
      >
        <div class="flex items-center gap-4">
          <div
            class="h-6 w-6 flex flex-shrink-0 items-center justify-center border-2 rounded-full transition-all duration-300"
            :class="selected?.id === option.id ? 'border-foreground bg-foreground' : 'border-muted-foreground/40'"
          >
            <RadioGroupIndicator class="h-full w-full flex items-center justify-center rounded-full">
              <Icon name="lucide:check" class="h-3.5 w-3.5 text-background" stroke-width="3" />
            </RadioGroupIndicator>
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-baseline gap-2">
              <span class="text-foreground font-medium">{{ option.name }}</span>
              <span class="text-xs text-muted-foreground">· {{ option.type }}</span>
            </div>
            <div class="mt-1.5 flex flex-wrap gap-3">
              <span
                v-for="feature in option.features"
                :key="feature"
                class="text-xs text-muted-foreground"
              >
                {{ feature }}
              </span>
            </div>
          </div>
          <svg
            class="h-5 w-5 transition-all duration-300"
            :class="selected?.id === option.id ? 'text-foreground translate-x-0' : 'text-muted-foreground/40 -translate-x-1'"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </RadioGroupItem>
    </RadioGroupRoot>

    <input type="hidden" :name="props.name" :value="hiddenValue" :required="props.required">
  </div>
</template>
