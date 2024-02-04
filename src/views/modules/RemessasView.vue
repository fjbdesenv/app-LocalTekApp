<template>
  <h1 class="text-center">Remessas</h1>
  <MenuRemessa />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuRemessa from "@/components/Menus/MenuRemessa.vue";

export default defineComponent({
  name: "RemessasView",
  components: {
    MenuRemessa,
  },
});
</script>
