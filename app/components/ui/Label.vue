<script setup lang="ts">
const props = defineProps<{
  for?: string
}>()

const { for: labelFor } = toRefs(props)
</script>

<template>
  <label
    v-bind="$attrs"
    :for="labelFor"
    class="text-xs text-foreground font-light tracking-widest uppercase"
  >
    <slot />
  </label>
</template>
