<script setup lang="ts">
import AppFooter from '@/components/layout/Footer.vue'
import AppHeader from '@/components/layout/Header.vue'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <AppHeader />
    <main class="pb-10 pt-24 lg:pt-32 md:pb-16 md:pt-28">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
