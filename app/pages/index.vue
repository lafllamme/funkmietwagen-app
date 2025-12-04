<script setup lang="ts">
import ContactButtons from '@/components/ContactButtons.vue'
import AppFooter from '@/components/layout/Footer.vue'
import AppHeader from '@/components/layout/Header.vue'
import BenefitSection from '@/components/sections/BenefitSection.vue'
import PriceHero from '@/components/sections/PriceHero.vue'
import VehicleShowcase from '@/components/sections/VehicleShowcase.vue'
import ImageSlider from '@/components/ui/ImageSlider.vue'

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

const heroImages = [
  'https://wallpaper.forfun.com/fetch/2c/2c78aac5d291ad657d766200ffb4217e.jpeg',
  'https://i.imgur.com/trCAL0C.jpeg',
  'https://i.imgur.com/ZF11z4H.jpeg',
]
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background">
    <AppHeader />

    <main class="flex-1">
      <section class="relative py-0 lg:py-16 md:py-12 sm:py-8">
        <div class="container mx-auto px-0 md:px-6 sm:px-4">
          <div class="bg-black/80 border-white/10 relative overflow-hidden border rounded-none shadow-[0_40px_120px_-60px_rgba(0,0,0,0.8)] sm:rounded-[30px]">
            <ImageSlider
              :images="heroImages"
              autoplay="6500"
              direction="horizontal"
              overlay-class="bg-gradient-to-b from-black/78 via-black/68 to-black/82"
              image-class="h-full w-full object-cover brightness-[0.75]"
              class="min-h-screen sm:min-h-[70vh]"
            >
              <div class="relative z-10 h-full flex flex-col items-center justify-center px-5 py-16 lg:px-16 md:px-12 sm:px-6 sm:py-16">
                <div class="pointer-events-none absolute inset-0 from-pureBlack/70 via-pureBlack/45 to-transparent bg-gradient-to-t" />
                <div class="relative mx-auto max-w-3xl text-center md:max-w-4xl space-y-5 md:space-y-6">
                  <p class="text-[11px] text-muted-foreground font-light tracking-[0.35em] uppercase md:text-xs md:tracking-[0.4em]">
                    Premium Chauffeur Service
                  </p>
                  <h1 class="text-3xl text-foreground font-medium tracking-tight font-serif lg:text-6xl md:text-5xl">
                    Exzellenz in Bewegung
                  </h1>
                  <p class="mx-auto max-w-2xl text-base color-gray-8 font-light leading-relaxed md:text-lg">
                    Erleben Sie erstklassigen Transferservice mit höchstem Komfort und absoluter Zuverlässigkeit.
                    Kontaktieren Sie uns für Ihre Fahrt.
                  </p>
                  <div class="w-full flex flex-col items-center gap-6 md:gap-8">
                    <div class="max-w-md w-full sm:max-w-none sm:w-auto">
                      <ContactButtons class="w-full sm:w-auto" />
                    </div>
                    <NuxtLink
                      to="/vorbestellung"
                      class="group max-w-xs w-full inline-flex items-center justify-center gap-3 border-b-2 border-pureWhite border-solid pb-2 text-sm text-foreground font-light tracking-widest uppercase transition-all <md:w-fit sm:max-w-none sm:w-auto hover:gap-5"
                    >
                      Fahrt anfragen
                      <Icon name="lucide:arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </ImageSlider>
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
