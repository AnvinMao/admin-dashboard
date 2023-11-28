<script setup lang="ts">
defineProps<{
  collapse: boolean
}>();

const title = import.meta.env.VITE_APP_TITLE;
</script>

<template>
  <div class="logo flex-row center-y">
    <Transition name="logo-fade">
      <RouterLink v-if="collapse" to="/">
        <img src="@/assets/images/logo.png" />
      </RouterLink>
      <RouterLink v-else to="/" class="flex-row center-y">
        <img src="@/assets/images/logo.png" />
        <span class="title">{{ title }}</span>
      </RouterLink>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.logo-fade-enter-active {
  transition: opacity 1s;
}
.logo-fade-leave-active, .logo-fade-enter-from, .logo-fade-leave-to {
  opacity: 0;
}
.logo {
  height: 83px;
  width: 100%;
  color: #FFFFFF;
  font-weight: 600;
  line-height: 1.2;
  padding-left: 18px;
  img {
    width: 20px;
    height: auto;
  }
  .title {
    padding: 0 24px 0 10px;
  }
}
</style>