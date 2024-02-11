<template>
  <FormBanco :cadastro="true" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormBanco from "@/components/Forms/FormBanco.vue";

export default defineComponent({
  name: "BancoCadastro",
  components: {
    FormBanco,
  },
});
</script>
