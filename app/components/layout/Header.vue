<template>
  <header class="sticky top-0 z-50 w-full border-b border-gray-12 border-solid bg-pureBlack/60 backdrop-blur-md supports-[backdrop-filter]:bg-pureBlack/60">
    <div class="container mx-auto h-20 flex items-center justify-between px-4 md:px-6">
      <NuxtLink to="/" class="flex items-center gap-3">
        <div class="h-11 w-11 flex items-center justify-center border-2 border-pureWhite border-solid">
          <span class="text-xl font-semibold tracking-tight font-serif">A</span>
        </div>
        <div class="hidden sm:block">
          <span class="block text-xl text-foreground font-medium tracking-wide font-serif">Funkmietwagen</span>
          <span class="block text-xs text-muted-foreground tracking-[0.3em] uppercase">ADE</span>
        </div>
      </NuxtLink>

      <nav class="flex items-center gap-6 md:gap-8">
        <NuxtLink
          to="/"
          class="text-sm text-muted-foreground font-light tracking-widest uppercase transition-colors hover:text-foreground"
        >
          Start
        </NuxtLink>
        <NuxtLink
          to="/vorbestellung"
          class="text-sm text-muted-foreground font-light tracking-widest uppercase transition-colors hover:text-foreground"
        >
          Reservieren
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
