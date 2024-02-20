<template>
  <b-button
    v-if="propsDisabled"
    @click="editar()"
    class="m-3"
    type="button"
    variant="success"
  >
    <BIconCheck2Circle class="mx-1" /> Editar
  </b-button>

  <b-button v-else class="m-3" type="submit" variant="success">
    <BIconCheck2Circle class="mx-1" /> Gravar
  </b-button>

  <b-button @click="voltar()" class="m-3" type="button" variant="danger">
    <BIconXCircle class="mx-1" /> Voltar
  </b-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BIconCheck2Circle, BIconXCircle } from "bootstrap-icons-vue";
import { BButton } from "bootstrap-vue-next";

export default defineComponent({
  name: "BotoesForm",
  data: () => ({
    retornaLista: false,
  }),
  components: {
    BIconCheck2Circle,
    BIconXCircle,
    BButton,
  },
  props: {
    propsRouterName: {
      type: String,
      required: true,
    },
    propsDisabled: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    editar() {
      this.$emit("editar");
    },
    voltar() {
      if (this.retornaLista) {
        this.$router.push({ name: this.propsRouterName });
      } else {
        this.$router.back();
      }
    },
  },
  created() {
    const { returnList } = this.$route.query;
    if (returnList === "false") this.retornaLista = false;
  },
  emits: ["editar"],
});
</script>
