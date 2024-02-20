<template>
  <FormCnab :props-cadastro="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormCnab from "@/components/Forms/FormCnab.vue";

export default defineComponent({
  name: "CnabEditar",
  components: {
    FormCnab,
  },
});
</script>
