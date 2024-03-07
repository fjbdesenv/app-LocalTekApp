<template>
  <b-button
    :id="`btn-load-file-${propsCodigo}`"
    variant="outline-secondary"
    class="mx-2 bg-secondary-subtle"
    @click="propsLoadFile()"
  >
    <BIconCloudDownload />
  </b-button>
  <b-tooltip :target="`btn-load-file-${propsCodigo}`" triggers="focus" placement="bottom">
    Baixar
  </b-tooltip>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BIconCloudDownload } from "bootstrap-icons-vue";
import { BButton, BTooltip } from "bootstrap-vue-next";

export default defineComponent({
  name: "BotoesListaArquivo",
  props: {
    propsCodigo: {
      type: Number,
      required: true,
    },
    propsLoadFile:{
      type: Function,
      required: true
    }
  },
  components: {
    BIconCloudDownload,
    BButton,
    BTooltip,
  },
});
</script>

<style scoped>
.btn:hover {
  color: blue;
  background: #aaa !important;
}
</style>
