<template>
  <div class="booking-sessions">
    <div class="booking-sessions--shorts">
      <BookingSession
        v-for="(session, index) in sessions"
        :key="index"
        :sessionNumber="index + 1"
        :sessionAppointments="session"
        :selectedAppointments="selectedAppointments"
        @select="handleSelect"
      />
    </div>

    <div class="booking-sessions--long">
      <AppointmentCard
        :appointment="longAppointment"
        :selected="selectedAppointments.includes(longAppointment)"
        size="big"
        @select="handleSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { sessions as mockSessions } from '@/data/sessions.ts';
import type { Appointment } from '@/models';
import BookingSession from '@/components/BookingSession.vue';
import AppointmentCard from '@/components/AppointmentCard.vue';
import { ref } from 'vue';

const sessions = ref<Appointment[][]>(mockSessions as Appointment[][]);
const longAppointment: Appointment = {
  id: 111,
  session: 10,
  name: 'Roof Lodge',
  timeStart: '15:00',
  timeEnd: '12:00',
  price: '25000',
  available: true,
};
const selectedAppointments = defineModel<Appointment[]>('selected-appointments', {
  required: true,
});

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
      selectedAppointments.value = [...selectedAppointments.value, newAppointment];
    }
  }
}
</script>

<style scoped lang="scss">
.booking-sessions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;

  &--shorts {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }

  &--long {
    width: 100%;
  }
}
</style>
