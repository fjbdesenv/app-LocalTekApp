<template>
  <div >
    <b-nav vertical class="w-25 py-2 bg-black rounded-end-3">
      <b-nav-item>
        <b-button @click="logout()" variant="danger" class="btn-item">
          <BIconPower /> Sair
        </b-button>
      </b-nav-item>
      <b-nav-item v-for="(item, index) in menuRemessaItens" :key="index">
        <router-link :to="{ name: item.link }">
          <b-button class="btn-item"> {{ item.title }} </b-button>
        </router-link>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BNav, BNavItem, BButton } from "bootstrap-vue-next";
import { BIconPower } from "bootstrap-icons-vue";
import { MixinLogout } from "@/mixins";
import { menuRemessaItens } from "@/assets/others/menuRemessaItens";

export default defineComponent({
  name: "MenuRemessa",
  data: () => ({
    menuRemessaItens: menuRemessaItens,
  }),
  components: {
    BNav,
    BNavItem,
    BButton,
    BIconPower,
  },
  mixins: [MixinLogout],
});
</script>

<style scoped>
.btn-item {
  width: 100%;
}
.btn-item:hover {
  color: red;
  background-color: white;
  box-shadow: 1px 1px 1px 1px rgba(255, 255, 255, 0.75);
}

.btn-item,
.btn-item:hover {
  transition: all 1s;
}
</style>
