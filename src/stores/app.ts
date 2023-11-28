import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const collapse = ref<boolean>(false);
  const device = ref<string>('desktop');
  const size = useStorage('size', 'default');

  const toggleSidebar = () => {
    collapse.value = !collapse.value;
  }

  const closeSidebar = () => {
    collapse.value = true;
  }

  const openSidebar = () => {
    collapse.value = false;
  }

  const toggleDevice = (val: string) => {
    device.value = val;
  }

  const changeSize = (val: string) => {
    size.value = val;
  }

  return {
    collapse,
    device,
    size,
    closeSidebar,
    openSidebar,
    toggleSidebar,
    toggleDevice,
    changeSize
  }
});