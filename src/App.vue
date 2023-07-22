<script setup lang="ts">
import TheHeader from '@/components/header/TheHeader.vue';
import AppButton from '@/components/button/AppButton.vue';
import AppDivider from '@/components/divider/AppDivider.vue';
import CafesList from '@/components/cafes/CafesList.vue';
import AppModal from '@/components/modal/AppModal.vue';

import scrollController from '@/utils/modal-scroll';

import { ref, watch, onBeforeUnmount, Ref } from 'vue';
import { useCafesStore } from '@/store/cafes';


  const cafesStore = useCafesStore();

  const clickOnButton = () => {
    cafesStore.fetchRandomCafe();
    isShowModal.value = true;
  };

const modalRef: Ref<HTMLElement | null> = ref(null);
  const isShowModal = ref(false);

  const closeModal = () => {
    isShowModal.value = false;
  };
  
  const handleOutsideModalClick = (event: MouseEvent | KeyboardEvent) => {
  if (modalRef.value !== null) {
    // @ts-ignore
    const modal = modalRef.value.$el;
    if (modal && ((event instanceof KeyboardEvent && event.code === 'Escape') || event.target === modal)) {
      closeModal();
    }
  }
  }

  watch(isShowModal, (value: boolean) => {
    if (value) {
      scrollController.disabledScroll();
      document.addEventListener('click', handleOutsideModalClick);
      window.addEventListener('keydown', handleOutsideModalClick);
    } else {
      scrollController.enabledScroll();
      document.removeEventListener('click', handleOutsideModalClick);
      window.removeEventListener('keydown', handleOutsideModalClick);
    }
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleOutsideModalClick);
    document.removeEventListener('keydown', handleOutsideModalClick);
  });

</script>

<template>
  <TheHeader />
  <div class="container mx-auto p-4">
    <AppButton
      class="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-2xl mx-auto my-10 px-8 py-4 transition duration-300 ease-in-out hover:shadow-lg"
      @click-on-button="clickOnButton"
    >Хочу есть!
    </AppButton>

    <AppDivider />

    <CafesList class="mt-5"/>

    <AppModal
      :isShowModal="isShowModal"
      @close-modal="closeModal"
      ref="modalRef"
    />

  </div>
</template>