<script setup lang="ts">
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
  useFilter,
} from 'reka-ui'
import { computed, ref, watch } from 'vue'
import AppFooter from '@/components/layout/Footer.vue'
import AppHeader from '@/components/layout/Header.vue'
import UiInput from '@/components/ui/Input.vue'
import UiLabel from '@/components/ui/Label.vue'
import UiTextarea from '@/components/ui/Textarea.vue'
import { useBookingStore } from '@/stores/useBookingStore'

const FORM_HEADERS = { 'Content-Type': 'application/json' }
const FORM_ACTION = '/api/contact'
const FORM_METHOD = 'POST'
const ERROR_MESSAGE
  = 'Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.'

interface DestinationOption {
  code: string
  label: string
}

const destinationOptions: DestinationOption[] = [
  { code: 'cgn', label: 'Flughafen Köln/Bonn (CGN)' },
  { code: 'dus', label: 'Flughafen Düsseldorf (DUS)' },
  { code: 'fra', label: 'Flughafen Frankfurt (FRA)' },
  { code: 'hourly', label: 'Stundenfahrt' },
  { code: 'other', label: 'Anderes Ziel' },
]

const store = useBookingStore()
const { markSubmitted } = store
const submitted = computed(() => store.submitted)
const formRef = useTemplateRef('formRef')

const sending = ref(false)
const errorMessage = ref('')
const destinationValue = ref<DestinationOption | null>(null)
const destinationInput = ref('')
const destinationCode = ref('')
const { contains } = useFilter({ sensitivity: 'base' })

const customDestinations = ref<DestinationOption[]>([])
const allDestinations = computed(() => [
  ...destinationOptions,
  ...customDestinations.value,
])
const trimmedDestinationInput = computed(() => destinationInput.value.trim())

const filteredDestinations = computed(() =>
  allDestinations.value.filter(option => contains(option.label, destinationInput.value)),
)

const hasExactDestination = computed(() =>
  !!trimmedDestinationInput.value
  && allDestinations.value.some(option => option.label.toLowerCase() === trimmedDestinationInput.value.toLowerCase()),
)

function toSlug(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'ziel'
}

function buildCustomDestination(label: string): DestinationOption {
  const normalized = label.trim()
  return {
    code: `custom-${toSlug(normalized)}`,
    label: normalized,
  }
}

function ensureCustomDestination(label: string) {
  if (!label.trim() || hasExactDestination.value)
    return

  const normalized = label.trim()
  const exists = allDestinations.value.some(
    option => option.label.toLowerCase() === normalized.toLowerCase(),
  )
  if (exists)
    return

  customDestinations.value.push(buildCustomDestination(normalized))
}

const customDestinationOption = computed(() => {
  if (!trimmedDestinationInput.value || hasExactDestination.value)
    return null
  return buildCustomDestination(trimmedDestinationInput.value)
})

function handleDestinationEnter(event: KeyboardEvent) {
  if (customDestinationOption.value && !filteredDestinations.value.length) {
    event.preventDefault()
    destinationValue.value = customDestinationOption.value
  }
}

watch(destinationValue, (val) => {
  if (!val) {
    destinationCode.value = ''
    return
  }

  destinationInput.value = val.label
  destinationCode.value = val.code
  ensureCustomDestination(val.label)
})

watch(destinationInput, (val) => {
  if (!val) {
    destinationValue.value = null
    destinationCode.value = ''
    return
  }

  const selectedLabel = destinationValue.value?.label || ''
  if (selectedLabel === val)
    return

  destinationValue.value = null
  destinationCode.value = ''
})

function toFormBody(form: HTMLFormElement) {
  const formData = new FormData(form)
  return JSON.stringify(Object.fromEntries(formData.entries()))
}

async function onSubmit() {
  if (!formRef.value) {
    console.warn('[Form] No form ref found, aborting submit')
    return
  }
  sending.value = true
  errorMessage.value = ''

  // Prepare form data and send it to Netlify
  const bodyContent = toFormBody(formRef.value)
  console.info('[Form] Sending form data to', FORM_ACTION, 'payload:', bodyContent)

  try {
    const response = await fetch(FORM_ACTION, {
      method: FORM_METHOD,
      headers: FORM_HEADERS,
      body: bodyContent,
    })
    console.info('[Form] Received response', response.status, response.statusText)

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`[Form] Failed with status ${response.status}: ${text}`)
    }
    console.info('[Form] Submission accepted by Netlify')
    markSubmitted()
  }
  catch (error) {
    console.error(error)
    errorMessage.value = ERROR_MESSAGE
  }
  finally {
    console.info('[Form] Submit finished')
    sending.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background">
    <AppHeader />

    <main class="flex-1 py-12 md:py-20">
      <div class="container mx-auto px-4 md:px-6">
        <div v-if="submitted" class="min-h-[60vh] flex flex-col items-center justify-center py-24 text-center">
          <div class="mb-8 flex justify-center">
            <div class="h-20 w-20 flex items-center justify-center border-2 border-gray-5 border-solid">
              <Icon name="lucide:check" class="h-8 w-8 text-foreground" />
            </div>
          </div>
          <h2 class="mb-4 text-3xl text-foreground font-medium font-serif">
            Anfrage erhalten
          </h2>
          <p class="mb-8 text-muted-foreground font-light">
            Vielen Dank für Ihre Anfrage. Wir werden uns schnellstmöglich bei Ihnen melden.
          </p>
          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center border border-gray-5 border-solid bg-foreground px-8 py-4 text-sm text-background font-light tracking-widest uppercase transition-all hover:bg-transparent hover:text-foreground"
          >
            Zur Startseite
          </NuxtLink>
        </div>

        <div v-else>
          <div class="mb-12">
            <NuxtLink
              to="/"
              class="inline-flex items-center gap-2 text-sm text-muted-foreground font-light tracking-widest uppercase transition-colors hover:text-foreground"
            >
              <Icon name="lucide:arrow-left" class="h-4 w-4" />
              Zurück
            </NuxtLink>
          </div>

          <div class="mx-auto max-w-5xl">
            <div class="mb-16 text-center">
              <p class="mb-4 text-xs text-muted-foreground font-light tracking-[0.4em] uppercase">
                Reservierung
              </p>
              <h1 class="mb-4 text-3xl text-foreground font-medium font-serif md:text-5xl">
                Fahrt anfragen
              </h1>
              <p class="text-muted-foreground font-light">
                Teilen Sie uns Ihre Wünsche mit und erhalten Sie ein individuelles Angebot.
              </p>
            </div>

            <div class="grid gap-12 lg:grid-cols-3">
              <div class="lg:col-span-1">
                <div class="sticky top-28 border border-gray-5 border-solid p-8">
                  <h3 class="mb-6 text-xs text-muted-foreground font-light tracking-[0.3em] uppercase">
                    Preisübersicht
                  </h3>

                  <div class="mb-8">
                    <h4 class="mb-4 text-lg text-foreground font-medium font-serif">
                      Flughafentransfers
                    </h4>
                    <p class="mb-4 text-xs text-muted-foreground">
                      Ab Köln
                    </p>
                    <ul class="text-sm space-y-3">
                      <li class="flex justify-between font-light">
                        <span class="text-muted-foreground">Köln/Bonn</span>
                        <span class="text-foreground">ab 45 €</span>
                      </li>
                      <li class="flex justify-between font-light">
                        <span class="text-muted-foreground">Düsseldorf</span>
                        <span class="text-foreground">ab 85 €</span>
                      </li>
                      <li class="flex justify-between font-light">
                        <span class="text-muted-foreground">Frankfurt</span>
                        <span class="text-foreground">ab 149 €</span>
                      </li>
                    </ul>
                  </div>

                  <div class="border-t border-gray-5 border-solid pt-6">
                    <h4 class="mb-4 text-lg text-foreground font-medium font-serif">
                      Stundenfahrt
                    </h4>
                    <p class="text-sm text-muted-foreground font-light">
                      ab 55 € / Stunde
                      <br>
                      <span class="text-xs">(mind. 2 Stunden)</span>
                    </p>
                  </div>

                  <div class="mt-8 border-t border-gray-5 border-solid pt-6">
                    <p class="text-xs text-muted-foreground font-light">
                      Die Preise sind Richtwerte. Ihr individuelles Angebot erhalten Sie nach der Anfrage.
                    </p>
                  </div>
                </div>
              </div>

              <div class="lg:col-span-2">
                <form
                  ref="formRef"
                  class="space-y-8"
                  :method="FORM_METHOD"
                  :action="FORM_ACTION"
                  @submit.prevent="onSubmit"
                >
                  <div class="border border-gray-5 border-solid p-8">
                    <h3 class="mb-6 text-xs text-muted-foreground font-light tracking-[0.3em] uppercase">
                      Persönliche Daten
                    </h3>
                    <div class="grid gap-6 sm:grid-cols-2">
                      <div class="space-y-2">
                        <UiLabel for="name">
                          Name *
                        </UiLabel>
                        <UiInput id="name" name="name" required placeholder="Ihr vollständiger Name" />
                      </div>
                      <div class="space-y-2">
                        <UiLabel for="phone">
                          Telefon *
                        </UiLabel>
                        <UiInput id="phone" name="phone" type="tel" required placeholder="+49 123 456789" />
                      </div>
                    </div>
                    <div class="mt-6 space-y-2">
                      <UiLabel for="email">
                        E-Mail *
                      </UiLabel>
                      <UiInput id="email" name="email" type="email" required placeholder="ihre.email@beispiel.de" />
                    </div>
                  </div>

                  <div class="border border-gray-5 border-solid p-8">
                    <h3 class="mb-6 text-xs text-muted-foreground font-light tracking-[0.3em] uppercase">
                      Fahrtdetails
                    </h3>

                    <div class="space-y-6">
                      <div class="space-y-2">
                        <UiLabel for="pickup">
                          Abholadresse *
                        </UiLabel>
                        <UiInput id="pickup" name="pickup" required placeholder="Straße, Hausnummer, PLZ, Ort" />
                      </div>

                      <div class="space-y-2">
                        <UiLabel for="destination">
                          Ziel *
                        </UiLabel>
                        <ComboboxRoot
                          v-model="destinationValue"
                          :ignore-filter="true"
                          :open-on-click="true"
                          :open-on-focus="true"
                          class="relative w-full focus-visible:outline-none"
                        >
                          <ComboboxAnchor class="relative block w-full">
                            <ComboboxInput
                              id="destination"
                              v-model="destinationInput"
                              name="destination"
                              required
                              placeholder="Ziel eingeben oder wählen"
                              :display-value="val => (val ? val.label : '')"
                              class="h-11 w-full border rounded-sm border-solid bg-transparent px-3 py-2 pr-10 text-base text-foreground font-light outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-pureWhite"
                              @keydown.enter="handleDestinationEnter"
                            />
                            <ComboboxTrigger
                              class="absolute right-3 top-1/2 text-muted-foreground -translate-y-1/2"
                              aria-label="Ziel auswählen"
                            >
                              <Icon name="lucide:chevron-down" class="h-4 w-4" />
                            </ComboboxTrigger>
                          </ComboboxAnchor>

                          <ComboboxPortal>
                            <ComboboxContent
                              class="z-50 mt-2 rounded-sm bg-background shadow-lg ring-2 ring-pureWhite"
                              position="popper"
                              side="bottom"
                              :side-offset="4"
                              :side-flip="false"
                              :style="{
                                width: 'var(--reka-combobox-trigger-width)',
                                minWidth: 'var(--reka-combobox-trigger-width)',
                              }"
                            >
                              <ComboboxViewport>
                                <ComboboxItem
                                  v-for="option in filteredDestinations"
                                  :key="option.code"
                                  :value="option"
                                  :text-value="option.label"
                                  class="cursor-pointer rounded-sm px-3 py-2 text-sm text-foreground data-[highlighted]:bg-gray-11 hover:bg-gray-11"
                                >
                                  <div class="flex items-center gap-2">
                                    <ComboboxItemIndicator class="text-foreground">
                                      <Icon name="lucide:check" class="h-4 w-4" />
                                    </ComboboxItemIndicator>
                                    <span>{{ option.label }}</span>
                                  </div>
                                </ComboboxItem>
                                <ComboboxItem
                                  v-if="customDestinationOption && !filteredDestinations.length"
                                  :key="customDestinationOption.code"
                                  :value="customDestinationOption"
                                  :text-value="customDestinationOption.label"
                                  class="cursor-pointer rounded-sm px-3 py-2 text-sm text-foreground data-[highlighted]:bg-gray-11 hover:bg-gray-11"
                                >
                                  <div class="flex items-center gap-2">
                                    <Icon name="lucide:plus" class="size-4 text-muted-foreground" />
                                    <span>{{ customDestinationOption.label }} hinzufügen</span>
                                  </div>
                                </ComboboxItem>
                                <div v-else-if="!filteredDestinations.length" class="px-3 py-2 text-sm text-muted-foreground">
                                  Keine Treffer
                                </div>
                              </ComboboxViewport>
                            </ComboboxContent>
                          </ComboboxPortal>
                        </ComboboxRoot>
                        <input type="hidden" name="destinationCode" :value="destinationCode">
                        <input type="hidden" name="destinationLabel" :value="destinationInput">
                      </div>

                      <div class="grid gap-6 sm:grid-cols-2">
                        <div class="space-y-2">
                          <UiLabel for="date">
                            Datum *
                          </UiLabel>
                          <UiInput id="date" name="date" type="date" required />
                        </div>
                        <div class="space-y-2">
                          <UiLabel for="time">
                            Uhrzeit *
                          </UiLabel>
                          <UiInput id="time" name="time" type="time" required />
                        </div>
                      </div>

                      <div class="space-y-2">
                        <UiLabel for="passengers">
                          Passagiere *
                        </UiLabel>
                        <select
                          id="passengers"
                          name="passengers"
                          required
                          class="h-11 w-full border border-solid bg-transparent px-3 py-2 text-base text-foreground font-light outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="" disabled selected hidden>
                            Bitte wählen
                          </option>
                          <option value="1">
                            1 Person
                          </option>
                          <option value="2">
                            2 Personen
                          </option>
                          <option value="3">
                            3 Personen
                          </option>
                          <option value="4">
                            4 Personen
                          </option>
                          <option value="5">
                            5 Personen
                          </option>
                          <option value="6">
                            6 Personen
                          </option>
                          <option value="7+">
                            7+ Personen
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="border border-gray-5 border-solid p-8">
                    <h3 class="mb-6 text-xs text-muted-foreground font-light tracking-[0.3em] uppercase">
                      Anmerkungen
                    </h3>
                    <UiTextarea
                      id="notes"
                      name="notes"
                      rows="4"
                      placeholder="z.B. Kindersitz benötigt, Rückfahrt gewünscht, besondere Anforderungen..."
                    />
                  </div>

                  <button
                    type="submit"
                    :disabled="sending"
                    class="w-full flex items-center justify-center gap-3 border border-foreground bg-foreground px-8 py-5 text-sm text-background font-light tracking-widest uppercase transition-all hover:bg-transparent hover:text-foreground"
                  >
                    <Icon name="lucide:send" class="h-4 w-4" />
                    {{ sending ? 'Wird gesendet...' : 'Anfrage senden' }}
                  </button>

                  <p v-if="errorMessage" class="text-red-500 text-center text-sm font-light">
                    {{ errorMessage }}
                  </p>
                  <p class="text-center text-xs text-muted-foreground font-light">
                    Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>
