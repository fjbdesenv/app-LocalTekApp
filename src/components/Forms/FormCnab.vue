<template>
  <div v-show="!show" class="bg-light m-3 p-3 border rounded-3">
    <b-form @submit="onSubmit">
      <h3 class="text-center">{{ cadastro ? "Cadastro" : "Edição" }}</h3>

      <b-form-group label="Descrição:" label-for="input-1">
        <b-form-input
          id="input-1"
          type="text"
          v-model="form.descricao"
          placeholder="Descrição"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Quantidade de linhas:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="number"
          v-model="linhas"
          placeholder="Quantidade de linhas"
          required
        ></b-form-input>
      </b-form-group>

      <ListaStatusOptions :statusInicial="getStatusSelected" @updateStatus="(value) => (form.codigo_status = value)" />
      <BotoesForm routerName="RemessaCnabLista" />
    </b-form>
  </div>

  <AlertMessage class="w-50 mt-5" v-if="show" :message="message" :type="type" />
</template>

<script lang="ts">
import { mapMutations, mapGetters } from "vuex";
import { defineComponent } from "vue";
import { BForm, BFormInput, BFormGroup } from "bootstrap-vue-next";
import { Api, Cnab } from "@/class";
import { MixinMessage, mixinListStatus } from "@/mixins";
import BotoesForm from "@/components/Forms/Buttons/BotoesForm.vue";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";
import ListaStatusOptions from "@/components/Forms/ListOptions/ListaStatusOptions.vue";

export default defineComponent({
  name: "FormStatus",
  data: () => ({
    form: new Cnab(),
    linhas: 0,
  }),
  props: {
    cadastro: {
      type: Boolean /* true - Cadastro | false - Edição */,
      required: false,
    },
  },
  mixins: [MixinMessage, mixinListStatus],
  components: {
    BForm,
    BFormInput,
    BFormGroup,
    BotoesForm,
    AlertMessage,
    ListaStatusOptions,
  },
  computed: {
    ...mapGetters(["getStatusSelected"]),
  },
  methods: {
    ...mapMutations(["setStatusSelected"]),

    onSubmit(event: Event) {
      event.preventDefault();
      this.cadastro ? this.create() : this.update();
    },

    getRegistro(codigo: number) {
      const api = new Api();

      api.cnab
        .findOne(codigo)
        .then((response) => {
          this.form = response.data;
          this.setStatusSelected(this.form.codigo_status); /* Atualizar store */

          /* Remover datas para evitar erros, o servidor atualizara as datas */
          this.form.data_criacao = undefined;
          this.form.data_atualizacao = undefined;
          this.form.codigo = undefined; /* codigo não deve ser enviado no body */

          this.linhas = Number(this.form.quantidade_linhas);
        })
        .catch((error) => {
          console.log(error?.message);
          this.MSGNotFound();
        });
    },

    create() {
      const api = new Api();
      this.form.codigo = undefined;

      api.cnab
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

      api.cnab
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
  watch: {
    linhas(value) {
      this.form.quantidade_linhas = Number(
        value
      ); /* Estava gerando erro, não estava convertento para número */
    },
  },
  created() {
    if (this.cadastro) {
      this.form = {
        codigo: undefined,
        descricao: "",
        quantidade_linhas: 0,
        codigo_status: 0,
      };
    } else {
      const codigo = Number(this.$route.params.codigo);
      this.getRegistro(codigo);
    }
  },
});
</script>
