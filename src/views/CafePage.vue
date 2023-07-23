<script setup lang="ts">
import AppPicture from '@/components/picture/AppPicture.vue';
import AppBadge from '@/components/badge/AppBadge.vue';
import AppSpinner from '@/components/loader/AppSpinner.vue';
import AppButton from '@/components/button/AppButton.vue';
// @ts-ignore
import AppShareLinkIcon from '@/assets/icons/share-link.svg?component';

import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import { useCommonStore } from '@/store/common';
import { useCafesStore } from '@/store/cafes';

  const cafesStore = useCafesStore();
  const commonStore = useCommonStore();

  const route = useRoute(); 

  cafesStore.fetchCafeByID(route.params.id.toString());

  const isLinkCopied = ref(false);

  const copyLinkToShare = async () => {
    // const urlToCopy = `http://localhost:5173/cafe/${cafesStore.getCurrentCafe.id}`;
    const urlToCopy = `https://elegant-conkies-ef2495.netlify.app/cafe/${cafesStore.getCurrentCafe.id}`;
    try {
      await navigator.clipboard.writeText(urlToCopy);
      isLinkCopied.value = true;
      setTimeout(() => {
        isLinkCopied.value = false;
      }, 3000)
      console.log('Ссылка скопирована в буфер обмена: ' + urlToCopy);
    } catch (error) {
      console.error('Failed to copy link to clipboard:', error);
    }
  };

  const cafeImg = computed(() => {
    if (cafesStore.getCurrentCafe.photo) {
      return cafesStore.getCurrentCafe.photo
    }
    return 'https://via.placeholder.com/500/FFFFFF/17A2B8/?text=картинка'
  });

  const cafeCusine = computed(() => {
    if (cafesStore.getCurrentCafe.cuisine) {
      return cafesStore.getCurrentCafe.cuisine
    }
    return 'Неизвестно'
  });

</script>

<template>
  <div class="cafe-page w-full">

    <div v-if="commonStore.getLoadingStatus">
      <AppSpinner fullscreen/>
    </div>

    <div 
      v-else
      class="cafe-page__body"
    >
      <div class="cafe-page__row flex flex-wrap -mx-4">
        <div class="cafe-list__column w-full sm:w-1/2 p-4">
          <AppPicture :imageSrc="cafeImg" :imageName="cafesStore.getCurrentCafe.name" rounded/>
        </div>
        <div class="cafe-list__column w-full sm:w-1/2 p-4">
          <h1 class="text-5xl">{{ cafesStore.getCurrentCafe.name }}</h1>
          <AppBadge 
            class="inline-block text-base border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white mt-4"
          >{{ cafeCusine }}
          </AppBadge>

          <AppButton
            class="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-lg md:text-2xl mt-4"
            :class="isLinkCopied ? 'bg-red-500' : ''"
            @click-on-button="copyLinkToShare"
          ><AppShareLinkIcon />
          </AppButton>
        </div>
      </div>
      <div class="cafe-page__row flex">
        <div class="cafe-list__column w-full text-lg">
          Добро пожаловать в уютное кафе, где каждый момент превращается в незабываемый опыт. Мы предлагаем изысканное сочетание вкусов и ароматов, которое удовлетворит даже самые изысканные вкусы. Наше кафе приглашает вас насладиться богатством кулинарных традиций со всего мира. От здорового завтрака до изысканных ужинов, наш меню искушает разнообразием блюд, приготовленных с любовью и профессионализмом наших шеф-поваров.

          Атмосфера нашего кафе способствует расслабленному общению и наслаждению каждым моментом. Мы предлагаем комфортные зоны для встреч с друзьями, деловых обедов или уединенных утренних кофе. Дружелюбный персонал сделает все возможное, чтобы ваше посещение было приятным и запоминающимся.

          Приходите к нам в гости, чтобы открыть для себя новые гастрономические грани и насладиться волшебством нашего кафе. Мы всегда рады приветствовать вас и сделать ваш опыт незабываемым. 
        </div>
      </div>
    </div>
  </div>
</template>