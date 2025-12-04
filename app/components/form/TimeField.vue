<script setup lang="ts">
import type { Time } from '@internationalized/date'
import type { TimeFieldProps } from './TimeField.model'
import { parseTime } from '@internationalized/date'
import { TimeFieldInput, TimeFieldRoot } from 'reka-ui'
import { computed, nextTick, ref } from 'vue'
import { useNativePickers } from '@/composables/useNativePickers'
import { defaultTimeValue, timeFieldDefaults } from './TimeField.model'

const props = withDefaults(defineProps<TimeFieldProps>(), {
  modelValue: null,
  ...timeFieldDefaults,
})

const emit = defineEmits<{
  'update:modelValue': [Time | null]
}>()

const rootRef = ref<InstanceType<typeof TimeFieldRoot> | null>(null)
const nativeInputRef = ref<HTMLInputElement | null>(null)

const timeValue = computed<Time | null>({
  get: () => props.modelValue ?? defaultTimeValue,
  set: val => emit('update:modelValue', val ?? defaultTimeValue),
})

const { time: canUseNativeTime } = useNativePickers()
const useNativePicker = computed(() => props.preferNative && canUseNativeTime.value)

const nativeTimeValue = computed({
  get: () => timeValue.value ? formatTime(timeValue.value) : '',
  set: (val: string) => {
    timeValue.value = val ? parseTime(val) : null
  },
})

const timeString = computed(() => timeValue.value ? formatTime(timeValue.value) : '')
const errorClass = computed(() => props.error ? 'border-red-10 focus-within:ring-red-10 focus-within:ring-2' : '')

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

function focusInput() {
  nextTick(() => {
    if (useNativePicker.value) {
      nativeInputRef.value?.focus()
      return
    }
    const el = (rootRef.value as any)?.$el as HTMLElement | null
    const input = el?.querySelector('input')
    if (input instanceof HTMLElement)
      input.focus()
  })
}

defineExpose({ focusInput })
</script>

<template>
  <div class="w-full">
    <div
      v-if="useNativePicker"
      class="relative h-11 w-full flex items-center border rounded-sm border-solid bg-transparent px-3 py-2 text-base text-foreground font-light tracking-widest outline-none focus-within:ring-2 focus-within:ring-offset-0 focus-within:ring-pureWhite"
      :class="errorClass"
    >
      <input
        :id="props.id"
        ref="nativeInputRef"
        v-model="nativeTimeValue"
        :name="props.name"
        type="time"
        step="60"
        :required="props.required"
        :placeholder="props.placeholder"
        class="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50"
      >
    </div>

    <TimeFieldRoot
      v-else
      :id="props.id"
      ref="rootRef"
      v-slot="{ segments }"
      v-model="timeValue"
      :locale="props.locale"
      granularity="minute"
      :hour-cycle="24"
    >
      <div
        class="relative h-11 w-full flex items-center justify-between gap-3 border rounded-sm border-solid bg-transparent px-3 py-2 text-base text-foreground font-light tracking-widest outline-none focus-within:ring-2 focus-within:ring-offset-0 focus-within:ring-pureWhite"
        :class="errorClass"
      >
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
              class="min-w-[1.6ch] px-1 text-left data-[placeholder]:text-muted-foreground focus:shadow-[0_0_0_2px] focus:shadow-pureWhite focus:outline-none"
            >
              {{ displaySegment(item.part, item.value) }}
            </TimeFieldInput>
          </template>
        </div>
      </div>

      <input type="hidden" :name="props.name" :value="timeString" :required="props.required">
    </TimeFieldRoot>
  </div>
</template>
