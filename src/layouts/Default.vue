<script setup lang="ts">
import TheHeader from '@/components/header/TheHeader.vue';

</script>

<template>
  <div class="default-layout">
    <TheHeader />
    <main class="container mx-auto p-4">
      <router-view />
    </main>
  </div>
</template>