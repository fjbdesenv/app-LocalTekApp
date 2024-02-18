<template>
  <div v-show="!show" class="bg-light m-3 p-3 border rounded-3">
    <b-form @submit="onSubmit">
      <h3 class="text-center">{{ cadastro ? "Cadastro" : "Edição" }}</h3>

      <b-form-group label="Código do Atendimento na Tek-System:" label-for="input-1">
        <b-form-input
          id="input-1"
          type="text"
          v-model="form.codigo_atendimento_tek"
          placeholder="Código do cliente na Tek-System"
          required
        ></b-form-input>
      </b-form-group>

      <ListaClienteOptions
        :valueInicial="getSelectedCliente"
        @updateCliente="(value: number) => (form.codigo_cliente = value)"
      />

      <ListaStatusOptions
        :valueInicial="getSelectedStatus"
        @updateStatus="(value) => (form.codigo_status = value)"
      />
      <BotoesForm :routerName="rotas.lista.atendimento" />
    </b-form>
  </div>

  <AlertMessage class="w-50 mt-5" v-if="show" :message="message" :type="type" />
</template>

<script lang="ts">
import { mapMutations, mapGetters } from "vuex";
import { defineComponent } from "vue";
import { BForm, BFormInput, BFormGroup } from "bootstrap-vue-next";
import { Api, Atendimento } from "@/class";
import { PATHS } from "@/enum";
import { MixinMessage, MixinListStatus, MixinRoutes, MixinModuloGet } from "@/mixins";
import BotoesForm from "@/components/Forms/Buttons/BotoesForm.vue";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";
import ListaStatusOptions from "@/components/Forms/ListOptions/ListaStatusOptions.vue";
import ListaClienteOptions from "@/components/Forms/ListOptions/ListaClienteOptions.vue";

export default defineComponent({
  name: "FormAtendimento",
  data: () => ({
    form: new Atendimento(undefined),
  }),
  props: {
    cadastro: {
      type: Boolean /* true - Cadastro | false - Edição */,
      required: false,
    },
  },
  mixins: [MixinMessage, MixinListStatus, MixinModuloGet, MixinRoutes],
  components: {
    BForm,
    BFormInput,
    BFormGroup,
    BotoesForm,
    AlertMessage,
    ListaStatusOptions,
    ListaClienteOptions,
  },
  computed: {
    ...mapGetters(["getSelectedCliente", "getSelectedStatus"]),
  },
  methods: {
    ...mapMutations(["setSelectedCliente", "setSelectedStatus"]),

    onSubmit(event: Event) {
      event.preventDefault();
      this.cadastro ? this.create() : this.update();
    },

    getRegistro(codigo: number) {
      const api = new Api();

      api.atendimento
        .findOne(codigo)
        .then((response) => {
          this.form = new Atendimento(response.data);
          this.setSelectedCliente(this.form.codigo_cliente); /* Atualizar store */
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

      api.atendimento
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

      api.atendimento
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
    if (!this.cadastro) {
      const codigo = Number(this.$route.params.codigo);
      this.getRegistro(codigo);
    }

    /* Adicionando Rotas */
    this.rotas.lista.atendimento = this.getRouteLista(
      this.getModule(),
      PATHS.Atendimento
    );
  },
});
</script>
