<script setup lang="ts">
import CafeItem from '@/components/cafes/CafeItem.vue';

import { useCafesStore } from '@/store/cafes';

  const cafesStore = useCafesStore();
  cafesStore.fetchAllCafes();

</script>

<template>
  <div class="cafe-list">
    <div class="cafe-list__row flex flex-wrap -mx-4">
      <div
        class="cafe-list__column w-full sm:w-1/2 xl:w-1/3 p-4"
        v-for="cafe in cafesStore.getCafesList" :key="cafe.id"
      >
        <CafeItem :item="cafe" />
      </div>
    </div>
  </div>
</template>