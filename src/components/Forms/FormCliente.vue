<template>
  <div v-show="!show" class="bg-light m-3 p-3 border rounded-3">
    <b-form @submit="onSubmit">
      <h3 class="text-center">{{ title }}</h3>
      <b-row>
        <b-col cols="12">
          <b-form-group label="Código do cliente na Tek-System:" label-for="input-1">
            <b-form-input
              id="input-1"
              type="number"
              min="1"
              v-model="form.codigo_cliente_tek"
              :disabled="disabled"
              placeholder="Código do cliente na Tek-System"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group label="Razão Social:" label-for="input-2">
            <b-form-input
              id="input-2"
              type="text"
              v-model="form.razao"
              :disabled="disabled"
              :maxlength="100"
              placeholder="Razão Social"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group label="Nome Fantasia:" label-for="input-3">
            <b-form-input
              id="input-3"
              type="text"
              v-model="form.nome_fantasia"
              :disabled="disabled"
              :maxlength="100"
              placeholder="Nome Fantasia"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group label="Email:" label-for="input-4">
            <b-form-input
              id="input-4"
              type="email"
              v-model="form.email"
              :disabled="disabled"
              :maxlength="100"
              placeholder="Email"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group :label="labelCnpjCpf" label-for="input-7">
            <b-form-input
              id="input-7"
              type="text"
              v-model="form.cnpj_cpf"
              :disabled="disabled"
              :placeholder="placeholderCnpjCpf"
              :minlength="lengthCnpjCpf"
              :maxlength="lengthCnpjCpf"
              required
            >
            </b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group label="Tipo:" label-for="input-5">
            <b-form-radio-group
              v-model="form.tipo"
              :options="options_CNPJ_CPF"
              class="mb-3"
              value-field="item"
              text-field="name"
              :disabled="disabled"
            >
            </b-form-radio-group>
          </b-form-group>
        </b-col>

        <b-col>
          <ListaStatusOptions
            :props-value="getSelectedStatus"
            :props-disabled="disabled"
            @updateStatus="(value: number) => (form.codigo_status = value)"
          />
        </b-col>
      </b-row>
      <BotoesForm
        :props-router-name="rotas.lista.cliente"
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
import {
  BRow,
  BCol,
  BForm,
  BFormInput,
  BFormGroup,
  BFormRadioGroup,
} from "bootstrap-vue-next";
import { Api, Cliente } from "@/class";
import { PATHS } from "@/enum";
import {
  MixinMessage,
  MixinListStatus,
  MixinModuloGet,
  MixinRoutes,
  MixinForm,
  MixinErro,
} from "@/mixins";
import BotoesForm from "@/components/Buttons/BotoesForm.vue";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";
import ListaStatusOptions from "@/components/Forms/ListOptions/ListaStatusOptions.vue";
import { Mask } from "@/lib";

export default defineComponent({
  name: "FormCliente",
  data: () => ({
    form: new Cliente(undefined),
    options_CNPJ_CPF: [
      { item: 1, name: "Física" },
      { item: 2, name: "Jurídica" },
    ],
  }),
  mixins: [
    MixinMessage,
    MixinListStatus,
    MixinModuloGet,
    MixinRoutes,
    MixinForm,
    MixinErro,
  ],
  components: {
    BRow,
    BCol,
    BForm,
    BFormInput,
    BFormGroup,
    BFormRadioGroup,
    BotoesForm,
    AlertMessage,
    ListaStatusOptions,
  },
  computed: {
    ...mapGetters(["getSelectedStatus"]),
    cnpjCpf(): string | undefined {
      return this.form.cnpj_cpf;
    },
    tipo(): number | undefined {
      return this.form.tipo;
    },
    labelCnpjCpf() {
      let label = "";
      if (this.form.tipo === 1) label = "CPF:";
      if (this.form.tipo === 2) label = "CNPJ:";
      return label;
    },
    placeholderCnpjCpf() {
      let placeholder = "";
      if (this.form.tipo === 1) placeholder = "CPF do cliente";
      if (this.form.tipo === 2) placeholder = "CNPJ do cliente";
      return placeholder;
    },
    lengthCnpjCpf() {
      let length = 0;
      if (this.form.tipo === 1) length = 14;
      if (this.form.tipo === 2) length = 18;
      return length;
    },
  },
  watch: {
    tipo() {
      /* Ao alterar o tipo o campo de cnpj_cpf é limpo, apenas para cadastro */
      if (!this.disabled) this.form.cnpj_cpf = "";
    },
    cnpjCpf(newValue) {
      if (this.form.tipo === 1) {
        const maskCpf = Mask.cpf(newValue);
        this.form.cnpj_cpf = maskCpf;
      }

      if (this.form.tipo === 2) {
        const maskCnpj = Mask.cnpj(newValue);
        this.form.cnpj_cpf = maskCnpj;
      }
    },
  },
  methods: {
    ...mapMutations(["setSelectedStatus"]),

    onSubmit(event: Event) {
      event.preventDefault();
      this.propsCadastro ? this.create() : this.update();
    },

    getRegistro(codigo: number) {
      const api = new Api();

      api.cliente
        .findOne(codigo)
        .then(({ data }) => {
          this.form = new Cliente(data);

          this.setSelectedStatus(this.form.codigo_status); /* Atualizar store */
        })
        .catch((error) => {
          console.log(error);
          this.MSGNotFound();
        });
    },

    create() {
      const api = new Api();
      this.form.normalizarSaida();

      const aux = Mask.soNumeros(this.cnpjCpf || "");

      if (this.tipo === 1 && aux.length != 11) {
        alert("CPF não tem 11 números, verifique!");
        return;
      }

      if (this.tipo === 2 && aux.length < 14) {
        alert("CNPJ não tem 14 números, verifique!");
        return;
      }

      api.cliente
        .createOne(this.form)
        .then(() => {
          this.MSGdCreate();
        })
        .catch((error) => {
          this.mapeamentoErro(error, 2);
        });
    },

    update() {
      const api = new Api();
      const codigo = Number(this.$route.params.codigo);
      this.form.normalizarSaida();

      api.cliente
        .updateOne(codigo, this.form)
        .then(() => {
          this.disabled = true;
          this.MSGUpdate();
        })
        .catch((error) => {
          this.mapeamentoErro(error, 2);
        });
    },
  },
  created() {
    if (!this.propsCadastro) {
      const codigo = Number(this.$route.params.codigo);
      this.getRegistro(codigo);
    }

    /* Adicionando Rotas */
    this.rotas.lista.cliente = this.getRouteLista(this.getModule(), PATHS.Cliente);
  },
});
</script>
