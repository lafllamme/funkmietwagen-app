<script setup lang="ts">
import { Icon } from '#components'
import { useRoute } from '#imports'
import { computed, onBeforeUnmount, ref } from 'vue'
import { mainMenuContact, mainMenuItems, mainMenuSocial } from '@/components/navigation/MainMenu.model'
import MainMenu from '@/components/navigation/MainMenu.vue'

const route = useRoute()
const isPanelOpen = ref(false)
const isHeaderSolid = ref(false)
let closeTimer: ReturnType<typeof setTimeout> | null = null

const activeRoute = computed(() => route.path)

const headerBase
  = 'fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-12 border-solid'

const headerClosed
  = 'bg-pureBlack/60 backdrop-blur-md supports-[backdrop-filter]:bg-pureBlack/60'

const headerOpen
  = 'bg-pureBlack supports-[backdrop-filter]:bg-pureBlack transition-none'

const headerClasses = computed(() => [
  headerBase,
  isHeaderSolid.value ? headerOpen : `${headerClosed} transition-colors duration-300`,
])

const phoneLink = computed(() => {
  return `tel:${mainMenuContact.phone.replace(/\\s+/g, '')}`
})

function openMenu() {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  isHeaderSolid.value = true
  isPanelOpen.value = true
}

function closeMenu() {
  isPanelOpen.value = false
  closeTimer = setTimeout(() => {
    isHeaderSolid.value = false
  }, 600)
}

onBeforeUnmount(() => {
  if (closeTimer)
    clearTimeout(closeTimer)
})
</script>

<template>
  <!-- nur der Header -->
  <header :class="headerClasses">
    <div class="container mx-auto h-20 flex items-center justify-between px-4 md:px-6">
      <NuxtLink to="/" class="flex items-center gap-3">
        <div class="h-11 w-11 flex items-center justify-center border-2 border-pureWhite border-solid">
          <span class="text-xl font-semibold tracking-tight font-serif">A</span>
        </div>
        <div class="hidden sm:block">
          <span class="block text-xl text-foreground font-medium tracking-wide font-serif">Funkmietwagen</span>
          <span class="font-geist block text-xs text-muted-foreground tracking-[0.3em] uppercase">ADE</span>
        </div>
      </NuxtLink>

      <nav class="flex gap-3 md:gap-4">
        <NuxtLink
          to="/vorbestellung"
          class="inline-flex items-center gap-2 border border-transparent rounded-full px-4 py-2 text-sm text-muted-foreground font-light tracking-widest uppercase transition-colors duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pureWhite focus-visible:ring-offset-pureBlack"
          :class="activeRoute === '/vorbestellung' ? 'bg-pureWhite text-pureBlack border-pureWhite/60' : 'hover:bg-pureWhite hover:text-pureBlack'"
        >
          Reservieren
        </NuxtLink>
        <NuxtLink
          :to="phoneLink"
          class="inline-flex items-center gap-2 border border-pureWhite border-solid px-3 py-2 text-xs text-foreground font-light tracking-widest uppercase transition-all hover:bg-foreground sm:px-4 sm:text-sm hover:text-background"
        >
          <Icon name="lucide:phone" class="h-4 w-4" />
          <span class="hidden sm:inline">Anrufen</span>
        </NuxtLink>

        <button
          type="button"
          class="flex items-center gap-2 border border-pureWhite border-solid px-4 py-2 text-sm text-foreground font-light tracking-widest uppercase transition-all hover:bg-foreground hover:text-background"
          @click="isPanelOpen ? closeMenu() : openMenu()"
        >
          <Icon name="lucide:menu" class="h-4 w-4" />
          <span class="hidden md:inline">
            Menu
          </span>
        </button>
      </nav>
    </div>
  </header>

  <!-- Overlay Menu, komplett entkoppelt vom Header, aber gesteuert ueber isMenuOpen -->
  <MainMenu
    :open="isPanelOpen"
    :items="mainMenuItems"
    :contact="mainMenuContact"
    :social="mainMenuSocial"
    offset="80px"
    @close="closeMenu()"
  />
</template>
