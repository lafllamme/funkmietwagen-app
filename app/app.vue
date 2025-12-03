<script setup lang="ts">
import { consola } from 'consola'

consola.level = import.meta.dev ? 5 : 0
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
