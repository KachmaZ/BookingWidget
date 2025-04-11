<template>
  <div
    class="session-card"
    :class="{ selected, unavailable: !appointment.available }"
    @click="emit('select', appointment)"
  >
    <h4 class="session-card__time">{{ appointment.timeStart }} - {{ appointment.timeEnd }}</h4>
    <div>
      {{ appointment.name }} - {{ appointment.available ? `${appointment.price} ₽` : 'Недоступно' }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Appointment } from '@/models';

defineProps<{ appointment: Appointment; selected: boolean }>();
const emit = defineEmits<{
  (e: 'select', appointment: Appointment): void;
}>();
</script>

<style scoped lang="scss">
.session-card {
  width: 230px;

  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 12px;
  background: white;
  cursor: pointer;
  transition: 0.2s ease;

  &.unavailable {
    background: #eee;
    color: #999;
    cursor: not-allowed;
  }
  &.selected {
    border-color: #42b983;
    background: #f0fff7;
  }

  &__time {
    margin: 0 0 10px;
  }
}
</style>
