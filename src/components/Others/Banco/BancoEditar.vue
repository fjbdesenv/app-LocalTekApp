<template>
  <FormBanco :cadastro="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormBanco from "@/components/Forms/FormBanco.vue";

export default defineComponent({
  name: "BancoEditar",
  components: {
    FormBanco,
  },
});
</script>
