<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number
    statusMessage: string
  }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold">
        {{ error.statusCode }}
      </h1>
      <p class="text-gray-600 mt-2">
        {{ error.statusMessage }}
      </p>
      <button
        class="bg-blue-500 text-white hover:bg-blue-600 mt-4 rounded px-4 py-2"
        @click="handleError"
      >
        Go Home
      </button>
    </div>
  </div>
</template>
