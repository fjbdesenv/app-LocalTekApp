<template>
  <div v-show="!show" class="bg-light m-3 p-3 border rounded-3">
    <b-form @submit="onSubmit">
      <h3 class="text-center">{{ cadastro ? "Cadastro" : "Edição" }}</h3>

      <b-form-group label="Código do cliente na Tek-System:" label-for="input-1">
        <b-form-input
          id="input-1"
          type="number"
          min="1"
          v-model="form.codigo_cliente_tek"
          placeholder="Código do cliente na Tek-System"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Razão Social:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="text"
          v-model="form.razao"
          placeholder="Razão Social"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Nome Fantasia:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="text"
          v-model="form.nome_fantasia"
          placeholder="Nome Fantasia"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Email:" label-for="input-4">
        <b-form-input
          id="input-4"
          type="email"
          v-model="form.email"
          placeholder="Email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Cnpj/Cpf:" label-for="input-5">
        <b-form-input
          id="input-5"
          type="text"
          v-model="form.cnpj_cpf"
          placeholder="CNPJ ou CPF"
          required
        ></b-form-input>
      </b-form-group>

      <ListaStatusOptions
        :props-value="getSelectedStatus"
        @updateStatus="(value: number) => (form.codigo_status = value)"
      />
      <BotoesForm :props-router-name="rotas.lista.cliente" />
    </b-form>
  </div>

  <AlertMessage class="w-50 mt-5" v-if="show" :message="message" :type="type" />
</template>

<script lang="ts">
import { mapMutations, mapGetters } from "vuex";
import { defineComponent } from "vue";
import { BForm, BFormInput, BFormGroup } from "bootstrap-vue-next";
import { Api, Cliente } from "@/class";
import { PATHS } from "@/enum";
import { MixinMessage, MixinListStatus, MixinModuloGet, MixinRoutes } from "@/mixins";
import BotoesForm from "@/components/Forms/Buttons/BotoesForm.vue";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";
import ListaStatusOptions from "@/components/Forms/ListOptions/ListaStatusOptions.vue";

export default defineComponent({
  name: "FormCliente",
  data: () => ({
    form: new Cliente(undefined),
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
  },
  computed: {
    ...mapGetters(["getSelectedStatus"]),
  },
  methods: {
    ...mapMutations(["setSelectedStatus"]),

    onSubmit(event: Event) {
      event.preventDefault();
      this.cadastro ? this.create() : this.update();
    },

    getRegistro(codigo: number) {
      const api = new Api();

      api.cliente
        .findOne(codigo)
        .then((response) => {
          this.form = new Cliente(response.data);
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

      api.cliente
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

      api.cliente
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
    this.rotas.lista.cliente = this.getRouteLista(this.getModule(), PATHS.Cliente);
  },
});
</script>
