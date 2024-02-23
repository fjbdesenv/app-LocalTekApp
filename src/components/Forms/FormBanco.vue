<template>
  <div v-show="!show" class="bg-light m-3 p-3 border rounded-3">
    <b-form @submit="onSubmit">
      <h3 class="text-center">{{ title }}</h3>

      <b-form-group label="Nome:" label-for="input-1">
        <b-form-input
          id="input-1"
          type="text"
          v-model="form.nome"
          :disabled="disabled"
          placeholder="Nome do banco"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Código:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="number"
          :min="1"
          v-model="form.codigo_banco"
          :disabled="disabled"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Câmara:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="number"
          :min="1"
          v-model="form.codigo_camara"
          :disabled="disabled"
          required
        ></b-form-input>
      </b-form-group>

      <ListaStatusOptions
        :props-value="getSelectedStatus"
        :props-disabled="disabled"
        @updateStatus="(value: number) => (form.codigo_status = value)"
      />
      <BotoesForm
        :props-router-name="rotas.lista.banco"
        :props-disabled="disabled"
        @editar="disabled = false"
      />
    </b-form>
  </div>

  <AlertMessage class="w-50 mt-5" v-if="show" :message="message" :type="type" />
</template>

<script lang="ts">
import { mapMutations, mapGetters } from "vuex";
import { defineComponent } from "vue";
import { BForm, BFormInput, BFormGroup } from "bootstrap-vue-next";
import { Api, Banco } from "@/class";
import { PATHS } from "@/enum";
import {
  MixinMessage,
  MixinListStatus,
  MixinRoutes,
  MixinModuloGet,
  MixinForm,
} from "@/mixins";
import BotoesForm from "@/components/Buttons/BotoesForm.vue";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";
import ListaStatusOptions from "@/components/Forms/ListOptions/ListaStatusOptions.vue";

export default defineComponent({
  name: "FormBanco",
  data: () => ({
    form: new Banco(undefined),
  }),
  mixins: [MixinMessage, MixinListStatus, MixinModuloGet, MixinRoutes, MixinForm],
  components: {
    BForm,
    BFormInput,
    BFormGroup,
    BotoesForm,
    AlertMessage,
    ListaStatusOptions,
  },
  computed: {
    ...mapGetters(["getSelectedStatus"]),
  },
  methods: {
    ...mapMutations(["setSelectedStatus"]),

    onSubmit(event: Event) {
      event.preventDefault();
      this.propsCadastro ? this.create() : this.update();
    },

    getRegistro(codigo: number) {
      const api = new Api();

      api.banco
        .findOne(codigo)
        .then((response) => {
          this.form = new Banco(response.data);
          this.setSelectedStatus(this.form.codigo_status); /* Atualizar store */
        })
        .catch((error) => {
          console.log(error?.message);
          this.MSGNotFound();
        });
    },

    create() {
      const api = new Api();
      this.form.normalizarSaida();

      api.banco
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

      api.banco
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
    this.rotas.lista.banco = this.getRouteLista(this.getModule(), PATHS.Banco);
  },
});
</script>
