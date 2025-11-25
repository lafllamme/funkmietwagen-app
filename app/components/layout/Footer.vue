<template>
  <footer class="border-t border-border bg-foreground py-16 text-background">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid gap-12 md:grid-cols-3">
        <div>
          <div class="mb-6 flex items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center border-2 border-solid border-pureBlack">
              <span class="font-serif text-xl font-semibold tracking-tight">A</span>
            </div>
            <div>
              <span class="block font-serif text-xl font-medium tracking-wide">Funkmietwagen</span>
              <span class="block text-xs uppercase tracking-[0.3em] text-background/60">ADE</span>
            </div>
          </div>
          <p class="text-sm font-light leading-relaxed text-background/70">
            Ihr exklusiver Partner für erstklassige Chauffeur- und Transferdienste.
          </p>
        </div>

        <div>
          <h3 class="mb-6 text-xs font-light uppercase tracking-[0.3em] text-background/60">Kontakt</h3>
          <ul class="space-y-4 text-sm font-light">
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
          <h3 class="mb-6 text-xs font-light uppercase tracking-[0.3em] text-background/60">Services</h3>
          <ul class="space-y-3 text-sm font-light text-background/70">
            <li>Flughafentransfers</li>
            <li>Stundenfahrten</li>
            <li>Geschäftsreisen</li>
            <li>Individuelle Transfers</li>
          </ul>
        </div>
      </div>

      <div class="mt-16 border-t border-solid border-gray-8 pt-8 color-gray-11 text-center text-xs font-light uppercase tracking-widest text-background/50">
        © {{ new Date().getFullYear() }} Funkmietwagen ADE
      </div>
    </div>
  </footer>
</template>
