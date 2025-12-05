<script setup lang="ts">
import type { MainMenuContact, MainMenuLink, MainMenuSocial } from './MainMenu.model'
import { Icon } from '#components'
import { useRoute } from '#imports'
import { onMounted, ref } from 'vue'

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
const route = useRoute()
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

function toggleSubmenu(label: string) {
  activeSubmenu.value = activeSubmenu.value === label ? null : label
}

function isActive(link: MainMenuLink) {
  if (link.href && route.path === link.href)
    return true
  if (link.submenu)
    return link.submenu.some(sub => sub.href === route.path)
  return false
}
</script>

<template>
  <!-- Overlay wird direkt auf body gelegt, nicht im Header -->
  <Teleport v-if="isMounted" to="body">
    <div
      class="fixed inset-0 z-40 transition-all duration-500"
      :class="open ? 'visible' : 'invisible'"
    >
      <!-- Backdrop hinter dem Header, da Header z-50 hat -->
      <div
        class="absolute inset-0 bg-pureBlack/60 transition-opacity"
        :class="open ? 'opacity-100 duration-0' : 'opacity-0 duration-300'"
        @click="close"
      />

      <!-- Sofortige schwarze Fläche unterhalb des Headers, verhindert Durchblitzen -->
      <div
        class="absolute left-0 right-0 bg-pureBlack"
        :style="{
          top: props.offset || '80px',
          bottom: 0,
          opacity: open ? 1 : 0,
          transition: open ? 'opacity 0ms' : 'opacity 0ms 550ms',
        }"
      />

      <!-- Panel: startet unterhalb des Headers -->
      <div
        class="absolute left-0 right-0 bg-pureBlack bg-sky-9 text-foreground shadow-[0_30px_120px_-60px_rgba(255,255,255,0.6)]"
        :style="{
          top: props.offset || '80px', // exakt unter Header
          transform: open ? 'translateY(0)' : 'translateY(-105%)',
          opacity: open ? 1 : 0,
          transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease',
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
                  <NuxtLink
                    v-if="item.href && !item.submenu"
                    :to="item.href"
                    class="group w-full flex items-center justify-between py-3 text-2xl font-light transition-colors md:text-3xl hover:text-pureWhite"
                    :class="isActive(item) ? 'text-pureWhite' : ''"
                    @click="close"
                  >
                    <span>{{ item.label }}</span>
                  </NuxtLink>

                  <button
                    v-else
                    type="button"
                    class="group w-full flex items-center justify-between py-3 text-2xl font-light transition-colors md:text-3xl hover:text-pureWhite"
                    :class="isActive(item) ? 'text-pureWhite' : ''"
                    @click="item.submenu ? toggleSubmenu(item.label) : undefined"
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
                        :class="sub.href === route.path ? 'text-pureWhite border-pureWhite' : ''"
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
                <a
                  :href="`tel:${contact.phone}`"
                  class="flex items-center gap-2 hover:text-pureWhite"
                >
                  <Icon name="lucide:phone" class="h-4 w-4" />
                  <span>{{ contact.phone }}</span>
                </a>
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
