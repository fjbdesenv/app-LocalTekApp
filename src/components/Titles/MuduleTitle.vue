<template>
  <header>
    <h1 class="text-center py-2 title m-0">{{ modulo }}</h1>
  </header>
</template>

<script lang="ts">
import { LocalStorage } from "@/class";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MuduleTitle",
  data: () => ({
    modulo: "",
  }),
  created(){
    const localStorage = new LocalStorage();
    this.modulo = localStorage.modulo;
  }
});
</script>

<style scoped>
.title {
  background: #000;
  color: #fff;
}
</style>
