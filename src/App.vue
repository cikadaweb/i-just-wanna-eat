<script setup lang="ts">
import TheHeader from '@/components/header/TheHaeder.vue';
import AppButton from '@/components/button/AppButton.vue';
import CafesList from '@/components/cafes/CafesList.vue';

  const clickOnButton = () => {
    console.log('clickOnButton');
  }

</script>

<template>
  <TheHeader />
  <div class="container mx-auto p-4">
    <AppButton
      class="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-2xl mx-auto my-10 px-8 py-4 transition duration-300 ease-in-out hover:shadow-lg"
      @click-on-button="clickOnButton"
    >Хочу есть!
    </AppButton>
    <CafesList />
  </div>
</template>