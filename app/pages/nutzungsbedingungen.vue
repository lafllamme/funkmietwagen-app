<script setup lang="ts">
import AppFooter from '@/components/layout/Footer.vue'
import AppHeader from '@/components/layout/Header.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">
    <AppHeader />
    <main class="flex-1 py-12 md:py-20">
      <div class="container mx-auto max-w-4xl px-4 space-y-10 md:px-6">
        <div class="space-y-3">
          <p class="text-xs text-muted-foreground tracking-[0.35em] uppercase">
            Rechtliches
          </p>
          <h1 class="text-3xl font-medium font-serif md:text-4xl">
            Nutzungsbedingungen
          </h1>
        </div>

        <div class="text-sm text-muted-foreground leading-relaxed space-y-6">
          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              1. Geltungsbereich
            </h2>
            <p>Diese Bedingungen gelten für die Nutzung unserer Website sowie die Anfrage und Buchung von Chauffeur- und Transferleistungen.</p>
          </section>

          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              2. Anfrage & Angebot
            </h2>
            <p>Anfragen über das Formular sind unverbindlich. Ein Vertrag kommt erst zustande, wenn Sie unser Angebot per E-Mail bestätigen.</p>
          </section>

          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              3. Preise & Zahlung
            </h2>
            <p>Preise werden individuell im Angebot genannt. Zahlungen erfolgen gemäß den dort angegebenen Konditionen (z. B. Rechnung oder vor Ort).</p>
          </section>

          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              4. Stornierung
            </h2>
            <p>Stornierungen sind bis zum im Angebot genannten Zeitpunkt kostenfrei möglich. Danach können Stornogebühren anfallen.</p>
          </section>

          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              5. Pflichten der Fahrgäste
            </h2>
            <p>Bitte behandeln Sie Fahrzeug und Ausstattung pfleglich. Weisungen des Fahrers zur Sicherheit sind zu befolgen.</p>
          </section>

          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              6. Haftung
            </h2>
            <p>Wir haften nur für Vorsatz und grobe Fahrlässigkeit; bei Verletzung wesentlicher Vertragspflichten auch für leichte Fahrlässigkeit, jedoch begrenzt auf vorhersehbare Schäden.</p>
          </section>

          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              7. Höhere Gewalt
            </h2>
            <p>Ereignisse wie extreme Witterung, Streik oder behördliche Anordnungen können zu Anpassungen oder Ausfällen führen. Wir informieren Sie umgehend.</p>
          </section>

          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              8. Datenschutz
            </h2>
            <p>Es gilt unsere Datenschutzerklärung. Personenbezogene Daten werden nur für Angebot, Buchung und Durchführung verarbeitet.</p>
          </section>

          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              9. Schlussbestimmungen
            </h2>
            <p>Es gilt deutsches Recht. Gerichtsstand ist Köln, sofern gesetzlich zulässig. Sollten einzelne Bestimmungen unwirksam sein, bleibt der Vertrag im Übrigen wirksam.</p>
          </section>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
