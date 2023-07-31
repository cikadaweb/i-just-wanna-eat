import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/tailwind.css'
import router from '@/router'
import { createPinia } from "pinia";

import vOutsideClick from './directives/v-outside-click';

const app = createApp(App)

app.directive('outside-click', vOutsideClick);

app.use(createPinia())
app.use(router)
app.mount('#app')
