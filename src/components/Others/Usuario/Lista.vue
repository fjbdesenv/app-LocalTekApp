<template>
  <table :id="`tabela-${propsTableName}`" class="table table-hover mt-3">
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
              name: rotas.edicao.status,
              params: { codigo: registro.codigo_status },
              query: { returnList: 'false' },
            }"
            >{{ registro.status?.descricao }}</router-link
          >
        </td>
        <td class="d-flex justify-content-center">
          <BotoesListaOpcoes
            @deletarRegistro="deletar(registro.codigo ? registro.codigo : 0)"
            :props-codigo="registro.codigo"
            :props-rota-editar="rotas.edicao.usuario"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  MixinConfirmacaoDeletar,
  MixinModuloGet,
  MixinRoutes,
  MixinTable,
} from "@/mixins";
import { Api, Usuario } from "@/class";
import { PATHS, NIVEL_ACESSO } from "@/enum";
import BotoesListaOpcoes from "@/components/Buttons/BotoesListaOpcoes.vue";

export default defineComponent({
  name: "ListausuarioComponente",
  data: () => ({
    registros: new Array<Usuario>(),
  }),
  components: {
    BotoesListaOpcoes,
  },
  mixins: [MixinConfirmacaoDeletar, MixinModuloGet, MixinRoutes, MixinTable],
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

    nivelUsuario(nivel: number | undefined) {
      switch (nivel) {
        case 1:
          return NIVEL_ACESSO.Administrador;
        case 2:
          return NIVEL_ACESSO.Usuario;
        default:
          return "";
      }
    },
  },
  created() {
    this.getRegitros();

    /* Adicionando Rotas */
    this.path = PATHS.Usuario;
    this.rotas.edicao.usuario = this.getRouteEdicao(this.getModule(), this.path);
    this.rotas.edicao.status = this.getRouteEdicao(this.getModule(), PATHS.Status);
  },
});
</script>
