<template>
  <FormCliente :props-cadastro="true" :props-disabled="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormCliente from "@/components/Forms/FormCliente.vue";

export default defineComponent({
  name: "ClienteCadastro",
  components: {
    FormCliente,
  },
});
</script>
