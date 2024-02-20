<template>
  <b-form-group label="Nível:" label-for="input-select">
    <b-form-select
      label-for="input-select"
      v-model="selected"
      :options="optionsNivel"
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
import { optionsNivel } from "@/assets/others/options";

export default defineComponent({
  name: "ListaNivel",
  data: () => ({
    optionsNivel,
    selected: 3,
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
    ...mapGetters(["getSelectedNivel"]),
  },
  watch: {
    selected(value: number) {
      this.$emit("updateNivel", value); /* Enviar o novo status para o form */
    },
    propsValue(value) {
      /* O store atualiza depois do componente ser criado, isso atualiza o status selecionando */
      this.selected = value;
    },
  },
  created() {
    this.selected = this.propsValue;
  },
});
</script>
