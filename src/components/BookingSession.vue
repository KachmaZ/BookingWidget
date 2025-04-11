<template>
  <div class="session">
    <h4 class="session__title">Сеанс {{ sessionNumber }}</h4>
    <div class="session__appointments">
      <AppointmentCard
        v-for="appointment in sessionAppointments"
        :key="appointment.id"
        :appointment="appointment"
        :selected="selectedAppointments.includes(appointment)"
        @select="(appointment) => emit('select', appointment)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppointmentCard from '@/components/AppointmentCard.vue';
import type { Appointment } from '@/models';
defineProps<{
  sessionNumber: number;
  sessionAppointments: Appointment[];
  selectedAppointments: Appointment[];
}>();

const emit = defineEmits<{
  (e: 'select', appointment: Appointment): void;
}>();
</script>

<style scoped lang="scss">
.session {
  &__title {
    text-align: center;
    margin-bottom: 10px;
  }

  &__appointments {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
