<script setup lang="ts">
import type { MainMenuContact, MainMenuLink, MainMenuSocial } from './MainMenu.model'
import { Icon } from '#components'
import { ref } from 'vue'

const props = defineProps<{
  open: boolean
  items: MainMenuLink[]
  contact: MainMenuContact
  social: MainMenuSocial[]
  offset?: string // z B "80px" fuer Headerhoehe
}>()

const emit = defineEmits<{ close: [] }>()

function close() {
  emit('close')
}

const activeSubmenu = ref<string | null>(null)

function toggleSubmenu(label: string) {
  activeSubmenu.value = activeSubmenu.value === label ? null : label
}
</script>

<template>
  <!-- Overlay wird direkt auf body gelegt, nicht im Header -->
  <Teleport to="body">
    <div
      class="fixed inset-0 z-40 transition-all duration-500"
      :class="open ? 'visible' : 'invisible'"
    >
      <!-- Backdrop hinter dem Header, da Header z-50 hat -->
      <div
        class="absolute inset-0 bg-pureBlack/50 backdrop-blur-sm transition-opacity duration-500"
        :class="open ? 'opacity-100' : 'opacity-0'"
        @click="close"
      />

      <!-- Panel: startet unterhalb des Headers -->
      <div
        class="absolute left-0 right-0 bg-pureBlack bg-sky-9 text-foreground shadow-[0_30px_120px_-60px_rgba(255,255,255,0.6)]"
        :style="{
          top: props.offset || '80px', // exakt unter Header
          transform: open ? 'translateY(0)' : 'translateY(-100%)',
          opacity: open ? 1 : 0,
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
        }"
      >
        <div
          class="px-6 pb-10 lg:px-20 md:px-12"
        >
          <div class="grid mx-auto max-w-6xl gap-10 lg:grid-cols-3 lg:gap-16">
            <!-- Navigation Block -->
            <nav class="mt-20 lg:col-span-2">
              <p
                class="mb-6 text-xs text-muted-foreground font-light tracking-[0.4em] uppercase"
                :style="{
                  opacity: open ? 1 : 0,
                  transition: 'opacity 0.4s ease 0.2s',
                }"
              >
                Navigation
              </p>

              <ul class="grid gap-x-12 gap-y-2 md:grid-cols-2">
                <li
                  v-for="(item, index) in items"
                  :key="item.label"
                  :style="{
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.07 + 0.3}s`,
                  }"
                >
                  <button
                    type="button"
                    class="group w-full flex items-center justify-between py-3 text-2xl font-light transition-colors md:text-3xl hover:text-pureWhite"
                    @click="item.submenu ? toggleSubmenu(item.label) : (item.href && $router.push(item.href))"
                  >
                    <span>{{ item.label }}</span>

                    <svg
                      v-if="item.submenu"
                      class="h-5 w-5 transition-transform duration-300"
                      :class="activeSubmenu === item.label ? 'rotate-180' : ''"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <!-- Sub Menu -->
                  <ul
                    v-if="item.submenu"
                    class="overflow-hidden transition-all duration-400"
                    :class="activeSubmenu === item.label ? 'max-h-48 opacity-100 pb-2' : 'max-h-0 opacity-0'"
                  >
                    <li
                      v-for="sub in item.submenu"
                      :key="sub.label"
                    >
                      <NuxtLink
                        :to="sub.href || '#'"
                        class="block border-l-2 border-muted-foreground/40 py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-pureWhite hover:text-pureWhite"
                        @click="close"
                      >
                        {{ sub.label }}
                      </NuxtLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>

            <!-- Kontaktkarte -->
            <div
              class="border-white/10 bg-white/5 border rounded-2xl bg-red-10 p-6"
              :style="{
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.6s ease 0.6s',
              }"
            >
              <p class="mb-4 text-xs text-muted-foreground font-light tracking-[0.35em] uppercase">
                Kontakt aufnehmen
              </p>

              <div class="mb-6 text-sm text-muted-foreground space-y-3">
                <a
                  :href="`mailto:${contact.email}`"
                  class="block text-foreground font-medium hover:underline"
                >
                  {{ contact.email }}
                </a>
                <p class="flex items-center gap-2">
                  <Icon name="lucide:phone" class="h-4 w-4" />
                  <a
                    :href="`tel:${contact.phone}`"
                    class="hover:text-pureWhite"
                  >
                    {{ contact.phone }}
                  </a>
                </p>
                <p
                  v-if="contact.address"
                  class="text-xs leading-relaxed"
                >
                  {{ contact.address }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
