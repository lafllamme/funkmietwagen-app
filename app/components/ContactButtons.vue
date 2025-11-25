<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
    <a
      href="tel:+49123456789"
      class="group flex items-center justify-center gap-3 border border-solid border-pureWhite bg-foreground px-8 py-4 text-sm font-light uppercase tracking-widest text-background transition-all hover:bg-transparent hover:text-foreground"
    >
      <Icon name="lucide:phone" class="h-4 w-4" />
      +49 123 456789
    </a>

    <a
      href="mailto:info@funkmietwagen-ade.de"
      class="flex items-center justify-center gap-3 border border-solid border-pureWhite bg-transparent px-8 py-4 text-sm font-light uppercase tracking-widest text-foreground transition-all hover:bg-foreground hover:text-background"
    >
      <Icon name="lucide:mail" class="h-4 w-4" />
      E-Mail
    </a>

    <a
      href="https://wa.me/49123456789"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center justify-center gap-3 border border-solid border-pureWhite bg-transparent px-8 py-4 text-sm font-light uppercase tracking-widest text-foreground transition-all hover:bg-foreground hover:text-background"
    >
      <Icon name="lucide:message-circle" class="h-4 w-4" />
      WhatsApp
    </a>
  </div>
</template>
