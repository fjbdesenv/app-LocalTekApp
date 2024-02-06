<template>
  <div class="bg-light h-100 m-3 border rounded-3">
    <ListaDeStatus
      v-if="!loggingIn && !show"
      @deletado="deletado"
      @naoDeletado="naoDeletado"
    />
    <div class="d-flex flex-column align-content-center justify-content-center">
      <AlertMessage class="w-50 mt-5 " v-if="show" :message="message" :type="type" />
      <Loading class="w-50 m-3"  v-if="loggingIn" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Loading from "@/components/Loadings/Loading.vue";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";
import ListaDeStatus from "./Lista.vue";
import { MixinMessage } from "@/mixins";

export default defineComponent({
  name: "StatusLista",
  data: () => ({
    loggingIn: false,
  }),
  components: {
    Loading,
    AlertMessage,
    ListaDeStatus,
  },
  mixins: [MixinMessage],
});
</script>
