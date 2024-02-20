<template>
  <div v-show="!show" class="bg-light m-3 p-3 border rounded-3">
    <b-form @submit="onSubmit">
      <h3 class="text-center">{{ title }}</h3>

      <b-form-group label="Descrição:" label-for="input-1">
        <b-form-input
          id="input-1"
          type="text"
          v-model="form.descricao"
          :disabled="disabled"
          placeholder="Descrição"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Tipo:" label-for="input-2">
        <b-form-select
          id="input-2"
          v-model="form.tipo"
          :options="optionsTipoStatus"
          :disabled="disabled"
          required
        ></b-form-select>
      </b-form-group>

      <BotoesForm
        :props-router-name="rotas.lista.status"
        :props-disabled="disabled"
        @editar="disabled = false"
      />
    </b-form>
  </div>

  <AlertMessage class="w-50 mt-5" v-if="show" :message="message" :type="type" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BForm, BFormInput, BFormGroup, BFormSelect } from "bootstrap-vue-next";
import { MixinMessage, MixinModuloGet, MixinRoutes, MixinForm } from "@/mixins";
import { optionsTipoStatus } from "@/assets/others/options";
import { Api, Status } from "@/class";
import { PATHS } from "@/enum";
import BotoesForm from "@/components/Forms/Buttons/BotoesForm.vue";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";

export default defineComponent({
  name: "FormStatus",
  data: () => ({
    form: new Status(undefined),
    optionsTipoStatus,
  }),
  components: {
    BForm,
    BFormInput,
    BFormGroup,
    BFormSelect,
    BotoesForm,
    AlertMessage,
  },
  mixins: [MixinMessage, MixinModuloGet, MixinRoutes, MixinForm],
  methods: {
    onSubmit(event: Event) {
      event.preventDefault();
      this.propsCadastro ? this.create() : this.update();
    },

    getRegistro(codigo: number) {
      const api = new Api();

      api.status
        .findOne(codigo)
        .then((response) => {
          this.form = new Status(response.data);
        })
        .catch((error) => {
          console.log(error?.message);
          this.MSGNotFound();
        });
    },

    create() {
      const api = new Api();
      this.form.normalizarSaida();

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
      this.form.normalizarSaida();

      api.status
        .updateOne(codigo, this.form)
        .then(() => {
          this.disabled = true;
          this.MSGUpdate();
        })
        .catch((error) => {
          console.log(error?.message);
          this.MSGerrorInternal(error);
        });
    },
  },
  created() {
    if (!this.propsCadastro) {
      const codigo = Number(this.$route.params.codigo);
      this.getRegistro(codigo);
    }

    /* Adicionando Rotas */
    this.rotas.lista.status = this.getRouteLista(this.getModule(), PATHS.Status);
  },
});
</script>
