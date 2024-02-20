<template>
  <header>
    <b-row class="w-100 m-0">
      <b-col class="title px-3" cols="3">
        <b-tooltip target="icon-home" triggers="focus"> Página inicial </b-tooltip>
        <router-link :to="{ name: 'Home' }" class="home">
          <BIconHouseFill id="icon-home" />
        </router-link>
      </b-col>
      <b-col class="title" cols="6">
        <h1 class="text-center py-2 m-0">{{ modulo }}</h1>
      </b-col>
      <b-col class="title text-end" cols="3"> Usuário: {{ usuarioNome }} </b-col>
    </b-row>
  </header>
</template>

<script lang="ts">
import { LocalStorage } from "@/class";
import { defineComponent } from "vue";
import { BRow, BCol, BTooltip } from "bootstrap-vue-next";
import { BIconHouseFill } from "bootstrap-icons-vue";

export default defineComponent({
  name: "ModuleTitle",
  data: () => ({
    modulo: "",
    usuarioNome: "",
  }),
  components: {
    BRow,
    BCol,
    BTooltip,
    BIconHouseFill,
  },
  created() {
    const localStorage = new LocalStorage();
    this.modulo = localStorage.modulo;
    this.usuarioNome = localStorage.usuario?.nome;
  },
});
</script>

<style scoped>
.title {
  background: #000;
  color: #fff;
}
.home {
  text-decoration: none;
  font-size: 2rem;
  color: #fff;
}
.home:hover {
  color: #f00;
}
.home,
.home:hover {
  transition: all 1s;
}
</style>
