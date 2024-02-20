<template>
  <b-form-group label="Status:" label-for="input-select">
    <b-form-select
      label-for="input-select"
      v-model="selected"
      :options="optionsStatus"
      :disabled="propsDisabled"
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
    selected: 0,
  }),
  props: {
    propsValue: {
      type: Number,
      required: true,
    },
    propsDisabled: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [MixinMessage],
  components: {
    BFormSelect,
    BFormGroup,
  },
  computed: {
    ...mapGetters(["getSelectedStatus"]),
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
    selected(value: number) {
      this.$emit("updateStatus", value); /* Enviar o novo status para o form */
    },
    propsValue(value) {
      /* O store atualiza depois do componente ser criado, isso atualiza o status selecionando */
      this.selected = value;
    },
  },
  created() {
    this.selected = this.propsValue;
    this.getStatus();
  },
});
</script>
