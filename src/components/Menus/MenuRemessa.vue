<template>
  <b-nav vertical class="py-2 menu">
    <b-nav-item>
      <b-button @click="logout()" variant="danger" class="btn-item logout">
        <BIconPower /> Sair
      </b-button>
    </b-nav-item>
    <b-nav-item v-for="(item, index) in menuRemessaItens" :key="index">
      <router-link :to="{ name: item.link }">
        <b-button class="btn-item"> {{ item.title }} </b-button>
      </router-link>
    </b-nav-item>
  </b-nav>
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
.menu {
  background-color: gray;
}
.btn-item {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
}
.btn-item:hover {
  color: red;
  background-color: white;
}

.btn-item,
.btn-item:hover {
  transition: all 1s;
}

.logout {
  background-color: rgba(255, 0, 0, 0.75);
}
</style>
