<template>
  <div class="h-100">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.css";
@import "../node_modules/bootstrap-vue-next/dist/bootstrap-vue-next.css";
</style>
