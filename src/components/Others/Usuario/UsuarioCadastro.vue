<template>
  <FormUsuario :cadastro="true" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormUsuario from "@/components/Forms/FormUsuario.vue";

export default defineComponent({
  name: "UsuarioCadastro",
  components: {
    FormUsuario,
  },
});
</script>
