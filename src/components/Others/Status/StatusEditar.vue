<template>
  <FormStatus :props-cadastro="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormStatus from "@/components/Forms/FormStatus.vue";

export default defineComponent({
  name: "StatusEditar",
  components: {
    FormStatus,
  },
});
</script>
