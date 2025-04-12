<template>
  <div class="booking-container">
    <div class="booking-container__controls">
      <BookingControls v-model:persons="selectedPersonsCount" v-model:date="selectedDate" />
    </div>
    <div class="booking-container__sessions">
      <BookingSessions v-model:selected-appointments="selectedAppointments" />
    </div>
    <button class="booking-container__submit" @click="openModal">Бронировать</button>
    <BookingModal
      v-if="showModal"
      :personsCount="selectedPersonsCount"
      :selected="selectedAppointments"
      @close="showModal = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BookingModal from '@/components/BookingModal.vue';
import type { Appointment } from '@/models';
import BookingSessions from '@/components/BookingSessions.vue';
import BookingControls from '@/components/BookingControls.vue';

const selectedAppointments = ref<Appointment[]>([]);
const selectedDate = ref(
  (() => {
    const today = new Date();
    return new Intl.DateTimeFormat('ru-RU').format(today);
  })(),
);
const showModal = ref(false);
const selectedPersonsCount = ref(1);

function openModal() {
  if (selectedAppointments.value.length === 0) {
    alert('Пожалуйста, выберите сеанс');
  } else {
    showModal.value = true;
  }
}
</script>

<style scoped lang="scss">
* :deep(*) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.booking-container {
  max-width: 720px;
  padding: 16px;
  font-family: sans-serif;
  background: #f5f5f5;
  border-radius: 8px;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &__controls {
    height: 50px;
  }

  &__submit {
    display: block;
    margin: 20px auto 0;
    padding: 8px 16px;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #369870;
    }
  }
}
</style>
