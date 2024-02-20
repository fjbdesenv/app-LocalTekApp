<template>
  <ModuleTitle />

  <b-row class="h-75 m-0">
    <b-col cols="3">
      <MenuPadrao :menu-itens="menuRemessa" />
    </b-col>

    <b-col cols="9">
      <router-view />
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BCol, BRow } from "bootstrap-vue-next";
import { menuRemessa } from "@/assets/others/menus";
import { MixinModuloClear } from "@/mixins";
import { LocalStorage } from "@/class";
import { MODULOS } from "@/enum";
import MenuPadrao from "@/components/Menus/MenuPadrao.vue";
import ModuleTitle from "@/components/Titles/ModuleTitle.vue";

export default defineComponent({
  name: "RemessasView",
  data: () => ({
    menuRemessa,
  }),
  components: {
    ModuleTitle,
    MenuPadrao,
    BCol,
    BRow,
  },
  mixins: [MixinModuloClear],
  created() {
    const localStorage = new LocalStorage();
    localStorage.modulo = MODULOS.Remessa;
  },
});
</script>
