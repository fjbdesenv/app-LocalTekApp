<template>
  <b-form-group label="Protesto:" label-for="input-select">
    <b-form-select
      label-for="input-select"
      v-model="selected"
      :options="optionsProtesto"
      :disabled="propsDisabled"
      required
    ></b-form-select>
  </b-form-group>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import { BFormGroup, BFormSelect } from "bootstrap-vue-next";
import { MixinMessage } from "@/mixins";
import { optionsProtesto } from "@/assets/others/options";

export default defineComponent({
  name: "ListaProtesto",
  data: () => ({
    optionsProtesto,
    selected: false,
  }),
  props: {
    valueInicial: {
      type: Boolean,
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
    ...mapGetters(["getSelectedPropesto"]),
  },
  watch: {
    selected(value: number) {
      this.$emit("updateProtesto", value); /* Enviar o novo status para o form */
    },
    valueInicial(value) {
      /* O store atualiza depois do componente ser criado, isso atualiza o status selecionando */
      this.selected = value;
    },
  },
  created() {
    this.selected = this.valueInicial;
  },
});
</script>
