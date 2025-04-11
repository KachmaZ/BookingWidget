<template>
  <div class="modal-wrapper" @click="emit('close')">
    <div class="modal" @click.stop>
      <h4 class="modal__title">Подтверждение бронирования</h4>
      <div v-for="s in selected" :key="s.id">
        <p>{{ s.name }}: {{ s.timeStart }} — {{ s.timeEnd }} | {{ s.price }} ₽</p>
      </div>
      <hr />

      <p>Количество персон: {{ personsCount }}</p>
      <hr />
      <h3>ИТОГ: {{ selected.reduce((acc, s) => acc + Number(s.price), 0) }} ₽</h3>
      <input class="modal__input" v-model="name" placeholder="Ваше имя" required />
      <input class="modal__input" v-model="phone" placeholder="Телефон" required />
      <button class="modal__submit" @click="submit">Подтвердить</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
defineProps<{ selected: any[]; personsCount: number }>();
const emit = defineEmits<{
  (e: 'close'): void;
}>();

const name = ref('');
const phone = ref('');
function submit() {
  alert(`Бронирование оформлено на ${name.value}, тел: ${phone.value}`);
  emit('close');
}
</script>

<style scoped lang="scss">
.modal {
  background: white;
  padding: 24px;
  border-radius: 8px;

  hr {
    margin: 4px 0;
  }

  &__title {
    margin-bottom: 16px;
    text-align: center;
  }

  &__submit {
    margin-top: 12px;
    width: 100%;
    background: #42b983;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    &:hover {
      background: #369870;
    }
  }
  &__input {
    display: block;
    width: 100%;
    margin-top: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  &-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #0000008f;
  }
}
</style>
