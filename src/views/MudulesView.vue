<template>
  <b-container
    fluid
    class="d-flex justify-content-center align-items-center h-100 w-100 p-3"
  >
    <b-row class="w-100 align-items-center">
      <b-col v-for="(module, index) in modules" :key="index" cols="4">
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

export default defineComponent({
  name: "NotFoundView",
  data: () => ({
    modules: modules,
  }),
  components: {
    BContainer,
    BCol,
    BRow,
    BCard,
    BCardFooter,
  },
});
</script>

<style scoped>
.card-module:hover {
  box-shadow: 1px 1px 1px 1px black;
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
