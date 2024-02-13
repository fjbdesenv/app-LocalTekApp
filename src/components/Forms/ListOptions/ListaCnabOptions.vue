<template>
  <b-form-group label="Cnab:" label-for="input-select">
    <b-form-select
      label-for="input-select"
      v-model="selected"
      :options="optionsCnab"
      required
    ></b-form-select>
  </b-form-group>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import { BFormGroup, BFormSelect } from "bootstrap-vue-next";
import { Api, Cnab } from "@/class";
import { MixinMessage } from "@/mixins";
import { AxiosResponse } from "axios";

export default defineComponent({
  name: "ListaCnab",
  data: () => ({
    listCnab: new Array<Cnab>(),
    optionsCnab: new Array<{ value: number | undefined; text: string | undefined }>(),
    selected: 0,
  }),
  props: {
    valueInicial: {
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
    ...mapGetters(["getSelectedCnab"]),
  },
  methods: {
    getCnab() {
      const api = new Api();

      api.cnab
        .findAll()
        .then((response: AxiosResponse) => {
          this.listCnab = response.data;
          this.gerarListaCnabOptions();
        })
        .catch((error) => {
          console.log(error?.message);
          this.MSGerrorInternal(error);
        });
    },

    gerarListaCnabOptions() {
      this.listCnab.forEach((item: Cnab) => {
        this.optionsCnab.push({ value: item.codigo, text: item.descricao });
      });
    },
  },
  watch: {
    selected(value: number) {
      this.$emit("updateCnab", value); /* Enviar o novo Cnab para o form */
    },
    valueInicial(value) {
      /* O store atualiza depois do componente ser criado, isso atualiza o Cnab selecionando */
      this.selected = value;
    },
  },
  created() {
    this.selected = this.valueInicial;
    this.getCnab();
  },
});
</script>
