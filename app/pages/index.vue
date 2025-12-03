<script setup lang="ts">
import ContactButtons from '@/components/ContactButtons.vue'
import AppFooter from '@/components/layout/Footer.vue'
import AppHeader from '@/components/layout/Header.vue'
import BenefitSection from '@/components/sections/BenefitSection.vue'
import PriceHero from '@/components/sections/PriceHero.vue'
import VehicleShowcase from '@/components/sections/VehicleShowcase.vue'

useSeoMeta({
  title: 'Funkmietwagen ADE – Premium Chauffeur Service',
  description:
      'Funkmietwagen ADE – Premium Chauffeur Service für Wien und Umgebung. Stilvolle Transfers, diskrete Fahrer und höchste Zuverlässigkeit für Flughafen, Business und Events.',

  // Open Graph
  ogTitle: 'Funkmietwagen ADE – Premium Chauffeur Service',
  ogDescription:
      'Erstklassige Chauffeur- und Transferdienste mit stilvollen Fahrzeugen, professionellen Fahrern und höchstem Komfort. Reservieren Sie Ihre Fahrt ganz einfach online.',
  ogImage: 'https://i.imgur.com/qWUewqZ.png',
  ogUrl: 'https://funkmietwagen.netlify.app',
  ogType: 'website',

  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: 'Funkmietwagen ADE – Premium Chauffeur Service',
  twitterDescription:
      'Premium Chauffeur Service für Wien & Umgebung – stilvoll, zuverlässig, komfortabel. Jetzt Fahrt reservieren.',
  twitterImage: 'https://i.imgur.com/qWUewqZ.png',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://funkmietwagen.netlify.app',
    },
  ],
  meta: [
    {
      name: 'theme-color',
      content: '#000000',
    },
  ],
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background">
    <AppHeader />

    <main class="flex-1">
      <section class="relative py-24 lg:py-40 md:py-32">
        <div class="container mx-auto px-4 md:px-6">
          <div class="mx-auto max-w-4xl text-center">
            <p class="mb-4 text-xs text-muted-foreground font-light tracking-[0.4em] uppercase">
              Premium Chauffeur Service
            </p>
            <h1 class="mb-6 text-4xl text-foreground font-medium tracking-tight font-serif lg:text-6xl md:text-5xl">
              Exzellenz in Bewegung
            </h1>
            <p class="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground font-light leading-relaxed">
              Erleben Sie erstklassigen Transferservice mit höchstem Komfort und absoluter Zuverlässigkeit.
              Kontaktieren Sie uns für Ihre Fahrt.
            </p>

            <div class="mb-12">
              <ContactButtons />
            </div>

            <NuxtLink
              to="/vorbestellung"
              class="group inline-flex items-center gap-3 border-b-2 border-pureWhite border-solid pb-2 text-sm text-foreground font-light tracking-widest uppercase transition-all hover:gap-5"
            >
              Fahrt reservieren
              <Icon name="lucide:arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </NuxtLink>
          </div>
        </div>
      </section>

      <VehicleShowcase />
      <PriceHero />

      <BenefitSection />

      <section class="py-20 md:py-24">
        <div class="container mx-auto px-4 md:px-6">
          <div class="mx-auto max-w-4xl">
            <p class="mb-4 text-center text-xs text-muted-foreground font-light tracking-[0.4em] uppercase">
              Unsere Leistungen
            </p>
            <h2 class="mb-16 text-center text-3xl text-foreground font-medium font-serif md:text-4xl">
              Maßgeschneiderte Transfers
            </h2>

            <div class="grid gap-8 md:grid-cols-3">
              <div class="border border-border p-8">
                <h3 class="mb-4 text-xl text-foreground font-medium font-serif">
                  Flughafentransfers
                </h3>
                <p class="mb-6 text-sm text-muted-foreground font-light leading-relaxed">
                  Komfortable Transfers zu allen Flughäfen der Region.
                </p>
                <ul class="text-sm text-muted-foreground font-light space-y-2">
                  <li>Köln/Bonn (CGN)</li>
                  <li>Düsseldorf (DUS)</li>
                  <li>Frankfurt (FRA)</li>
                </ul>
              </div>

              <div class="border border-border p-8">
                <h3 class="mb-4 text-xl text-foreground font-medium font-serif">
                  Stundenfahrten
                </h3>
                <p class="text-sm text-muted-foreground font-light leading-relaxed">
                  Flexibel buchbar für Geschäftstermine, Stadtfahrten oder individuelle Touren. Wir stehen Ihnen
                  stundenweise zur Verfügung.
                </p>
              </div>

              <div class="border border-border p-8">
                <h3 class="mb-4 text-xl text-foreground font-medium font-serif">
                  Individuelle Transfers
                </h3>
                <p class="text-sm text-muted-foreground font-light leading-relaxed">
                  Haben Sie einen besonderen Wunsch? Kontaktieren Sie uns für ein maßgeschneidertes Angebot.
                </p>
              </div>
            </div>

            <div class="mt-16 text-center">
              <NuxtLink
                to="/vorbestellung"
                class="inline-flex items-center justify-center border border-foreground bg-foreground px-10 py-4 text-sm text-background font-light tracking-widest uppercase transition-all hover:bg-transparent hover:text-foreground"
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
