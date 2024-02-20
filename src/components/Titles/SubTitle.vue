<template>
  <h3 class="m-2 p-1 text-center rounded-2 border bg-light-subtle">{{ propsTitle }}</h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SubTitle",
  props: {
    propsTitle: {
      type: String,
      required: true,
    },
  },
});
</script>
