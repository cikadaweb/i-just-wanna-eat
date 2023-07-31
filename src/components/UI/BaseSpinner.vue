<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  fullscreen: {
    type: Boolean,
    required: false,
  },
});

const spinnerClasses = computed(() => ({
  "spinner_fullscreen": props.fullscreen,
}));
</script>


<template>
  <div class="spinner" :class="spinnerClasses">
    <div class="spinner__overlay" />
    <div class="spinner__icon" />
  </div>
</template>

<style scoped>
.spinner {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
}

.spinner:focus {
  outline: none;
}

.spinner__icon {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  background-size: contain;
  animation: spinnerAnimation 0.6s infinite linear;
  background-image: url("@/assets/icons/spinner-icon.svg");
}

.spinner__overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
}

.spinner_fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

@keyframes spinnerAnimation {
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

</style>