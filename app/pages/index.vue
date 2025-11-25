<script setup lang="ts">
import AppHeader from '@/components/layout/Header.vue'
import AppFooter from '@/components/layout/Footer.vue'
import ContactButtons from '@/components/ContactButtons.vue'

useSeoMeta({ title: 'Funkmietwagen ADE - Premium Chauffeur Service' })
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background">
    <AppHeader />

    <main class="flex-1">
      <section class="relative py-24 md:py-32 lg:py-40">
        <div class="container mx-auto px-4 md:px-6">
          <div class="mx-auto max-w-4xl text-center">
            <p class="mb-4 text-xs font-light uppercase tracking-[0.4em] text-muted-foreground">
              Premium Chauffeur Service
            </p>
            <h1 class="mb-6 font-serif text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Exzellenz in Bewegung
            </h1>
            <p class="mx-auto mb-12 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
              Erleben Sie erstklassigen Transferservice mit höchstem Komfort und absoluter Zuverlässigkeit.
              Kontaktieren Sie uns für Ihre Fahrt.
            </p>

            <div class="mb-12">
              <ContactButtons />
            </div>

            <NuxtLink
              to="/vorbestellung"
              class="group inline-flex items-center gap-3 border-b-2 border-foreground pb-2 text-sm font-light uppercase tracking-widest text-foreground transition-all hover:gap-5"
            >
              Fahrt reservieren
              <Icon name="lucide:arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </NuxtLink>
          </div>
        </div>
      </section>

      <section class="border-y border-border py-20 md:py-24">
        <div class="container mx-auto px-4 md:px-6">
          <p class="mb-12 text-center text-xs font-light uppercase tracking-[0.4em] text-muted-foreground">
            Warum Funkmietwagen ADE
          </p>
          <div class="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="(feature, i) in [
                { icon: 'lucide:clock', title: 'Pünktlichkeit', desc: 'Zuverlässig und immer rechtzeitig' },
                { icon: 'lucide:car', title: 'Komfort', desc: 'Moderne, gepflegte Fahrzeuge' },
                { icon: 'lucide:shield', title: 'Sicherheit', desc: 'Erfahrene professionelle Fahrer' },
                { icon: 'lucide:star', title: 'Exzellenz', desc: 'Erstklassiger persönlicher Service' },
              ]"
              :key="i"
              class="flex flex-col items-center bg-background p-12 text-center"
            >
              <Icon :name="feature.icon" class="mb-6 h-8 w-8 text-foreground" />
              <h3 class="mb-2 font-serif text-lg font-medium text-foreground">{{ feature.title }}</h3>
              <p class="text-sm font-light text-muted-foreground">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 md:py-24">
        <div class="container mx-auto px-4 md:px-6">
          <div class="mx-auto max-w-4xl">
            <p class="mb-4 text-center text-xs font-light uppercase tracking-[0.4em] text-muted-foreground">
              Unsere Leistungen
            </p>
            <h2 class="mb-16 text-center font-serif text-3xl font-medium text-foreground md:text-4xl">
              Maßgeschneiderte Transfers
            </h2>

            <div class="grid gap-8 md:grid-cols-3">
              <div class="border border-border p-8">
                <h3 class="mb-4 font-serif text-xl font-medium text-foreground">Flughafentransfers</h3>
                <p class="mb-6 text-sm font-light leading-relaxed text-muted-foreground">
                  Komfortable Transfers zu allen Flughäfen der Region.
                </p>
                <ul class="space-y-2 text-sm font-light text-muted-foreground">
                  <li>Köln/Bonn (CGN)</li>
                  <li>Düsseldorf (DUS)</li>
                  <li>Frankfurt (FRA)</li>
                </ul>
              </div>

              <div class="border border-border p-8">
                <h3 class="mb-4 font-serif text-xl font-medium text-foreground">Stundenfahrten</h3>
                <p class="text-sm font-light leading-relaxed text-muted-foreground">
                  Flexibel buchbar für Geschäftstermine, Stadtfahrten oder individuelle Touren. Wir stehen Ihnen
                  stundenweise zur Verfügung.
                </p>
              </div>

              <div class="border border-border p-8">
                <h3 class="mb-4 font-serif text-xl font-medium text-foreground">Individuelle Transfers</h3>
                <p class="text-sm font-light leading-relaxed text-muted-foreground">
                  Haben Sie einen besonderen Wunsch? Kontaktieren Sie uns für ein maßgeschneidertes Angebot.
                </p>
              </div>
            </div>

            <div class="mt-16 text-center">
              <NuxtLink
                to="/vorbestellung"
                class="inline-flex items-center justify-center border border-foreground bg-foreground px-10 py-4 text-sm font-light uppercase tracking-widest text-background transition-all hover:bg-transparent hover:text-foreground"
              >
                Jetzt reservieren
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

