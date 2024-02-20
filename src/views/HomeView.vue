<template>
  <b-container
    fluid
    class="d-flex flex-column justify-content-center align-items-center h-100 w-100 p-3"
  >
    <h1 class="mb-3">MÓDULOS</h1>

    <AlertMessage v-if="show" :message="message" :type="type" />

    <b-row class="w-100 align-items-center">
      <b-col v-for="(module, index) in modules" :key="index" cols="auto">
        <b-card
          :title="module.name"
          :img-src="module.img"
          img-height="200px"
          img-width="200px"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="m-2 card-module"
        >
          <router-link class="link" :to="{ name: module.link }">
            <b-card-footer class="card-footer"> Acessar </b-card-footer>
          </router-link>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BContainer, BCol, BRow, BCard, BCardFooter } from "bootstrap-vue-next";
import { modules } from "@/assets/others/modulos";
import { Api, LocalStorage } from "@/class";
import { AxiosError } from "axios";
import { MixinMessage } from "@/mixins";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";

export default defineComponent({
  name: "HomeView",
  data: () => ({
    modules: modules,
  }),
  components: {
    BContainer,
    BCol,
    BRow,
    BCard,
    BCardFooter,
    AlertMessage,
  },
  mixins: [MixinMessage],
  created() {
    const localStorage = new LocalStorage();
    const usuario = localStorage.usuario;

    if (usuario) {
      const api = new Api();

      api.usuario
        .findOne(usuario.codigo)
        .then((res) => {
          const usuariomodulos: string = res.data.modulos;
          const arrayModulos = usuariomodulos.split("|");
          this.modules = this.modules.filter((m) => arrayModulos.includes(m.name));
        })
        .catch((error: AxiosError) => {
          /* Atualiza store */
          this.modules = [];
          this.MSGerrorInternal(error);
        });
    }
  },
});
</script>

<style scoped>
.card-module:hover {
  box-shadow: 1px 1px 1px 1px black;
  color: red;
}
.card-footer {
  background-color: cornflowerblue;
  cursor: pointer;
}

.card-footer:hover {
  background-color: red;
}

.card-module:hover,
.card-module,
.card-footer,
.card-footer:hover {
  transition: all 1s ease-in-out;
}

.link {
  text-decoration: none;
  color: white;
}
</style>
