import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'

interface PickerSupport {
  date: boolean
  time: boolean
}

let cachedSupport: PickerSupport | null = null

function detectSupport(): PickerSupport {
  if (cachedSupport)
    return cachedSupport

  if (!import.meta.client) {
    return { date: false, time: false }
  }

  const supportsType = (type: 'date' | 'time', value: string) => {
    const input = document.createElement('input')
    input.setAttribute('type', type)
    input.value = value
    return input.type === type && input.value === value
  }

  cachedSupport = {
    date: supportsType('date', '2024-01-01'),
    time: supportsType('time', '12:00'),
  }

  return cachedSupport
}

export function useNativePickers() {
  // SSR: just return all false, no DOM, no breakpoints
  if (!import.meta.client) {
    const isMobile = computed(() => false)

    return {
      date: computed(() => false),
      time: computed(() => false),
      isMobile,
    }
  }

  // Client: run real detection
  const support = detectSupport()
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('md')

  const date = ref(false)
  const time = ref(false)

  const update = () => {
    date.value = support.date && isMobile.value
    time.value = support.time && isMobile.value
  }

  onMounted(() => {
    update()
    watch(isMobile, update)
  })

  return {
    date: computed(() => date.value),
    time: computed(() => time.value),
    isMobile,
  }
}
