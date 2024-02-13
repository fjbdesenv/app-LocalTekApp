<template>
  <FormRemessaFinanceira :cadastro="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormRemessaFinanceira from "@/components/Forms/FormRemessaFinanceira.vue";

export default defineComponent({
  name: "RemessaFinanceiraEditar",
  components: {
    FormRemessaFinanceira,
  },
});
</script>
