<template>
  <div class="booking-container">
    <div class="booking-container__controls">
      <BookingControls v-model:persons="selectedPersonsCount" v-model:date="selectedDate" />
    </div>
    <div class="booking-container__sessions">
      <div class="booking-container__sessions--shorts">
        <BookingSession
          v-for="(session, index) in sessions"
          :key="index"
          :sessionNumber="index + 1"
          :sessionAppointments="session"
          :selectedAppointments="selectedAppointments"
          @select="handleSelect"
        />
      </div>

      <div class="booking-container__sessions--long">
        <AppointmentCard
          :appointment="longAppointment"
          :selected="selectedAppointments.includes(longAppointment)"
          @select="handleSelect"
        />
      </div>
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
import { sessions as mockSessions } from '@/data/sessions.ts';
import type { Appointment } from '@/models';
import BookingSession from '@/components/BookingSession.vue';
import BookingControls from '@/components/BookingControls.vue';
import AppointmentCard from '@/components/AppointmentCard.vue';

const sessions = ref<Appointment[][]>(mockSessions as Appointment[][]);
const selectedAppointments = ref<Appointment[]>([]);
const selectedDate = ref('2025-04-10');
const showModal = ref(false);
const selectedPersonsCount = ref(1);
const longAppointment: Appointment = {
  id: 111,
  session: 10,
  name: 'Roof Lodge',
  timeStart: '15:00',
  timeEnd: '12:00',
  price: '25000',
  available: true,
};

function handleSelect(newAppointment: Appointment) {
  if (!newAppointment.available) return;

  const isSelected = selectedAppointments.value.includes(newAppointment);
  if (isSelected) {
    selectedAppointments.value = selectedAppointments.value.filter(
      (selectedAppointment) => selectedAppointment.id !== newAppointment.id,
    );
  } else {
    if (
      (selectedAppointments.value.length > 0 &&
        (selectedAppointments.value[0]?.name !== newAppointment.name ||
          Math.abs(newAppointment.session - selectedAppointments.value[0].session) > 1)) ||
      selectedAppointments.value.length > 1 ||
      selectedAppointments.value.includes(longAppointment)
    ) {
      selectedAppointments.value = [newAppointment];
    } else {
      selectedAppointments.value.push(newAppointment);
    }
  }
}

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

  &__sessions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;

    &--shorts {
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }
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
