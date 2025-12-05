<script setup lang="ts">
import type { MainMenuContact, MainMenuLink, MainMenuSocial } from './MainMenu.model'
import { Icon } from '#components'

const props = defineProps<{
  open: boolean
  items: MainMenuLink[]
  contact: MainMenuContact
  social: MainMenuSocial[]
  offset?: string
}>()

const emit = defineEmits<{
  close: []
}>()

function close() {
  emit('close')
}

const PANEL_TOP = computed(() => props.offset || '80px')
</script>

<template>
  <div
    class="fixed inset-0 z-40 transition-all duration-500"
    :class="open ? 'visible' : 'invisible'"
  >
    <div
      class="bg-black/60 absolute inset-0 transition-opacity duration-500"
      :class="open ? 'opacity-100' : 'opacity-0'"
      @click="close"
    />

    <div
      class="after:to-black/50 absolute left-0 right-0 bg-pureBlack text-foreground shadow-[0_30px_120px_-60px_rgba(0,0,0,0.6)] after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[120px] after:from-transparent after:bg-gradient-to-b md:after:backdrop-blur-[2px]"
      :style="{
        top: PANEL_TOP,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transform: open ? 'translateY(0)' : 'translateY(-14px)',
        transition: 'opacity 0.35s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }"
    >
      <div class="px-5 pb-12 pt-24 lg:px-16 md:px-10">
        <div class="grid mx-auto max-w-6xl gap-10 lg:grid-cols-3">
          <nav class="lg:col-span-2">
            <p class="mb-6 text-xs text-muted-foreground font-light tracking-[0.4em] uppercase">
              Navigation
            </p>
            <ul class="grid gap-x-10 gap-y-3 sm:grid-cols-2">
              <li
                v-for="(item, index) in items"
                :key="item.label"
                class="overflow-hidden"
                :style="{
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(24px)',
                  transition: `all 0.45s cubic-bezier(0.16,1,0.3,1) ${index * 0.07 + 0.2}s`,
                }"
              >
                <div class="flex items-center justify-between">
                  <NuxtLink
                    v-if="item.href"
                    :to="item.href"
                    class="text-xl font-light transition-colors md:text-2xl hover:text-pureWhite"
                    @click="close"
                  >
                    {{ item.label }}
                  </NuxtLink>
                  <span
                    v-else
                    class="text-xl text-foreground font-light md:text-2xl"
                  >
                    {{ item.label }}
                  </span>
                </div>
                <ul v-if="item.submenu" class="mt-2 space-y-1">
                  <li
                    v-for="sub in item.submenu"
                    :key="sub.label"
                    class="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span class="h-px w-5 bg-muted-foreground/40" />
                    <NuxtLink :to="sub.href || '#'" @click="close">
                      {{ sub.label }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>

          <div
            class="border-white/10 bg-white/5 border rounded-2xl p-6"
            :style="{
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.5s ease 0.4s',
            }"
          >
            <p class="mb-4 text-xs text-muted-foreground font-light tracking-[0.35em] uppercase">
              Kontakt
            </p>
            <div class="text-sm text-muted-foreground space-y-3">
              <a :href="`mailto:${contact.email}`" class="text-foreground hover:underline">
                {{ contact.email }}
              </a>
              <a :href="`tel:${contact.phone}`" class="flex items-center gap-2 text-foreground hover:text-pureWhite">
                <Icon name="lucide:phone" class="h-4 w-4" />
                {{ contact.phone }}
              </a>
              <p v-if="contact.address" class="leading-relaxed">
                {{ contact.address }}
              </p>
            </div>
            <button
              type="button"
              class="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground tracking-[0.25em] uppercase transition-colors hover:text-foreground"
              @click="close"
            >
              Schließen
              <Icon name="lucide:chevron-up" class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
