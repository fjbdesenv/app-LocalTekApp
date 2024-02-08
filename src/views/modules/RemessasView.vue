<template>
  <header><h1 class="text-center py-2 title m-0">Remessas</h1></header>

  <b-row class="h-75 m-0">
    <b-col cols="3">
      <MenuRemessa />
    </b-col>
    <b-col cols="9">
      <router-view />
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BCol, BRow } from "bootstrap-vue-next";
import MenuRemessa from "@/components/Menus/MenuRemessa.vue";

export default defineComponent({
  name: "RemessasView",
  components: {
    MenuRemessa,
    BCol,
    BRow,
  },
});
</script>

<style scoped>
.title {
  background: #000;
  color: #fff;
}
</style>
