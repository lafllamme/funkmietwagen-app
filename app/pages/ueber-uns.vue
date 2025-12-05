<script setup lang="ts">
import { Icon } from '#components'
</script>

<template>
  <main class="flex-1 bg-background">
    <section class="border-white/10 from-black to-black relative overflow-hidden border-b via-[#0b0b0f] bg-gradient-to-b">
      <div class="container relative mx-auto px-4 py-16 md:px-6 md:py-24">
        <div class="mx-auto max-w-4xl text-center space-y-6">
          <p class="text-xs text-muted-foreground font-light tracking-[0.4em] uppercase">
            Über uns
          </p>
          <h1 class="text-4xl text-foreground font-medium tracking-tight font-serif md:text-5xl">
            Persönlich, direkt, verlässlich
          </h1>
          <p class="font-geist text-muted-foreground font-light leading-relaxed tracking-wide md:text-lg">
            Funkmietwagen ADE ist ein inhabergeführter Chauffeurservice. Kurze Wege, klare Absprachen und zwei feste Ansprechpartner, die Ihre Fahrten diskret koordinieren.
          </p>
        </div>
        <div class="grid mt-12 gap-6 md:grid-cols-3">
          <div class="border-white/10 bg-white/5 border rounded-2xl px-5 py-6 text-center">
            <p class="text-3xl text-foreground font-serif">
              Direkter Draht
            </p>
            <p class="font-geist mt-2 text-sm text-muted-foreground font-light">
              Sie sprechen mit den Inhabern – keine Schleifen.
            </p>
          </div>
          <div class="border-white/10 bg-white/5 border rounded-2xl px-5 py-6 text-center">
            <p class="text-3xl text-foreground font-serif">
              Handverlesen
            </p>
            <p class="font-geist mt-2 text-sm text-muted-foreground font-light">
              Fahrzeuge und Chauffeure ausgewählt für Ruhe und Haltung.
            </p>
          </div>
          <div class="border-white/10 bg-white/5 border rounded-2xl px-5 py-6 text-center">
            <p class="text-3xl text-foreground font-serif">
              Planbar
            </p>
            <p class="font-geist mt-2 text-sm text-muted-foreground font-light">
              Verbindliche Zeiten, proaktive Updates, klare Zuständigkeiten.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-pureWhite py-16 text-pureBlack md:py-20">
      <div class="container grid mx-auto gap-10 px-4 lg:grid-cols-2 lg:items-center md:px-6">
        <div class="space-y-6">
          <p class="text-gray-500 text-xs font-light tracking-[0.35em] uppercase">
            Arbeitsweise
          </p>
          <h2 class="text-3xl font-serif md:text-4xl">
            Weniger Versprechen, mehr Verbindlichkeit
          </h2>
          <p class="text-gray-700 font-geist leading-relaxed">
            Jede Fahrt wird von uns persönlich koordiniert: klare Rückmeldungen, dokumentierte Zeiten, kurze Wege. Wir bestätigen Fahrer und Fahrzeug vor Abfahrt und bleiben erreichbar, bis Sie angekommen sind.
          </p>
          <ul class="text-gray-700 space-y-3">
            <li class="flex items-start gap-3">
              <Icon name="lucide:clipboard-check" class="text-black mt-0.5 h-5 w-5" />
              <span>Briefing vorab: Route, Zeiten, Sonderwünsche schriftlich fixiert.</span>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="lucide:bell-ring" class="text-black mt-0.5 h-5 w-5" />
              <span>Proaktive Updates bei Flug- oder Verkehrsänderungen.</span>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="lucide:handshake" class="text-black mt-0.5 h-5 w-5" />
              <span>Verlässliche Erreichbarkeit: Sie sprechen mit den Entscheidern.</span>
            </li>
          </ul>
        </div>
        <div class="border border-gray-8 rounded-3xl border-solid bg-pureWhite p-8 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.4)]">
          <div class="space-y-4">
            <h3 class="text-black text-xl font-serif">
              Für wen wir fahren
            </h3>
            <p class="text-gray-700 leading-relaxed">
              Vorstände, Gäste aus dem Ausland, Hochzeiten, Messe-Teams oder Familien mit viel Gepäck. Wir empfehlen das passende Fahrzeug und halten zusätzliche Kapazität vor, wenn es eng werden könnte.
            </p>
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div class="border-gray-200 bg-gray-50 border rounded-2xl px-4 py-3">
                <p class="font-geist text-sm color-gray-12 font-normal tracking-normal">
                  Einsätze
                </p>
                <p class="text-black text-lg font-serif">
                  Business & privat
                </p>
              </div>
              <div class="border-gray-200 bg-gray-50 border rounded-2xl px-4 py-3">
                <p class="font-geist text-sm color-gray-12 font-normal tracking-normal">
                  Fahrzeuge
                </p>
                <p class="text-black text-lg font-serif">
                  Limousinen & Vans
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-white/10 border-t bg-pureBlack py-16 md:py-20">
      <div class="container mx-auto px-4 md:px-6">
        <div class="mx-auto max-w-4xl">
          <div class="mb-8 text-center">
            <p class="text-xs text-muted-foreground font-light tracking-[0.35em] uppercase">
              FAQ
            </p>
            <h2 class="mt-3 text-3xl text-foreground font-serif md:text-4xl">
              Antworten auf häufige Fragen
            </h2>
            <p class="mt-3 text-muted-foreground font-light">
              Das Wichtigste zu Buchung, Wartezeiten und Sonderwünschen auf einen Blick.
            </p>
          </div>
          <div class="space-y-3">
            <details class="group border-white/10 bg-white/5 hover:border-white/25 border rounded-2xl px-5 py-4 transition-all duration-300">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-foreground">
                <span class="text-sm font-medium tracking-[0.1em] uppercase">Wie lange im Voraus soll ich buchen?</span>
                <Icon name="lucide:chevron-down" class="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
                Ideal sind 24 Stunden, damit wir Monitoring und Fahrerdispo optimal planen. Kurzfristige Fahrten versuchen wir jederzeit möglich zu machen.
              </p>
            </details>

            <details class="group border-white/10 bg-white/5 hover:border-white/25 border rounded-2xl px-5 py-4 transition-all duration-300">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-foreground">
                <span class="text-sm font-medium tracking-[0.1em] uppercase">Wie handhabt ihr Wartezeiten?</span>
                <Icon name="lucide:chevron-down" class="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
                Wir tracken Flüge/Verkehr und passen Abholzeiten an. Übliche Wartefenster sind inklusive; längere Wartezeiten stimmen wir transparent ab.
              </p>
            </details>

            <details class="group border-white/10 bg-white/5 hover:border-white/25 border rounded-2xl px-5 py-4 transition-all duration-300">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-foreground">
                <span class="text-sm font-medium tracking-[0.1em] uppercase">Welche Fahrzeuge und Kapazitäten?</span>
                <Icon name="lucide:chevron-down" class="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
                Business- und First-Class Limousinen (2–4 Personen), Vans (bis 7) und VIP Sprinter/Busse für Gruppen. Wir empfehlen Fahrzeuge passend zu Gepäck und Anlass.
              </p>
            </details>

            <details class="group border-white/10 bg-white/5 hover:border-white/25 border rounded-2xl px-5 py-4 transition-all duration-300">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-foreground">
                <span class="text-sm font-medium tracking-[0.1em] uppercase">Wie kann ich bezahlen?</span>
                <Icon name="lucide:chevron-down" class="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
                Firmenkonten, Kreditkarte oder Vorkasse. Für Stammkunden richten wir gern monatliche Sammelrechnungen ein.
              </p>
            </details>

            <details class="group border-white/10 bg-white/5 hover:border-white/25 border rounded-2xl px-5 py-4 transition-all duration-300">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-foreground">
                <span class="text-sm font-medium tracking-[0.1em] uppercase">Sonderwünsche?</span>
                <Icon name="lucide:chevron-down" class="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
                Mehrsprachige Chauffeure, Kindersitze, stille Fahrt, Briefing für Delegationen, Fahrzeugbranding oder Sicherheitsfahrer – bitte im Formular notieren, wir bestätigen die Umsetzbarkeit.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>

    <section class="py-14 md:py-16">
      <div class="container mx-auto px-4 text-center md:px-6">
        <p class="text-xs text-muted-foreground font-light tracking-[0.35em] uppercase">
          Bereit wenn Sie es sind
        </p>
        <h3 class="mt-3 text-3xl text-foreground font-serif md:text-4xl">
          Lassen Sie uns Ihre nächste Fahrt vorbereiten
        </h3>
        <div class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <NuxtLink
            to="/vorbestellung"
            class="inline-flex items-center gap-3 border border-pureWhite border-solid px-7 py-3 text-sm text-foreground font-light tracking-[0.25em] uppercase transition-all hover:bg-foreground hover:text-background"
          >
            Fahrt anfragen
            <Icon name="lucide:arrow-right" class="h-4 w-4" />
          </NuxtLink>
          <a
            href="tel:+49123456789"
            class="inline-flex items-center gap-2 text-sm text-muted-foreground font-light tracking-[0.2em] uppercase transition-colors hover:text-foreground"
          >
            <Icon name="lucide:phone" class="h-4 w-4" />
            Jetzt anrufen
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
