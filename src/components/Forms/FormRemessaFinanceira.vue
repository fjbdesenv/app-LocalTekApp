<template>
  <div v-show="!show" class="bg-light m-3 p-3 border rounded-3">
    <b-form @submit="onSubmit">
      <h3 class="text-center">{{ title }}</h3>

      <b-row>
        <b-col cols="6">
          <b-form-group label="Cód. Atend.:" label-for="input-1">
            <b-form-input
              id="input-1"
              type="number"
              v-model="form.codigo_atendimento"
              :disabled="disabled"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group label="Tipo:" label-for="input-2">
            <b-form-select
              id="input-2"
              v-model="form.tipo_remessa"
              :options="options.tipoRemessa"
              :disabled="disabled"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6">
          <b-form-group label="Agência:" label-for="input-3">
            <b-form-input
              id="input-3"
              type="number"
              v-model="form.agencia"
              :disabled="disabled"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group label="Dígito Agência:" label-for="input-4">
            <b-form-input
              id="input-4"
              type="number"
              v-model="form.digito_agencia"
              :disabled="disabled"
              min="0"
              max="9"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6">
          <b-form-group label="Conta Corrente (C.C.):" label-for="input-5">
            <b-form-input
              id="input-5"
              type="number"
              v-model="form.conta_corrente"
              :disabled="disabled"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col>
          <b-form-group label="Dígito Conta Corrente:" label-for="input-6">
            <b-form-input
              id="input-6"
              type="number"
              v-model="form.digito_conta_corrente"
              :disabled="disabled"
              min="0"
              max="9"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6">
          <b-form-group label="Carteira:" label-for="input-7">
            <b-form-input
              id="input-7"
              type="text"
              v-model="form.carteira"
              :disabled="disabled"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group label="Variação:" label-for="input-8">
            <b-form-input
              id="input-8"
              type="text"
              v-model="form.variacao"
              :disabled="disabled"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6">
          <b-form-group label="Convênio:" label-for="input-9">
            <b-form-input
              id="input-9"
              type="text"
              v-model="form.convenio"
              :disabled="disabled"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group label="Cedente:" label-for="input-10">
            <b-form-input
              id="input-10"
              type="text"
              v-model="form.cedente"
              :disabled="disabled"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6">
          <b-form-group label="Contrato:" label-for="input-11">
            <b-form-input
              id="input-11"
              type="text"
              v-model="form.contrato"
              :disabled="disabled"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group label="Emitente:" label-for="input-12">
            <b-form-select
              id="input-12"
              v-model="form.emitente"
              :options="options.emitentes"
              :disabled="disabled"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6">
          <b-form-group label="Titular:" label-for="input-13">
            <b-form-input
              id="input-13"
              type="text"
              v-model="form.titular"
              :disabled="disabled"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group label="Titular CNPJ/CPF:" label-for="input-14">
            <b-form-input
              id="input-14"
              type="number"
              v-model="form.titular_cnpj_cpf"
              :disabled="!form.titular || disabled"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6">
          <b-form-group label="Sacador/Avalista:" label-for="input-15">
            <b-form-input
              id="input-15"
              type="text"
              v-model="form.sacador_avalista"
              :disabled="disabled"
              max="14"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group label="Sacador/Avalista CNPJ/CPF:" label-for="input-16">
            <b-form-input
              id="input-16"
              type="number"
              v-model="form.sacador_avalista_cnpj_cpf"
              :disabled="!form.sacador_avalista || disabled"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6">
          <b-form-group label="Juros:" label-for="input-17">
            <b-form-input
              id="input-17"
              type="number"
              v-model="form.juros"
              :disabled="disabled"
              :step="0.01"
              min="0"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group label="Multa:" label-for="input-18">
            <b-form-input
              id="input-18"
              type="number"
              v-model="form.multa"
              :disabled="disabled"
              :step="0.01"
              min="0"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">
          <ListaBancoOptions
            :props-value="getSelectedBanco"
            :props-disabled="disabled"
            @updateBanco="(value) => (form.codigo_banco = value)"
          />
        </b-col>

        <b-col cols="4">
          <ListaCnabOptions
            :props-value="getSelectedCnab"
            :props-disabled="disabled"
            @updateCnab="(value) => (form.codigo_cnab = value)"
          />
        </b-col>

        <b-col cols="4">
          <ListaStatusOptions
            :props-value="getSelectedStatus"
            :props-disabled="disabled"
            @updateStatus="(value) => (form.codigo_status = value)"
          />
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">
          <ListaProtestoOptions
            :props-value="getSelectedProtesto"
            :props-disabled="disabled"
            @updateProtesto="(value) => (form.protesto = value)"
          />
        </b-col>

        <b-col cols="4">
          <b-form-group label="Dias para Propesto:" label-for="input-16">
            <b-form-input
              id="input-16"
              type="number"
              min="0"
              v-model="form.protesto_dias"
              :disabled="!form.protesto || disabled"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="4">
          <ListaPixOptions
            :props-value="getSelectedPix"
            :props-disabled="disabled"
            @updatePix="(value) => (form.pix = value)"
          />
        </b-col>
      </b-row>

      <BotoesForm
        :props-router-name="rotas.lista.remessaFinanceira"
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
  BForm,
  BFormInput,
  BFormGroup,
  BFormSelect,
  BRow,
  BCol,
} from "bootstrap-vue-next";
import { Api, RemessaFinanceira } from "@/class";
import {
  MixinMessage,
  MixinListStatus,
  MixinRoutes,
  MixinModuloGet,
  MixinForm,
  MixinErro,
} from "@/mixins";
import { optionsTipoRemessa, optionsEmitente } from "@/assets/others/options";
import { PATHS } from "@/enum";
import BotoesForm from "@/components/Buttons/BotoesForm.vue";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";
import ListaStatusOptions from "@/components/Forms/ListOptions/ListaStatusOptions.vue";
import ListaBancoOptions from "@/components/Forms/ListOptions/ListaBancoOptions.vue";
import ListaCnabOptions from "@/components/Forms/ListOptions/ListaCnabOptions.vue";
import ListaProtestoOptions from "@/components/Forms/ListOptions/ListaProtestoOptions.vue";
import ListaPixOptions from "@/components/Forms/ListOptions/ListaPixOptions.vue";

export default defineComponent({
  name: "FormRemessaFinanceira",
  data: () => ({
    form: new RemessaFinanceira(undefined),
    options: {
      tipoRemessa: optionsTipoRemessa,
      emitentes: optionsEmitente,
    },
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
    BForm,
    BFormInput,
    BFormGroup,
    BotoesForm,
    BFormSelect,
    BRow,
    BCol,
    AlertMessage,
    ListaStatusOptions,
    ListaBancoOptions,
    ListaCnabOptions,
    ListaProtestoOptions,
    ListaPixOptions,
  },
  computed: {
    ...mapGetters([
      "getSelectedStatus",
      "getSelectedBanco",
      "getSelectedCnab",
      "getSelectedProtesto",
      "getSelectedPix",
    ]),
  },
  methods: {
    ...mapMutations([
      "setSelectedStatus",
      "setSelectedBanco",
      "setSelectedCnab",
      "setSelectedProtesto",
      "setSelectedPix",
    ]),

    onSubmit(event: Event) {
      event.preventDefault();
      this.propsCadastro ? this.create() : this.update();
    },

    getRegistro(codigo: number) {
      const api = new Api();

      api.remessafinanceira
        .findOne(codigo)
        .then((response) => {
          this.form = new RemessaFinanceira(response.data);
          this.setSelectedStatus(this.form.codigo_status); /* Atualizar store */
          this.setSelectedBanco(this.form.codigo_banco); /* Atualizar store */
          this.setSelectedCnab(this.form.codigo_cnab); /* Atualizar store */
          this.setSelectedPix(this.form.pix); /* Atualizar store */
        })
        .catch((error) => {
          console.log(error);
          this.MSGNotFound();
        });
    },

    create() {
      const api = new Api();
      this.form.normalizarSaida();

      api.remessafinanceira
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

      api.remessafinanceira
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
    this.rotas.lista.remessaFinanceira = this.getRouteLista(
      this.getModule(),
      PATHS.RemessaFinanceira
    );
  },
});
</script>
