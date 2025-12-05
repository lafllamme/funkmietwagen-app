<script setup lang="ts">
import { Icon } from '#components'
import { useRoute } from '#imports'
import { computed, ref } from 'vue'
import { mainMenuContact, mainMenuItems, mainMenuSocial } from '@/components/navigation/MainMenu.model'
import MainMenu from '@/components/navigation/MainMenu.vue'

const route = useRoute()
const isMenuOpen = ref(false)

const baseNav
  = '[@media(min-width:400px)]:text-sm [@media(max-width:400px)]:mr-3 text-xs items-center gap-2 rounded-full border border-transparent px-4 py-2 text-muted-foreground font-light tracking-widest uppercase transition-colors duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pureWhite focus-visible:ring-offset-pureBlack'
const hoverNav = 'hover:bg-pureWhite hover:text-pureBlack'
const activeNav = 'bg-pureWhite text-pureBlack border-pureWhite/60'

function navClass(path: string, extra = '') {
  const isActive = route.path === path
  return [baseNav, extra, isActive ? activeNav : hoverNav]
}

const headerBase
  = 'fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-12 border-solid transition-colors duration-300'

const headerClosed
  = 'bg-pureBlack/60 backdrop-blur-md supports-[backdrop-filter]:bg-pureBlack/60'

const headerOpen
  = 'bg-pureBlack supports-[backdrop-filter]:bg-pureBlack'

const headerClasses = computed(() => [
  headerBase,
  isMenuOpen.value ? headerOpen : headerClosed,
])
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

      <nav class="flex items-center [@media(min-width:400px)]:gap-3 md:gap-4">
        <NuxtLink to="/" :class="navClass('/')">
          Start
        </NuxtLink>
        <NuxtLink to="/impressum" :class="navClass('/impressum', 'hidden xl:inline-flex')">
          Impressum
        </NuxtLink>
        <NuxtLink to="/datenschutz" :class="navClass('/datenschutz', 'hidden xl:inline-flex')">
          Datenschutz
        </NuxtLink>
        <NuxtLink to="/ueber-uns" :class="navClass('/ueber-uns', 'hidden xl:inline-flex')">
          Ueber uns
        </NuxtLink>
        <NuxtLink to="/vorbestellung" :class="navClass('/vorbestellung')">
          Reservieren
        </NuxtLink>

        <button
          type="button"
          class="flex items-center gap-2 border border-pureWhite border-solid px-4 py-2 text-sm text-foreground font-light tracking-widest uppercase transition-all hover:bg-foreground hover:text-background"
          @click="isMenuOpen = !isMenuOpen"
        >
          <Icon name="lucide:menu" class="h-4 w-4" />
          <span class="hidden md:inline">
            {{ isMenuOpen ? "Schliessen" : "Menue" }}
          </span>
        </button>
      </nav>
    </div>
  </header>

  <!-- Overlay Menu, komplett entkoppelt vom Header, aber gesteuert ueber isMenuOpen -->
  <MainMenu
    :open="isMenuOpen"
    :items="mainMenuItems"
    :contact="mainMenuContact"
    :social="mainMenuSocial"
    offset="80px"
    @close="isMenuOpen = false"
  />
</template>
