<script setup lang="ts">
defineProps<{
  for?: string
}>()
</script>

<template>
  <label
    v-bind="$attrs"
    :for="for"
    class="text-xs font-light uppercase tracking-widest text-foreground"
  >
    <slot />
  </label>
</template>
