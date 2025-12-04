<template>
  <header class="sticky top-0 z-50 w-full border-b border-gray-12 border-solid bg-pureBlack/60 backdrop-blur-md supports-[backdrop-filter]:bg-pureBlack/60">
    <div class="container mx-auto h-20 flex items-center justify-between px-4 md:px-6">
      <NuxtLink to="/" class="flex items-center gap-3">
        <div class="h-11 w-11 flex items-center justify-center border-2 border-pureWhite border-solid">
          <span class="text-xl font-semibold tracking-tight font-serif">A</span>
        </div>
        <div class="hidden sm:block">
          <span class="block text-xl text-foreground font-medium tracking-wide font-serif">Funkmietwagen</span>
          <span class="font-geist block text-xs text-muted-foreground tracking-[0.3em] uppercase">ADE</span>
        </div>
      </NuxtLink>

      <nav class="flex items-center gap-3 md:gap-4">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 border border-transparent rounded-full px-4 py-2 text-sm text-muted-foreground font-light tracking-widest uppercase transition-all duration-200 hover:bg-pureWhite hover:text-pureBlack focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pureWhite focus-visible:ring-offset-pureBlack"
        >
          Start
        </NuxtLink>
        <NuxtLink
          to="/impressum"
          class="hidden items-center gap-2 border border-transparent rounded-full px-4 py-2 text-sm text-muted-foreground font-light tracking-widest uppercase transition-all duration-200 xl:inline-flex hover:bg-pureWhite hover:text-pureBlack focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pureWhite focus-visible:ring-offset-pureBlack"
        >
          Impressum
        </NuxtLink>
        <NuxtLink
          to="/datenschutz"
          class="hidden items-center gap-2 border border-transparent rounded-full px-4 py-2 text-sm text-muted-foreground font-light tracking-widest uppercase transition-all duration-200 xl:inline-flex hover:bg-pureWhite hover:text-pureBlack focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pureWhite focus-visible:ring-offset-pureBlack"
        >
          Datenschutz
        </NuxtLink>
        <NuxtLink
          to="/vorbestellung"
          class="inline-flex items-center gap-2 border border-transparent rounded-full px-4 py-2 text-sm text-muted-foreground font-light tracking-widest uppercase transition-all duration-200 hover:bg-pureWhite hover:text-pureBlack focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pureWhite focus-visible:ring-offset-pureBlack"
        >
          Anfragen
        </NuxtLink>
        <a
          href="tel:+49123456789"
          class="flex items-center gap-2 border border-pureWhite border-solid px-5 py-2.5 text-sm text-foreground font-light tracking-widest uppercase transition-all hover:bg-foreground hover:text-background"
        >
          <Icon name="lucide:phone" class="h-4 w-4" />
          <span class="hidden md:inline">Anrufen</span>
        </a>
      </nav>
    </div>
  </header>
</template>
