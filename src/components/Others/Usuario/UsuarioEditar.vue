<template>
  <FormUsuario :cadastro="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormUsuario from "@/components/Forms/FormUsuario.vue";

export default defineComponent({
  name: "UsuarioEditar",
  components: {
    FormUsuario,
  },
});
</script>
