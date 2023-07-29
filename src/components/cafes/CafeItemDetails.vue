<script setup lang="ts">

import AppLocationIcon from '@/assets/icons/location.svg';
import AppCaloriesIcon from '@/assets/icons/calories.svg';
import AppCompassIcon from '@/assets/icons/compass.svg';

import { type PropType, computed } from 'vue';
import { ICafe } from '@/store/cafes.interfaces.ts';

  const props = defineProps({
    item: {
      type: Object as PropType<ICafe>,
      required: true,
    },
  });
  
  const countCalories = computed(() => Math.floor(props.item.distance * 0.035 * 80));

</script>

<template>
  <ul class="absolute z-10 font-medium text-sm sm:text-md bg-white p-5 w-full scale-105 rounded-md shadow-lg shadow-black/30">
    <li 
      v-if="item.address"
      class="flex items-center justify-between gap-1 mt-2"
    >
      <div>{{ item.address }}</div> <AppLocationIcon class="block" />
    </li>
    <li
      v-if="item.distance"
      class="flex items-center justify-between mt-2">
      <div>{{ countCalories }} Ккал (будет потрачено)</div> <AppCaloriesIcon />
    </li>
    <li
      v-if="item.landmark"
      class="flex items-center justify-between mt-2">
      <div>{{ item.landmark }} </div><AppCompassIcon />
    </li>
    <li
      v-if="!item.address && !item.distance && !item.landmark"
      class="text-xl text-center py-3">
      Дополнительная информация отсуствует
    </li>
  </ul>
</template>