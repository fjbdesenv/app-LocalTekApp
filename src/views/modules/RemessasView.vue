<template>
  <MuduleTitle />

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
import MenuPadrao from "@/components/Menus/MenuPadrao.vue";
import MuduleTitle from "@/components/Titles/MuduleTitle.vue";
import { menuRemessa } from "@/assets/others/menus";
import { MixinModuloClear } from "@/mixins";
import { LocalStorage } from "@/class";
import { MODULOS } from "@/enum";

export default defineComponent({
  name: "RemessasView",
  data: () => ({
    menuRemessa,
  }),
  components: {
    MuduleTitle,
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
