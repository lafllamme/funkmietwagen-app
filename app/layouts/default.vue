<script setup lang="ts">
import AppFooter from '@/components/layout/Footer.vue'
import AppHeader from '@/components/layout/Header.vue'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground overflow-x-hidden max-w-[100vw]">
    <AppHeader />
    <div class="pb-10 pt-24 lg:pt-20 md:pb-16 md:pt-28">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>
