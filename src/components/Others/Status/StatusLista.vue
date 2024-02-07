<template>
  <div class="bg-light h-100 m-3 border rounded-3">
    <ListaDeStatus
      v-show="!loggingIn && !show"
      @deletado="MSGdeletado"
      @naoDeletado="MSGnaoDeletado"
      @erro="MSGerrorInternal"
    />
    <div class="d-flex flex-column align-content-center justify-content-center">
      <AlertMessage class="w-50 mt-5" v-if="show" :message="message" :type="type" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";
import ListaDeStatus from "./Lista.vue";
import { MixinMessage } from "@/mixins";

export default defineComponent({
  name: "StatusLista",
  data: () => ({
    loggingIn: false,
  }),
  components: {
    AlertMessage,
    ListaDeStatus,
  },
  mixins: [MixinMessage],
});
</script>
