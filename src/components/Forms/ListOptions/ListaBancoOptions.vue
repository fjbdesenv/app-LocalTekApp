<template>
  <b-form-group label="Banco:" label-for="input-select">
    <b-form-select
      label-for="input-select"
      v-model="selected"
      :options="optionsBanco"
      :disabled="propsDisabled"
      required
    ></b-form-select>
  </b-form-group>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import { BFormGroup, BFormSelect } from "bootstrap-vue-next";
import { Api, Banco } from "@/class";
import { MixinMessage } from "@/mixins";
import { AxiosResponse } from "axios";

export default defineComponent({
  name: "ListaBanco",
  data: () => ({
    listBanco: new Array<Banco>(),
    optionsBanco: new Array<{ value: number | undefined; text: string | undefined }>(),
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
    ...mapGetters(["getSelectedBanco"]),
  },
  methods: {
    getBanco() {
      const api = new Api();

      api.banco
        .findAll()
        .then((response: AxiosResponse) => {
          this.listBanco = response.data;
          this.gerarListaBancoOptions();
        })
        .catch((error) => {
          console.log(error);
          this.MSGerrorInternal(error);
        });
    },

    gerarListaBancoOptions() {
      this.listBanco.forEach((item: Banco) => {
        this.optionsBanco.push({ value: item.codigo, text: item.nome });
      });
    },
  },
  watch: {
    selected(value: number) {
      this.$emit("updateBanco", value); /* Enviar o novo Banco para o form */
    },
    propsValue(value) {
      /* O store atualiza depois do componente ser criado, isso atualiza o Banco selecionando */
      this.selected = value;
    },
  },
  created() {
    this.selected = this.propsValue;
    this.getBanco();
  },
});
</script>
