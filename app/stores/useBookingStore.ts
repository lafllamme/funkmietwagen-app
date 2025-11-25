import { defineStore } from 'pinia'

interface BookingFormState {
  submitted: boolean
}

export const useBookingStore = defineStore('booking', {
  state: (): BookingFormState => ({
    submitted: false,
  }),
  actions: {
    markSubmitted() {
      this.submitted = true
    },
    reset() {
      this.submitted = false
    },
  },
})
