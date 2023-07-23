<script setup lang="ts">
import AppDivider from '@/components/divider/AppDivider.vue';
import AppButton from '@/components/button/AppButton.vue';
import AppLabel from '@/components/list/AppLabel.vue';
import AppSpinner from '@/components/loader/AppSpinner.vue';
import AppPicture from '@/components/picture/AppPicture.vue'
// @ts-ignore
import AppShareLinkIcon from '@/assets/icons/share-link.svg?component';

import { ref, computed } from 'vue';
import { useCafesStore } from '@/store/cafes';
import { useCommonStore } from '@/store/common';
import { useRouter } from 'vue-router';

  const emit = defineEmits(['close-modal']);

  defineProps({
    isShowModal: {
      type: Boolean,
      required: true,
    },
  });

  const cafesStore = useCafesStore();
  const commonStore = useCommonStore();

  const router = useRouter();

  const isLinkCopied = ref(false);

  const clickOnButton = () => {
    cafesStore.fetchRandomCafe();
  };

  const closeModal = () => {
    emit('close-modal');
  };

  const goToCafePage = (cafeID: number) => {
    router.push(`/cafe/${cafeID}`);
  };

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

  const cafeBusinessLunch = computed(() => {
    if (cafesStore.getCurrentCafe.business_lunch) {
      return 'Бизнес ланч есть'
    }
    return 'Нет бизнес ланча'
  });

</script>

<template>
  <div
    class="modal p-3 sm:p-7"
    :class="isShowModal ? 'modal_active' : ''"
  >
    <div class="modal__container w-full max-w-xl">
      <div class="modal__header flex justify-between gap-1 text-2xl md:text-3xl font-bold p-6">
        <div>Как насчёт сходить сюда?</div>
        <AppButton
          class="modal__close border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-2xl px-3 py-1 transition duration-300 ease-in-out hover:shadow-lg"
          @click-on-button="closeModal"
        >&#10006;
        </AppButton>
      </div>

      <AppDivider />

      <div class="modal__body text-base md:text-lg p-6">
        
        <div 
          v-if="commonStore.getLoadingStatus"
          class="h-[300px]"
        >
          <AppSpinner/>
        </div>

        <div
          v-else
          class="flex justify-between items-center flex-wrap -mx-4"
        >
          <div class="w-full sm:w-1/2 p-4">
            <AppPicture
              class="cursor-pointer"
              :imageSrc="cafeImg"
              :imageName="cafesStore.getCurrentCafe.name"
              rounded
              @click="goToCafePage(cafesStore.getCurrentCafe.id)" 
            />
          </div>

          <ul class="text-sm w-full sm:w-1/2 p-4">
            <li
              v-if="cafesStore.getCurrentCafe.name" 
              class="flex items-center">
              <AppLabel class="mr-2"/> {{ cafesStore.getCurrentCafe.name }}
            </li>
            <li 
              v-if="cafesStore.getCurrentCafe.address"
              class="mt-2 flex items-center">
              <AppLabel class="mr-2"/>{{ cafesStore.getCurrentCafe.address }}
            </li>
            <li
              v-if="cafesStore.getCurrentCafe.cuisine"
              class="mt-2 flex items-center">
              <AppLabel class="mr-2"/>{{ cafesStore.getCurrentCafe.cuisine }}
            </li>
            <li
              v-if="cafesStore.getCurrentCafe.distance && cafesStore.getCurrentCafe.distance !== 0"
              class="mt-2 flex items-center">
              <AppLabel class="mr-2"/>{{ cafesStore.getCurrentCafe.distance }} м => {{ cafesStore.getCurrentCafe.time }} минут
            </li>
            <li
              v-if="cafesStore.getCurrentCafe.business_lunch"
              class="mt-2 flex items-center">
              <AppLabel class="mr-2"/>{{ cafeBusinessLunch }}
            </li>
          </ul>
        </div>
      </div>

      <AppDivider />

      <div class="modal__footer flex justify-between gap-3 flex-wrap md:flex-nowrap p-6">
        <AppButton
          class="w-full sm:w-auto flex justify-center items-center border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-lg md:text-2xl"
          @click-on-button="clickOnButton"
        >Хочу в другое место
        </AppButton>

        <AppButton
          class="w-full sm:w-auto flex justify-center items-center border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-lg md:text-2xl"
          :class="isLinkCopied ? 'bg-red-500' : ''"
          @click-on-button="copyLinkToShare"
        ><AppShareLinkIcon />
        </AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  overflow-y: auto;

  display: none;
  visibility: hidden;
  opacity: 0;
  transition: opacity 300ms ease-in-out;
}

.modal_active {
  display: flex;
  visibility: visible;
  opacity: 1;
}

.modal__container {
  position: relative;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.10);

  margin: auto;
  cursor: default ;
}
</style>