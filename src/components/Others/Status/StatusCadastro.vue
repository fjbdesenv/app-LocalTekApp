<template>
  <FormStatus :props-cadastro="true" :props-disabled="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormStatus from "@/components/Forms/FormStatus.vue";

export default defineComponent({
  name: "StatusCadastro",
  components: {
    FormStatus,
  },
});
</script>
