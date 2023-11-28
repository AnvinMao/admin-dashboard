import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import Icons from '@/components/SvgIcon';

import '@/permission';
import '@/assets/styles/element.scss';
import '@/assets/styles/index.scss';

const app = createApp(App)
  .use(createPinia())
  .use(router)
  .use(Icons)
  .use(ElementPlus);

app.mount('#app');
