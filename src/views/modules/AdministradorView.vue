<template>
  <ModuleTitle />

  <b-row class="h-75 m-0">
    <b-col cols="3">
      <MenuPadrao :menu-itens="menuAdministrador" />
    </b-col>

    <b-col cols="9">
      <router-view />
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BCol, BRow } from "bootstrap-vue-next";
import { menuAdministrador } from "@/assets/others/menus";
import { MixinModuloClear } from "@/mixins";
import { LocalStorage } from "@/class";
import { MODULOS } from "@/enum";
import MenuPadrao from "@/components/Menus/MenuPadrao.vue";
import ModuleTitle from "@/components/Titles/ModuleTitle.vue";

export default defineComponent({
  name: "AdministradorView",
  data: () => ({
    menuAdministrador,
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
    localStorage.modulo = MODULOS.Administrador;
  },
});
</script>

<style scoped>
.title {
  background: #000;
  color: #fff;
}
</style>
