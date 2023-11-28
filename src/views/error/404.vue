<script setup lang="ts">
defineOptions({
  name: 'NotFound',
  inheritAttrs: false
});
</script>

<template>
  <div class="content flex-row center-x">
    <img src="@/assets/images/404.svg" />
  </div>
</template>

<style lang="scss" scoped>
.content {
  padding-top: 100px;
  img {
    width: 90%;
    max-width: 540px;
    height: auto;
  }
}
</style>