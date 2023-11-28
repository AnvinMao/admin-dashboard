import { defineAsyncComponent } from 'vue';
import type { App, AsyncComponentLoader } from 'vue';

const icons = import.meta.glob('./icons/**/*.vue');

export default {
  install(app: App) {
    for (let [key, value] of Object.entries(icons)) {
      const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
      app.component(name, defineAsyncComponent(value as AsyncComponentLoader))
    }
  }
}