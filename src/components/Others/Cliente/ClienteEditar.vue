<template>
  <FormCliente :cadastro="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormCliente from "@/components/Forms/FormCliente.vue";

export default defineComponent({
  name: "ClienteEditar",
  components: {
    FormCliente,
  },
});
</script>
