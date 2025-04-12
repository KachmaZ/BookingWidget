<template>
  <div class="calendar">
    <Datepicker
      v-model="model"
      :multi-calendars="2"
      :inline="true"
      :format="'dd.MM.yyyy'"
      :highlight="[]"
      :enable-time-picker="false"
      @update:model-value="onSelect"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const model = ref(new Date());
const emit = defineEmits<{
  (e: 'select-date', date: string): void;
}>();

function onSelect(date: Date) {
  emit('select-date', new Intl.DateTimeFormat('ru-RU').format(date));
}
</script>

<style scoped lang="scss">
:root {
  --dp-primary-color: #42b983;
  --dp-hover-color: #369870;
}
</style>
