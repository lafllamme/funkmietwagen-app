<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input
    v-bind="$attrs"
    :value="props.modelValue"
    class="h-11 w-full border rounded-sm border-solid bg-transparent px-3 py-2 text-base text-foreground font-light outline-none placeholder:text-muted-foreground/50 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-pureWhite"
    @input="onInput"
  >
</template>
