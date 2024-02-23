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
          placeholder="Nome"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Email:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="email"
          v-model="form.email"
          :disabled="disabled"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Senha:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="password"
          autocomplete="off"
          v-model="form.senha"
          :disabled="disabled"
        ></b-form-input>
      </b-form-group>

      <ListaNivelOptions
        :props-value="getSelectedNivel"
        :props-disabled="disabled"
        @updateNivel="(value: number) => (form.nivel = value)"
      />

      <ListaStatusOptions
        :props-value="getSelectedStatus"
        :props-disabled="disabled"
        @updateStatus="(value: number) => (form.codigo_status = value)"
      />

      <b-form-group
        class="m-2 p-2 border-2 rounded-2 bg-secondary-subtle"
        label="Módulos:"
      >
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="modulos.selected"
          :options="modulos.options"
          :disabled="disabled"
          size="lg"
        ></b-form-checkbox-group>
      </b-form-group>

      <BotoesForm
        :props-router-name="rotas.lista.usuario"
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
import { BForm, BFormInput, BFormGroup, BFormCheckboxGroup } from "bootstrap-vue-next";
import { Api, Usuario } from "@/class";
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
import ListaNivelOptions from "@/components/Forms/ListOptions/ListaNivelOptions.vue";
import { PATHS, MODULOS } from "@/enum";

export default defineComponent({
  name: "FormUsuario",
  data: () => ({
    form: new Usuario(undefined),
    modulos: {
      selected: new Array<string>(),
      options: [
        { value: MODULOS.Administrador, text: MODULOS.Administrador },
        { value: MODULOS.Remessa, text: MODULOS.Remessa },
        { value: MODULOS.Especificidade, text: MODULOS.Especificidade },
      ],
    },
  }),
  mixins: [MixinMessage, MixinListStatus, MixinModuloGet, MixinRoutes, MixinForm],
  components: {
    BForm,
    BFormInput,
    BFormGroup,
    BotoesForm,
    BFormCheckboxGroup,
    AlertMessage,
    ListaStatusOptions,
    ListaNivelOptions,
  },
  computed: {
    ...mapGetters(["getSelectedStatus", "getSelectedNivel"]),
  },
  methods: {
    ...mapMutations(["setSelectedStatus", "setSelectedNivel"]),

    onSubmit(event: Event) {
      event.preventDefault();
      this.propsCadastro ? this.create() : this.update();
    },

    getRegistro(codigo: number) {
      const api = new Api();

      api.usuario
        .findOne(codigo)
        .then((response) => {
          this.form = new Usuario(response.data);

          /* Adicionando modulos no formulario */
          this.form.modulos?.split("|").forEach((m) => this.modulos.selected.push(m));

          this.setSelectedStatus(this.form.codigo_status); /* Atualizar store */
          this.setSelectedNivel(this.form.nivel); /* Atualizar store */
        })
        .catch((error) => {
          console.log(error?.message);
          this.MSGNotFound();
        });
    },

    create() {
      const api = new Api();
      this.form.normalizarSaida();
      this.form.modulos = this.modulos.selected.join("|");

      api.usuario
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
      this.form.normalizarModulos(this.modulos.selected);

      api.usuario
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
    this.rotas.lista.usuario = this.getRouteLista(this.getModule(), PATHS.Usuario);
  },
});
</script>
