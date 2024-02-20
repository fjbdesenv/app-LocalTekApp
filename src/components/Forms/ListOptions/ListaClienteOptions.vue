<template>
  <b-form-group label="Cliente:" label-for="input-select">
    <b-form-select
      label-for="input-select"
      v-model="selected"
      :options="optionsCliente"
      :disabled="propsDisabled"
      required
    ></b-form-select>
  </b-form-group>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import { BFormGroup, BFormSelect } from "bootstrap-vue-next";
import { Api, Cliente } from "@/class";
import { MixinMessage } from "@/mixins";
import { AxiosResponse } from "axios";

export default defineComponent({
  name: "ListaCliente",
  data: () => ({
    listCliente: new Array<Cliente>(),
    optionsCliente: new Array<{ value: number | undefined; text: string | undefined }>(),
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
    ...mapGetters(["getselectedCliente"]),
  },
  methods: {
    getClintes() {
      const api = new Api();

      api.cliente
        .findAll()
        .then((response: AxiosResponse) => {
          this.listCliente = response.data;
          this.gerarListaClienteOptions();
        })
        .catch((error) => {
          console.log(error?.message);
          this.MSGerrorInternal(error);
        });
    },

    gerarListaClienteOptions() {
      this.listCliente.forEach((item: Cliente) => {
        this.optionsCliente.push({ value: item.codigo, text: item.razao });
      });
    },
  },
  watch: {
    selected(value: number) {
      this.$emit("updateCliente", value); /* Enviar o novo cliente para o form */
    },
    propsValue(value) {
      /* O store atualiza depois do componente ser criado, isso atualiza o cliente selecionando */
      this.selected = value;
    },
  },
  created() {
    this.selected = this.propsValue;
    this.getClintes();
  },
});
</script>
