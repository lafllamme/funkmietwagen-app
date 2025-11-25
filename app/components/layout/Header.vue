<template>
  <header class="sticky top-0 z-50 w-full border-b border border-solid border-gray-5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
    <div class="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
      <NuxtLink to="/" class="flex items-center gap-3">
        <div class="flex h-11 w-11 items-center justify-center border-2 border-solid border-pureBlack">
          <span class="font-serif text-xl font-semibold tracking-tight">A</span>
        </div>
        <div class="hidden sm:block">
          <span class="block font-serif text-xl font-medium tracking-wide text-foreground">Funkmietwagen</span>
          <span class="block text-xs uppercase tracking-[0.3em] text-muted-foreground">ADE</span>
        </div>
      </NuxtLink>

      <nav class="flex items-center gap-6 md:gap-8">
        <NuxtLink
          to="/"
          class="text-sm font-light uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          Start
        </NuxtLink>
        <NuxtLink
          to="/vorbestellung"
          class="text-sm font-light uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          Reservieren
        </NuxtLink>
        <a
          href="tel:+49123456789"
          class="flex items-center gap-2 border border-solid border-pureBlack px-5 py-2.5 text-sm font-light uppercase tracking-widest text-foreground transition-all hover:bg-foreground hover:text-background"
        >
          <Icon name="lucide:phone" class="h-4 w-4" />
          <span class="hidden md:inline">Anrufen</span>
        </a>
      </nav>
    </div>
  </header>
</template>
