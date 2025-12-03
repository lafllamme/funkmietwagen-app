<template>
  <footer class="border-t border-border bg-foreground py-16 text-background">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid gap-12 md:grid-cols-4">
        <div>
          <div class="mb-6 flex items-center gap-3">
            <div class="h-11 w-11 flex items-center justify-center border-2 border-pureBlack border-solid">
              <span class="text-xl font-semibold tracking-tight font-serif">A</span>
            </div>
            <div>
              <span class="block text-xl font-medium tracking-wide font-serif">Funkmietwagen</span>
              <span class="block text-xs text-background/60 tracking-[0.3em] uppercase">ADE</span>
            </div>
          </div>
          <p class="text-sm text-background/70 font-light leading-relaxed">
            Ihr exklusiver Partner für erstklassige Chauffeur- und Transferdienste.
          </p>
        </div>

        <div>
          <h3 class="mb-6 text-xs text-background/60 font-light tracking-[0.3em] uppercase">
            Kontakt
          </h3>
          <ul class="text-sm font-light space-y-4">
            <li class="flex items-center gap-3">
              <Icon name="lucide:phone" class="h-4 w-4" />
              <a href="tel:+49123456789" class="transition-colors hover:text-background/80">
                +49 123 456789
              </a>
            </li>
            <li class="flex items-center gap-3">
              <Icon name="lucide:mail" class="h-4 w-4" />
              <a href="mailto:info@funkmietwagen-ade.de" class="transition-colors hover:text-background/80">
                info@funkmietwagen-ade.de
              </a>
            </li>
            <li class="flex items-center gap-3">
              <Icon name="lucide:map-pin" class="h-4 w-4" />
              <span>Musterstraße 1, 50667 Köln</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-6 text-xs text-background/60 font-light tracking-[0.3em] uppercase">
            Services
          </h3>
          <ul class="text-sm text-background/70 font-light space-y-3">
            <li>Flughafentransfers</li>
            <li>Stundenfahrten</li>
            <li>Geschäftsreisen</li>
            <li>Individuelle Transfers</li>
          </ul>
        </div>

        <div>
          <h3 class="mb-6 text-xs text-background/60 font-light tracking-[0.3em] uppercase">
            Rechtliches
          </h3>
          <ul class="text-sm text-background/70 font-light space-y-3">
            <li>
              <NuxtLink to="/impressum" class="transition-colors hover:text-background/90">
                Impressum
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/datenschutz" class="transition-colors hover:text-background/90">
                Datenschutz
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/nutzungsbedingungen" class="transition-colors hover:text-background/90">
                Nutzungsbedingungen
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-16 border-t border-gray-8 border-solid pt-8 text-center text-xs text-background/50 color-gray-11 font-light tracking-widest uppercase">
        © {{ new Date().getFullYear() }} Funkmietwagen ADE
      </div>
    </div>
  </footer>
</template>
