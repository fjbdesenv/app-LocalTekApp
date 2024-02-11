<template>
  <b-form-group label="Status" label-for="input-select">
    <b-form-select
      label-for="input-select"
      v-model="statusSelected"
      :options="optionsStatus"
      required
    ></b-form-select>
  </b-form-group>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import { BFormGroup, BFormSelect } from "bootstrap-vue-next";
import { Api, Status } from "@/class";
import { MixinMessage } from "@/mixins";
import { AxiosResponse } from "axios";

export default defineComponent({
  name: "ListaStatus",
  data: () => ({
    listStatus: new Array<Status>(),
    optionsStatus: new Array<{ value: number | undefined; text: string | undefined }>(),
    statusSelected: 0,
  }),
  props: {
    statusInicial: {
      type: Number,
      required: true,
    },
  },
  mixins: [MixinMessage],
  components: {
    BFormSelect,
    BFormGroup,
  },
  computed: {
    ...mapGetters(["getStatusSelected"]),
  },
  methods: {
    getStatus() {
      const api = new Api();

      api.status
        .findAll()
        .then((response: AxiosResponse) => {
          this.listStatus = response.data;
          this.gerarListaStatusOptions();
        })
        .catch((error) => {
          console.log(error?.message);
          this.MSGerrorInternal(error);
        });
    },

    gerarListaStatusOptions() {
      this.listStatus.forEach((item: Status) => {
        this.optionsStatus.push({ value: item.codigo, text: item.descricao });
      });
    },
  },
  watch: {
    statusSelected(value: number) {
      this.$emit("updateStatus", value); /* Enviar o novo status para o form */
    },
    statusInicial(value) {
      /* O store atualiza depois do componente ser criado, isso atualiza o status selecionando */
      this.statusSelected = value;
    },
  },
  created() {
    this.statusSelected = this.statusInicial;
    this.getStatus();
  },
});
</script>
