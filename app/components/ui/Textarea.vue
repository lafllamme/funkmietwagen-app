<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <textarea
    v-bind="$attrs"
    :value="props.modelValue"
    @input="onInput"
    class="w-full border border-border bg-transparent px-3 py-2 text-sm font-light text-foreground outline-none placeholder:text-muted-foreground/50 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-ring"
  />
</template>
