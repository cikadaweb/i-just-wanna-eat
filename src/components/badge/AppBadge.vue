<script setup lang="ts">
const emit = defineEmits(['click-on-badge']);

const clickOnBadge = () => {
  emit('click-on-badge');
};
</script>

<template>
  <div class="px-3 py-3 rounded-full  cursor-pointer transition duration-300 ease-in-out" @click="clickOnBadge">
    <slot />
  </div>
</template>