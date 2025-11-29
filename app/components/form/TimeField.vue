<script setup lang="ts">
import type { Time } from '@internationalized/date'
import type { TimeFieldProps } from './TimeField.model'
import {
  TimeFieldInput,
  TimeFieldRoot,
} from 'reka-ui'
import { computed } from 'vue'
import { timeFieldDefaults } from './TimeField.model'

const props = withDefaults(defineProps<TimeFieldProps>(), {
  modelValue: null,
  ...timeFieldDefaults,
})

const emit = defineEmits<{
  'update:modelValue': [Time | null]
}>()

const timeValue = computed<Time | null>({
  get: () => props.modelValue ?? null,
  set: val => emit('update:modelValue', val),
})

const timeString = computed(() => timeValue.value ? formatTime(timeValue.value) : '')

function formatTime(value: Time) {
  // Time implements toString as HH:MM or HH:MM:SS; force HH:MM
  const date = value as Time
  return `${String(date.hour).padStart(2, '0')}:${String(date.minute).padStart(2, '0')}`
}

function displaySegment(part: string, value: string) {
  if (part === 'hour' || part === 'minute')
    return value.toString().padStart(2, '0')
  return value
}
</script>

<template>
  <TimeFieldRoot
    :id="props.id"
    v-slot="{ segments }"
    v-model="timeValue"
    :locale="props.locale"
    granularity="minute"
    hour-cycle="24"
  >
    <div class="relative h-11 w-full flex items-center justify-between gap-3 border rounded-sm border-solid bg-transparent px-3 py-2 text-base text-foreground font-light outline-none focus-within:ring-2 focus-within:ring-offset-0 focus-within:ring-pureWhite">
      <div class="flex items-center">
        <template v-for="item in segments" :key="item.part">
          <TimeFieldInput
            v-if="item.part === 'literal'"
            :part="item.part"
            class="text-muted-foreground"
          >
            {{ displaySegment(item.part, item.value) }}
          </TimeFieldInput>
          <TimeFieldInput
            v-else
            :part="item.part"
            class="min-w-[1.6ch] text-left data-[placeholder]:text-muted-foreground focus:outline-none"
          >
            {{ displaySegment(item.part, item.value) }}
          </TimeFieldInput>
        </template>
      </div>
    </div>

    <input type="hidden" :name="props.name" :value="timeString" :required="props.required">
  </TimeFieldRoot>
</template>
