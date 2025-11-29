<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { DatePickerFieldProps } from './DatePickerField.model'
import {
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerField,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerInput,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger,
} from 'reka-ui'
import { computed } from 'vue'
import { datePickerDefaults } from './DatePickerField.model'

const props = withDefaults(defineProps<DatePickerFieldProps>(), {
  modelValue: null,
  ...datePickerDefaults,
})

const emit = defineEmits<{
  'update:modelValue': [DateValue | null]
}>()

const dateValue = computed<DateValue | null>({
  get: () => props.modelValue ?? null,
  set: val => emit('update:modelValue', val),
})

const isoDate = computed(() => (dateValue.value ? formatDate(dateValue.value) : ''))

function formatDate(value: DateValue) {
  // DateValue from @internationalized/date implements toString as ISO YYYY-MM-DD
  return value.toString()
}
</script>

<template>
  <DatePickerRoot v-model="dateValue">
    <DatePickerField
      :id="props.id"
      v-slot="{ segments }"
      class="relative h-11 w-full flex items-center justify-between gap-3 border rounded-sm border-solid bg-transparent px-3 py-2 text-base text-foreground font-light outline-none focus-within:ring-2 focus-within:ring-offset-0 focus-within:ring-pureWhite"
    >
      <div class="flex items-center">
        <template v-for="item in segments" :key="item.part">
          <DatePickerInput
            v-if="item.part === 'literal'"
            :part="item.part"
            class="text-muted-foreground"
          >
            {{ item.value }}
          </DatePickerInput>
          <DatePickerInput
            v-else
            :part="item.part"
            class="min-w-[1.4ch] text-left data-[placeholder]:text-muted-foreground focus:outline-none"
          >
            {{ item.value }}
          </DatePickerInput>
        </template>
      </div>

      <DatePickerTrigger
        class="h-7 w-7 flex items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pureWhite"
        aria-label="Datum auswählen"
      >
        <Icon name="lucide:calendar" class="colore-pureWhite size-4" />
      </DatePickerTrigger>
    </DatePickerField>

    <DatePickerContent
      class="z-50 mt-2 rounded-sm bg-background shadow-lg ring-2 ring-pureWhite"
      side="bottom"
      :side-offset="4"
      :side-flip="false"
    >
      <DatePickerArrow class="fill-background stroke-gray-5" />
      <DatePickerCalendar v-slot="{ weekDays, grid }" class="p-4">
        <DatePickerHeader class="mb-3 flex items-center justify-between">
          <DatePickerPrev
            class="h-8 w-8 inline-flex items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pureWhite"
            aria-label="Vorheriger Monat"
          >
            <Icon name="lucide:chevron-left" class="size-4 color-pureWhite" />
          </DatePickerPrev>
          <DatePickerHeading class="text-sm text-foreground font-medium" />
          <DatePickerNext
            class="h-8 w-8 inline-flex items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pureWhite"
            aria-label="Nächster Monat"
          >
            <Icon name="lucide:chevron-right" class="size-4 color-pureWhite" />
          </DatePickerNext>
        </DatePickerHeader>

        <div class="space-y-2">
          <DatePickerGrid
            v-for="month in grid"
            :key="month.value.toString()"
            class="w-full border-collapse select-none space-y-1"
          >
            <DatePickerGridHead>
              <DatePickerGridRow class="grid grid-cols-7 mb-1 gap-1">
                <DatePickerHeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="text-center text-xs text-muted-foreground tracking-[0.1em] uppercase"
                >
                  {{ day }}
                </DatePickerHeadCell>
              </DatePickerGridRow>
            </DatePickerGridHead>
            <DatePickerGridBody>
              <DatePickerGridRow
                v-for="(weekDates, index) in month.rows"
                :key="`weekDate-${index}`"
                class="grid grid-cols-7 gap-1"
              >
                <DatePickerCell
                  v-for="weekDate in weekDates"
                  :key="weekDate.toString()"
                  :date="weekDate"
                >
                  <DatePickerCellTrigger
                    :day="weekDate"
                    :month="month.value"
                    class="relative h-8 w-8 flex items-center justify-center whitespace-nowrap border border-transparent rounded-sm text-sm text-foreground outline-none transition-colors data-[unavailable]:pointer-events-none hover:border-foreground data-[selected]:bg-foreground data-[outside-view]:text-muted-foreground data-[selected]:text-background data-[unavailable]:opacity-30 data-[today]:ring-1 data-[today]:ring-foreground/40 data-[selected]:hover:border-transparent"
                  />
                </DatePickerCell>
              </DatePickerGridRow>
            </DatePickerGridBody>
          </DatePickerGrid>
        </div>
      </DatePickerCalendar>
    </DatePickerContent>

    <input type="hidden" :name="props.name" :value="isoDate" :required="props.required">
  </DatePickerRoot>
</template>
