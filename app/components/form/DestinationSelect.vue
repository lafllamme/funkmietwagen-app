<script setup lang="ts">
import type { DestinationOption, DestinationSelectProps } from './DestinationSelect.model'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
  useFilter,
} from 'reka-ui'
import { computed, ref, watch } from 'vue'

import { destinationOptions, destinationSelectDefaults } from './DestinationSelect.model'

const props = withDefaults(defineProps<DestinationSelectProps>(), {
  modelValue: null,
  ...destinationSelectDefaults,
})

const emit = defineEmits<{
  'update:modelValue': [DestinationOption | null]
  'selected': [DestinationOption]
}>()

const destinationValue = computed({
  get: () => props.modelValue ?? null,
  set: value => emit('update:modelValue', value),
})
const destinationInput = ref(destinationValue.value?.label ?? '')
const destinationCode = ref(destinationValue.value?.code ?? '')
const inputRef = ref<HTMLInputElement | null>(null)
const open = ref(false)

const { contains } = useFilter({ sensitivity: 'base' })
const customDestinations = ref<DestinationOption[]>([])

const allDestinations = computed(() => [
  ...destinationOptions,
  ...customDestinations.value,
])

const trimmedDestinationInput = computed(() => destinationInput.value.trim())
const filteredDestinations = computed(() =>
  allDestinations.value.filter(option => contains(option.label, destinationInput.value)),
)

const hasExactDestination = computed(() =>
  !!trimmedDestinationInput.value
  && allDestinations.value.some(option => option.label.toLowerCase() === trimmedDestinationInput.value.toLowerCase()),
)

const customDestinationOption = computed(() => {
  if (!trimmedDestinationInput.value || hasExactDestination.value)
    return null
  return buildCustomDestination(trimmedDestinationInput.value)
})
const renderedDestinations = computed(() => {
  if (!customDestinationOption.value)
    return filteredDestinations.value

  return [customDestinationOption.value, ...filteredDestinations.value]
})
function toSlug(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'ziel'
}
function buildCustomDestination(label: string): DestinationOption {
  const normalized = label.trim()
  return {
    code: `custom-${toSlug(normalized)}`,
    label: normalized,
  }
}
function ensureCustomDestination(label: string) {
  if (!label.trim() || hasExactDestination.value) {
    return
  }
  const normalized = label.trim()
  const exists = allDestinations.value.some(
    option => option.label.toLowerCase() === normalized.toLowerCase(),
  )
  if (exists) {
    return
  }
  customDestinations.value.push(buildCustomDestination(normalized))
}

function handleDestinationEnter(event: KeyboardEvent) {
  if (customDestinationOption.value && !filteredDestinations.value.length) {
    event.preventDefault()
    destinationValue.value = customDestinationOption.value
  }
}

function commitCustomDestination() {
  if (!customDestinationOption.value)
    return

  destinationValue.value = customDestinationOption.value
}

watch(destinationValue, (val) => {
  if (!val) {
    destinationInput.value = ''
    destinationCode.value = ''
    return
  }

  destinationInput.value = val.label
  destinationCode.value = val.code
  ensureCustomDestination(val.label)
  open.value = false
  emit('selected', val)
}, { immediate: true })

watch(destinationInput, (val) => {
  if (!val) {
    destinationValue.value = null
    destinationCode.value = ''
    return
  }

  const selectedLabel = destinationValue.value?.label || ''
  if (selectedLabel === val)
    return

  destinationValue.value = null
  destinationCode.value = ''
})
</script>

<template>
  <div>
    <ComboboxRoot
      v-model="destinationValue"
      v-model:open="open"
      by="code"
      :ignore-filter="true"
      :reset-search-term-on-blur="false"
      :reset-search-term-on-select="false"
      :open-on-click="true"
      :open-on-focus="true"
      class="relative w-full focus-visible:outline-none"
    >
      <ComboboxAnchor class="relative block w-full">
        <ComboboxInput
          :id="inputId"
          ref="inputRef"
          v-model="destinationInput"
          :name="inputName"
          :required="required"
          :placeholder="placeholder"
          class="h-11 w-full border rounded-sm border-solid bg-transparent px-3 py-2 pr-10 text-base text-foreground font-light outline-none placeholder:color-gray-10 focus-visible:ring-2 focus-visible:ring-pureWhite focus-visible:ring-inset"
          @keydown.enter="handleDestinationEnter"
          @blur="commitCustomDestination"
        />
        <ComboboxTrigger
          class="absolute right-3 top-1/2 text-muted-foreground -translate-y-1/2"
          aria-label="Ziel auswählen"
        >
          <Icon name="lucide:chevron-down" class="h-4 w-4" />
        </ComboboxTrigger>
      </ComboboxAnchor>

      <ComboboxPortal>
        <ComboboxContent
          class="z-50 mt-2 border border-1 border-pureWhite rounded-sm border-solid bg-background shadow-lg"
          position="popper"
          side="bottom"
          :side-offset="4"
          :side-flip="false"
          :style="{
            width: 'var(--reka-combobox-trigger-width)',
            minWidth: 'var(--reka-combobox-trigger-width)',
          }"
        >
          <ComboboxViewport>
            <ComboboxItem
              v-for="option in renderedDestinations"
              :key="option.code"
              :value="option"
              :text-value="option.label"
              class="cursor-pointer rounded-sm px-3 py-2 text-sm text-foreground font-semibold tracking-tighter capitalize data-[highlighted]:bg-gray-11"
            >
              <div class="flex items-center gap-2">
                <ComboboxItemIndicator class="h-4 w-4 flex items-center justify-center text-foreground">
                  <Icon name="lucide:check" class="h-4 w-4" />
                </ComboboxItemIndicator>
                <span>{{ option.label }}</span>
              </div>
            </ComboboxItem>
            <ComboboxEmpty class="px-3 py-2 text-sm text-muted-foreground">
              Keine Treffer
            </ComboboxEmpty>
          </ComboboxViewport>
        </ComboboxContent>
      </ComboboxPortal>
    </ComboboxRoot>

    <input type="hidden" :name="codeName" :value="destinationCode">
    <input type="hidden" :name="labelName" :value="destinationInput">
  </div>
</template>
