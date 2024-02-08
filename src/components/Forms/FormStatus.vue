<template>
  <div v-show="!show" class="bg-light m-3 p-3 border rounded-3">
    <b-form @submit="onSubmit">
      <h3 class="text-center">{{ cadastro ? "Cadastro" : "Edição" }}</h3>

      <b-form-group id="input-group-1" label="Descrição:" label-for="input-1">
        <b-form-input
          id="input-1"
          type="text"
          v-model="form.descricao"
          placeholder="Descrição"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Tipo" label-for="input-2">
        <b-form-select
          v-model="form.tipo"
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
import { optionsTipoStatus } from "@/assets/others/options/tipoStatus";
import { BForm, BFormInput, BFormGroup, BFormSelect } from "bootstrap-vue-next";
import { Api, Status } from "@/class";
import { MixinMessage } from "@/mixins";
import BotoesForm from "@/components/Forms/BotoesForm.vue";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";

export default defineComponent({
  name: "FormStatus",
  data: () => ({
    form: new Status(),
    optionsTipoStatus,
  }),
  props: {
    cadastro: {
      type: Boolean /* true - Cadastro | false - Edição */,
      required: false,
    },
  },
  mixins: [MixinMessage],
  components: {
    BForm,
    BFormInput,
    BFormGroup,
    BFormSelect,
    BotoesForm,
    AlertMessage,
  },
  methods: {
    onSubmit(event: Event) {
      event.preventDefault();
      this.cadastro ? this.create() : this.update();
    },

    getRegistro(codigo: number) {
      const api = new Api();

      api.status
        .findOne(codigo)
        .then((response) => {
          this.form = response.data;

          /* Remover datas para evitar erros, o servidor atualizara as datas */
          this.form.data_criacao = undefined;
          this.form.data_atualizacao = undefined;
          this.form.codigo = undefined; /* codigo não deve ser enviado no body */
        })
        .catch((error) => {
          console.log(error?.message);
          this.MSGNotFound();
        });
    },

    create() {
      const api = new Api();
      this.form.codigo = undefined;

      api.status
        .createOne(this.form)
        .then(() => {
          this.MSGdCreate();
        })
        .catch((error) => {
          console.log(error?.message);
          this.MSGerrorInternal(error);
        });
    },

    update() {
      const api = new Api();
      const codigo = Number(this.$route.params.codigo);

      api.status
        .updateOne(codigo, this.form)
        .then(() => {
          this.MSGUpdate();
        })
        .catch((error) => {
          console.log(error?.message);
          this.MSGerrorInternal(error);
        });
    },
  },
  created() {
    if (this.cadastro) {
      this.form = {
        codigo: undefined,
        descricao: "",
        tipo: 1,
      };
    } else {
      const codigo = Number(this.$route.params.codigo);
      this.getRegistro(codigo);
    }
  },
});
</script>
