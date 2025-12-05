<script setup lang="ts">
import type { MainMenuContact, MainMenuLink, MainMenuSocial } from './MainMenu.model'
import { Icon } from '#components'
import { ref, watch } from 'vue'

const props = defineProps<{
  open: boolean
  items: MainMenuLink[]
  contact: MainMenuContact
  social: MainMenuSocial[]
  offset?: string // optional: nutzt du gleich für padding-top
}>()

const emit = defineEmits<{ close: [] }>()

function close() {
  emit('close')
}

const activeSubmenu = ref<string | null>(null)

function toggleSubmenu(label: string) {
  activeSubmenu.value = activeSubmenu.value === label ? null : label
}

// Body Scroll sperren, wenn Menü offen
watch(
  () => props.open,
  (isOpen) => {
    if (process.client)
      document.body.style.overflow = isOpen ? 'hidden' : ''
  },
)
</script>

<template>
  <!-- 1:1 wie React: fixed inset-0, z-40, sichtbar/unsichtbar über visibility -->
  <div
    class="fixed inset-0 z-40 transition-all duration-500"
    :class="open ? 'visible' : 'invisible'"
  >
    <!-- Backdrop: dunkelt die Seite, Header liegt mit z-50 darüber -->
    <div
      class="absolute inset-0 bg-pureBlack/50 backdrop-blur-sm transition-opacity duration-500"
      :class="open ? 'opacity-100' : 'opacity-0'"
      @click="close"
    />

    <!-- Panel: top:0, slidet von -100% rein → wirkt wie unter dem Header,
         weil der Header darüber liegt -->
    <div
      class="absolute left-0 right-0 top-0 bg-pureBlack text-foreground shadow-[0_30px_120px_-60px_rgba(0,0,0,0.7)]"
      :style="{
        transform: open ? 'translateY(0)' : 'translateY(-100%)',
        opacity: open ? 1 : 0,
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
      }"
    >
      <!-- Innenabstand: orientiert am React pt-24,
           du kannst hier props.offset nutzen, wenn du genau 80px willst -->
      <div
        class="px-6 pb-10 lg:px-20 md:px-12"
        :style="{ paddingTop: props.offset || '96px' }"
      >
        <div class="grid mx-auto max-w-6xl gap-10 lg:grid-cols-3 lg:gap-16">
          <!-- Navigation Block -->
          <nav class="lg:col-span-2">
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
                <!-- Hauptzeile -->
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

                <!-- Untermenü -->
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
            class="border-white/10 bg-white/5 border rounded-2xl p-6"
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

            <div class="flex gap-4">
              <a
                v-for="link in social"
                :key="link.label"
                :href="link.href"
                class="border-white/20 h-10 w-10 flex items-center justify-center border rounded-full bg-pureBlack/40 text-xs text-muted-foreground font-medium transition-all hover:border-pureWhite hover:bg-pureWhite hover:text-pureBlack"
              >
                {{ link.label.charAt(0) }}
              </a>
            </div>

            <button
              type="button"
              class="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground tracking-[0.25em] uppercase transition-colors hover:text-foreground"
              @click="close"
            >
              Schliessen
              <Icon name="lucide:chevron-up" class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
