<script setup lang="ts">
  const emit = defineEmits(['click-on-button']);

  defineProps({
    type: {
      type: String as () => 'button' | 'submit' | 'reset',
      default: 'button',
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  });

  const clickOnButton = () => {
    emit('click-on-button');
  };
</script>

<template>
  <button 
    class="btn"
    :type="type"
    :disabled="disabled"
    @click="clickOnButton"
  >
    <slot />
  </button>
</template>