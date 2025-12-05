// Ensures `shouldHydrate` exists for Pinia during SSR/prerender.
// Some Nuxt/Pinia version combos miss this export, which breaks payload serialization.
import { defineNuxtPlugin } from '#imports'

// Pinia 3+ ships a fixed `shouldHydrate`, so this plugin is a no-op placeholder
// to keep the file around without mutating module imports (which Vite warns on).
export default defineNuxtPlugin(() => {})
