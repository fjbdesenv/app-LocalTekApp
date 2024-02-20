<template>
  <FormCnab :props-cadastro="true" :props-disabled="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormCnab from "@/components/Forms/FormCnab.vue";

export default defineComponent({
  name: "CnabCadastro",
  components: {
    FormCnab,
  },
});
</script>
