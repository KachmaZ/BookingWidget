<template>
  <div class="booking-controls">
    <div class="booking-controls__persons">
      <label class="booking-controls__persons--label" for="personsCount">Количество персон: </label>
      <input
        class="booking-controls__persons--input"
        name="personsCount"
        type="number"
        min="1"
        v-model="personsModel"
      />
    </div>
    <div class="booking-controls__date">
      <label class="booking-controls__date--label">Дата: </label>
      <button class="booking-controls__date--input" @click="() => (showCalendar = !showCalendar)">
        {{ dateModel }}
      </button>
      <Calendar
        v-if="showCalendar"
        class="booking-controls__date--calendar"
        @select-date="handleSelectDate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Calendar from '@/components/Calendar.vue';
const personsModel = defineModel('persons', { required: true });
const dateModel = defineModel('date', { required: true });
function handleSelectDate(date: string) {
  dateModel.value = date;
  showCalendar.value = false;
}
const showCalendar = ref(false);
</script>

<style scoped lang="scss">
.booking-controls {
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &__persons {
    &--input {
      width: 50px;
      padding: 4px;

      border: none;
      border-radius: 4px;
    }
  }

  &__date {
    position: relative;
    &--input {
      width: 120px;
      padding: 4px;
    }
    &--calendar {
      position: absolute;
      top: 100%;
      right: 0;
    }
  }
}
</style>
