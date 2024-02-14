<template>
  <table class="table table-hover mt-3">
    <thead>
      <tr>
        <th>#</th>
        <th>Nome</th>
        <th>Email</th>
        <th>Nível</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(registro, index) in registros" :key="index">
        <td>{{ registro.codigo }}</td>
        <td>{{ registro.nome }}</td>
        <td>{{ registro.email }}</td>
        <td>{{ nivelUsuario(registro.nivel) }}</td>
        <td>
          <router-link
            :to="{
              name: rotas.statusEditar,
              params: { codigo: registro.codigo_status },
            }"
            >{{ registro.status?.descricao }}</router-link
          >
        </td>
        <td class="d-flex justify-content-center">
          <BotoesListaOpcoes
            @deletarRegistro="deletar(registro.codigo ? registro.codigo : 0)"
            :codigo="registro.codigo"
            :rota-editar="rotas.usuarioEditar"
            :rota-consultar="rotas.usuarioConsultar"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MixinConfirmacaoDeletar } from "@/mixins";
import { Api, Usuario } from "@/class";
import BotoesListaOpcoes from "@/components/Forms/Buttons/BotoesListaOpcoes.vue";

export default defineComponent({
  name: "ListausuarioComponente",
  data: () => ({
    registros: new Array<Usuario>(),
    rotas: {
      statusEditar: "RemessaStatusEditar",
      usuarioEditar: "RemessaUsuarioEditar",
      usuarioConsultar: "RemessaUsuarioEditar",
    },
  }),
  components: {
    BotoesListaOpcoes,
  },
  mixins: [MixinConfirmacaoDeletar],
  methods: {
    getRegitros() {
      const api = new Api();

      while (this.registros.length > 0) this.registros.pop();

      api.usuario
        .findAll()
        .then((response) => {
          const aux: Array<Usuario> = response.data;
          aux.forEach((item: Usuario) => this.registros.push(item));
        })
        .catch((error: ErrorEvent) => {
          this.$emit("erro", error);
          console.error(error.message);
        });
    },

    deletar(codigo: number) {
      if (this.confimacaoDeletar(codigo)) {
        const api = new Api();

        api.usuario
          .deleteOne(codigo)
          .then(() => {
            this.getRegitros();
            this.$emit("deletado");
          })
          .catch((error: ErrorEvent) => {
            this.$emit("naoDeletado");
            console.error(error.message);
          });
      }
    },

    nivelUsuario(nivel: number) {
      switch (nivel) {
        case 1:
          return "Administrador";
        case 2:
          return "Geral";
        case 3:
          return "Remessa";
        case 4:
          return "Especificidade";
        default:
          return "";
      }
    },
  },
  created() {
    this.getRegitros();
  },
});
</script>
