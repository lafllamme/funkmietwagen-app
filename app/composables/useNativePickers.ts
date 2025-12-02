import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed } from 'vue'

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

  return {
    date: computed(() => support.date && isMobile.value),
    time: computed(() => support.time && isMobile.value),
    isMobile,
  }
}
