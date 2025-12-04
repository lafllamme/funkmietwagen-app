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
            Datenschutzerklärung
          </h1>
        </div>

        <div class="text-sm text-muted-foreground leading-relaxed space-y-6">
          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              1. Verantwortlicher
            </h2>
            <p>
              Funkmietwagen ADE<br>
              Musterstraße 1, 50667 Köln<br>
              E-Mail: info@funkmietwagen-ade.de
            </p>
          </section>

          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              2. Erhobene Daten
            </h2>
            <p>
              Wir verarbeiten Kontaktdaten (Name, E-Mail, Telefon), Fahrtdaten (Abhol- und Zieladresse, Datum, Uhrzeit, Fahrzeugwunsch)
              sowie Kommunikationsinhalte aus Ihrem Anfrageformular. Server-Logs (IP-Adresse, Zeitpunkt, User-Agent) werden aus Sicherheitsgründen gespeichert.
            </p>
          </section>

          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              3. Zweck und Rechtsgrundlage
            </h2>
            <p>
              Verarbeitung zur Angebots- und Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO) und zur IT-Sicherheit
              (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              4. Weitergabe
            </h2>
            <p>
              Keine Weitergabe an Dritte außer Auftragsverarbeiter (Hosting, E-Mail-Dienst). Keine Datenübermittlung in Drittländer ohne geeignete Garantien.
            </p>
          </section>

          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              5. Speicherdauer
            </h2>
            <p>
              Angebots- und Vertragsdaten gemäß gesetzlicher Aufbewahrungsfristen (idR 6-10 Jahre). Logdaten max. 30 Tage.
            </p>
          </section>

          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              6. Ihre Rechte
            </h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit sowie Widerspruch gegen Verarbeitung auf Basis berechtigter Interessen.
              Beschwerderecht bei einer Aufsichtsbehörde besteht.
            </p>
          </section>

          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              7. Sicherheit & Tracking
            </h2>
            <p>
              Wir nutzen HTTPS, serverseitige Spam- und Captcha-Prüfungen. Kein Einsatz von Drittanbieter-Tracking für Marketingzwecke.
            </p>
          </section>

          <section class="space-y-1">
            <h2 class="text-foreground font-medium">
              8. Kontakt
            </h2>
            <p>
              Für Datenschutzanliegen wenden Sie sich bitte an info@funkmietwagen-ade.de.
            </p>
          </section>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
