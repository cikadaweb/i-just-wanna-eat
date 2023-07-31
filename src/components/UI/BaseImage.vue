<script setup lang="ts">
import { computed } from 'vue';

  const props = defineProps({
    imageSrc: {
      type: String,
      required: true,
    },
    imageName: {
      type: String,
      default: 'cafe'
    },
    imageSize: {
      type: String,
    },
    rounded: {
      type: Boolean,
      default: false
    }
  });

  const imagePictureSize = computed(() => {
    if (props.imageSize) {
      return `pt-[${props.imageSize}]`;
    }
    return 'pt-[300px]';
  });

</script>

<template>
  <div class="relative" :class="imagePictureSize">
    <img
      class="absolute top-0 left-0 w-full h-full object-cover"
      :class="rounded ? 'rounded' : ''"
      :src="imageSrc" :alt="`${imageName}-cafe`"
    >
  </div>
</template>