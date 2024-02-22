<template>
  <div v-show="!show" class="bg-light m-3 p-3 border rounded-3">
    <b-form @submit="onSubmit">
      <h3 class="text-center">{{ title }}</h3>

      <b-form-group label="Descrição:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="text"
          v-model="form.descricao"
          :disabled="disabled"
          placeholder="Descrição do evento"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Data:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="text"
          v-model="form.data"
          :disabled="disabled"
          required
        ></b-form-input>
      </b-form-group>

      <ListaStatusOptions
        :props-value="getSelectedStatus"
        :props-disabled="disabled"
        @updateStatus="(value) => (form.codigo_status = value)"
      />
      <BotoesForm
        :props-router-name="rotas.lista.atendimentoEvento"
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
import { Api, AtendimentoEvento } from "@/class";
import { PATHS } from "@/enum";
import {
  MixinMessage,
  MixinListStatus,
  MixinRoutes,
  MixinModuloGet,
  MixinForm,
} from "@/mixins";
import BotoesForm from "@/components/Forms/Buttons/BotoesForm.vue";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";
import ListaStatusOptions from "@/components/Forms/ListOptions/ListaStatusOptions.vue";

export default defineComponent({
  name: "FormAtendimentoEvento",
  data: () => ({
    form: new AtendimentoEvento(undefined),
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
    ...mapGetters(["getSelectedCliente", "getSelectedStatus"]),
  },
  methods: {
    ...mapMutations(["setSelectedCliente", "setSelectedStatus"]),

    onSubmit(event: Event) {
      event.preventDefault();
      this.propsCadastro ? this.create() : this.update();
    },

    getRegistro(codigo: number) {
      const api = new Api();
      const { codigoAtendimento } = this.$route.params;

      /* Ataliza a URL */
      api.atendimentoEventos = api.resourceEvento(+codigoAtendimento);

      api.atendimentoEventos
        .findOne(codigo)
        .then((response) => {
          this.form = new AtendimentoEvento(response.data);
          this.setSelectedStatus(this.form.codigo_status); /* Atualizar store */
        })
        .catch((error) => {
          console.log(error?.message);
          this.MSGNotFound();
        });
    },

    create() {
      const api = new Api();
      const { codigoAtendimento } = this.$route.params;

      /* Ataliza a URL */
      api.atendimentoEventos = api.resourceEvento(+codigoAtendimento);
      this.form.normalizarSaida();

      api.atendimentoEventos
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
      const { codigoAtendimento, codigo } = this.$route.params;

      /* Ataliza a URL */
      api.atendimentoEventos = api.resourceEvento(+codigoAtendimento);
      this.form.normalizarSaida();

      api.atendimentoEventos
        .updateOne(+codigo, this.form)
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
    this.rotas.lista.atendimentoEvento = this.getRouteLista(
      this.getModule(),
      PATHS.AtendimentoEvento
    );
  },
});
</script>
