// @ts-nocheck

import { DirectiveBinding } from 'vue';

const handleDocumentClick = (event: MouseEvent, el: HTMLElement, binding: DirectiveBinding) => {
  if (el && !el.contains(event.target as Node)) {
    binding.value(event);
  }
};

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const documentClickHandler = (event: MouseEvent) => handleDocumentClick(event, el, binding);
    document.addEventListener('click', documentClickHandler);
    el._clickOutside = documentClickHandler;
  },

  unmounted(el: HTMLElement) {
    if (el._clickOutside) {
      document.removeEventListener('click', el._clickOutside);
      delete el._clickOutside;
    }
  },
};
