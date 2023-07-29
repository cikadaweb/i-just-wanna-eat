<script setup lang="ts">
import AppBadge from '@/components/badge/AppBadge.vue';

import AppDropdownIcon from '@/assets/icons/drop-down.svg';
import AppBusinessIcon from '@/assets/icons/business.svg';
import AppNoBusinessIcon from '@/assets/icons/nobusiness.svg';

import CafeItemDetails from '@/components/cafes/CafeItemDetails.vue';
import AppPicture from '@/components/picture/AppPicture.vue';


import { type PropType, ref, computed } from 'vue';
import { ICafe } from '@/store/cafes.interfaces';
import { useRouter } from 'vue-router';

  const props = defineProps({
    item: {
      type: Object as PropType<ICafe>,
      required: true,
    },
  });
  
  const router = useRouter();

  const isShowDetails = ref(false);

  const toggleCafeDetails = () => {
    isShowDetails.value = !isShowDetails.value;
  };

  const goToCafePage = (cafeID: number) => {
    router.push(`/cafe/${cafeID}`);
  };

  const cafeTime = computed(() => {
    if (props.item.time && props.item.time > 0) {
      return props.item.time
    }
    return 'Неизвестно'
  });

  const cafeImg = computed(() => {
    if(props.item.photo) {
      return props.item.photo
    }
    return 'https://via.placeholder.com/500/FFFFFF/17A2B8/?text=картинка'
  });

  const cafeCusine = computed(() => {
    if (props.item.cuisine) {
      return props.item.cuisine
    }
    return 'Неизвестно'
  });

</script>

<template>
  <div
    class="card relative transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
  >

    <AppPicture
      class="cursor-pointer"
      :imageSrc="cafeImg"
      :imageName="item.name"
      @click="goToCafePage(props.item.id)" 
    />

    <div class="p-3">
      <div class="flex justify-between gap-2 mt-3">
        <span class="text-base sm:text-lg font-bold">{{ cafeTime }} минут</span>
        <AppBadge 
          class="text-base border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
        >{{ cafeCusine }}
        </AppBadge>
      </div>
      <div class="flex justify-between mt-5">
        <span v-if="item.business_lunch"><AppBusinessIcon /></span>
        <span v-else><AppNoBusinessIcon /></span>
        <span v-if="item.price && item.price > 0" class="text-xl font-bold">От {{ item.price }} &#8381;</span>
      </div>
      <div class="text-3xl text-center mt-3">{{ item.name }}</div>
      <div class="flex justify-center items-center mt-3">
        <AppDropdownIcon 
          class="cursor-pointer rounded-full hover:bg-gray-300 transition duration-300 ease-in-out"
          :class="isShowDetails ? 'origin-center rotate-180' : ''"
          @click="toggleCafeDetails"
        />
      </div>
    </div>
    <CafeItemDetails v-if="isShowDetails" :item="item"/>
  </div>
</template>