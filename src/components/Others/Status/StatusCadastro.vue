<template>
  <div v-show="!show" class="bg-light m-3 p-3 border rounded-3">
    <b-form @submit="onSubmit">
      <h3 class="text-center">{{ title }}</h3>
      <b-form-group id="input-group-1" label="Descrição:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="registro.descricao"
          type="text"
          placeholder="Descrição"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Tipo" label-for="input-2">
        <b-form-select
          v-model="registro.tipo"
          :options="optionsTipoStatus"
          required
        ></b-form-select>
      </b-form-group>

      <BotoesForm />
    </b-form>
  </div>

  <AlertMessage class="w-50 mt-5" v-if="show" :message="message" :type="type" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Status } from "@/class/Status";
import { Api } from "@/class";
import { MixinMessage } from "@/mixins";
import { optionsTipoStatus } from "@/assets/others/options/tipoStatus";
import { BForm, BFormInput, BFormGroup, BFormSelect } from "bootstrap-vue-next";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";
import BotoesForm from "@/components/Others/BotoesForm.vue";

export default defineComponent({
  name: "StatusCadastro",
  data: () => ({
    registro: new Status(),
    optionsTipoStatus,
    title: "Cadastro",
  }),
  props: {},
  components: {
    BForm,
    BFormInput,
    BFormGroup,
    BFormSelect,
    AlertMessage,
    BotoesForm,
  },
  methods: {
    create() {
      const api = new Api();
      const codigo = Number(this.$route.params.codigo);
      this.registro.codigo = undefined;

      api.status
        .createOne(this.registro)
        .then((response) => {
          this.MSGdCreate();
        })
        .catch((error) => {
          console.log(error?.message);
          this.MSGerrorInternal(error);
        });
    },

    onSubmit(event: Event) {
      event.preventDefault();
      this.create();
    },
  },
  mixins: [MixinMessage],
  created() {
    this.registro.tipo = 1;
  },
});
</script>
