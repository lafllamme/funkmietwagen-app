<script setup lang="ts">
defineProps<{
  for?: string
}>()
</script>

<template>
  <label
    v-bind="$attrs"
    :for="for"
    class="text-xs text-foreground font-light tracking-widest uppercase"
  >
    <slot />
  </label>
</template>
