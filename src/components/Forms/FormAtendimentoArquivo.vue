<template>
  <div v-show="!show" class="bg-light m-3 p-3 border rounded-3">
    <b-form @submit="onSubmit" enctype="multipart/form-data">
      <h3 class="text-center">{{ title }}</h3>

      <b-form-group label="Nome:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="text"
          v-model="form.nome"
          disabled
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Tipo:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="text"
          v-model="form.tipo"
          disabled
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Tamanho (bytes):" label-for="input-4">
        <b-form-input
          id="input-4"
          type="text"
          v-model="form.tamanho"
          disabled
        ></b-form-input>
      </b-form-group>

      <b-form-group v-if="!disabled" label="Arquivo:" label-for="input-4">
        <b-form-file
          id="input-4"
          v-model="form.arquivo"
          :state="Boolean(form.arquivo)"
          :disabled="disabled"
          required
        ></b-form-file>
      </b-form-group>

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
import { defineComponent } from "vue";
import { BForm, BFormInput, BFormGroup, BFormFile } from "bootstrap-vue-next";
import { Api, AtendimentoArquivo } from "@/class";
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

export default defineComponent({
  name: "FormAtendimentoArquivo",
  data: () => ({
    form: new AtendimentoArquivo(undefined),
  }),
  mixins: [MixinMessage, MixinListStatus, MixinModuloGet, MixinRoutes, MixinForm],
  components: {
    BForm,
    BFormInput,
    BFormGroup,
    BotoesForm,
    BFormFile,
    AlertMessage,
  },
  computed: {
    fileObserved(): File | undefined {
      return this.form.arquivo;
    },
  },
  methods: {
    onSubmit(event: Event) {
      event.preventDefault();
      this.propsCadastro ? this.create() : this.update();
    },

    getRegistro(codigo: number) {
      const api = new Api();
      const { codigoAtendimento } = this.$route.params;

      /* Atualiza a URL */
      api.atendimentoArquivos = api.resourceArquivo(+codigoAtendimento);

      api.atendimentoArquivos
        .findOne(codigo)
        .then((response) => {
          this.form = new AtendimentoArquivo(response.data);
        })
        .catch((error) => {
          console.log(error);
          this.MSGNotFound();
        });
    },

    create() {
      const api = new Api();

      const { codigoAtendimento } = this.$route.params;
      const { arquivo } = this.form;

      if (arquivo) {
        /* Atualiza a URL */
        api.atendimentoArquivos = api.resourceArquivo(+codigoAtendimento);
        this.form.normalizarSaida();

        api.atendimentoArquivos
          .createOne(this.form)
          .then(() => {
            this.MSGdCreate();
          })
          .catch((error) => {
            console.log(error);
            this.MSGerrorInternal(error);
          });
      }
    },

    update() {
      const api = new Api();
      const { codigoAtendimento, codigo } = this.$route.params;

      /* Atualiza a URL */
      api.atendimentoArquivos = api.resourceArquivo(+codigoAtendimento);
      this.form.normalizarSaida();

      api.atendimentoArquivos
        .updateOne(+codigo, this.form)
        .then(() => {
          this.disabled = true;
          this.MSGUpdate();
        })
        .catch((error) => {
          console.log(error);
          this.MSGerrorInternal(error);
        });
    },
  },
  watch: {
    fileObserved() {
      if (this.form.arquivo) {
        /* Atualizar o form com os dados do arquivo */
        this.form.tipo = this.form.arquivo?.type;
        this.form.nome = this.form.arquivo?.name;
        this.form.tamanho = this.form.arquivo?.size;
      }
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
