// main.js
import { createApp } from 'vue'
import BookingContainer from '@/components/BookingContainer.vue'

const mountPoint = document.getElementById('booking')
if (mountPoint) {
  createApp(BookingContainer).mount('#booking')
}
