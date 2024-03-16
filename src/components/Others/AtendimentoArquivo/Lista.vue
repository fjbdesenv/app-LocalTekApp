<template>
  <table :id="`tabela-${propsTableName}`" class="table table-hover mt-3">
    <thead>
      <tr>
        <th>#</th>
        <th>Nome</th>
        <th>Tipo</th>
        <th>Tamanho</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(registro, index) in registros" :key="index">
        <td>{{ registro.codigo }}</td>
        <td>{{ registro.nome }}</td>
        <td>{{ registro.tipo }}</td>
        <td>{{ registro.tamanho }}</td>
        <td class="d-flex justify-content-center">
          <BotoesListaArquivos
            :props-codigo="registro.codigo ? registro.codigo : 0"
            :props-load-file="() => loadFile(registro)"
          />
          <BotoesListaOpcoes
            @deletarRegistro="deletar(registro.codigo ? registro.codigo : 0)"
            :props-codigo="registro.codigo"
            :props-rota-editar="rotas.edicao.atendimentoArquivo"
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
  MixinErro,
  MixinModuloGet,
  MixinRoutes,
  MixinTable,
} from "@/mixins";
import { Api, AtendimentoArquivo } from "@/class";
import { PATHS } from "@/enum";
import BotoesListaArquivos from "@/components/Buttons/BotoesListaArquivos.vue";
import BotoesListaOpcoes from "@/components/Buttons/BotoesListaOpcoes.vue";

export default defineComponent({
  name: "ListaAtendimentoArquivoComponente",
  data: () => ({
    registros: new Array<AtendimentoArquivo>(),
  }),
  components: {
    BotoesListaOpcoes,
    BotoesListaArquivos,
  },
  mixins: [MixinConfirmacaoDeletar, MixinModuloGet, MixinRoutes, MixinTable, MixinErro],
  methods: {
    getRegistros() {
      const api = new Api();
      const { codigoAtendimento } = this.$route.params;

      /* Atualiza a URL */
      api.atendimentoArquivos = api.resourceArquivo(+codigoAtendimento);

      while (this.registros.length > 0) this.registros.pop();

      api.atendimentoArquivos
        .findAll()
        .then(({ data }) => {
          this.registros = data;
        })
        .catch((error: ErrorEvent) => {
          this.mapeamentoErro(error, 1);
        });
    },

    deletar(codigo: number) {
      if (this.confimacaoDeletar(codigo)) {
        const api = new Api();
        const { codigoAtendimento } = this.$route.params;

        /* Atualiza a URL */
        api.atendimentoArquivos = api.resourceArquivo(+codigoAtendimento);

        api.atendimentoArquivos
          .deleteOne(codigo)
          .then(() => {
            this.getRegistros();
            this.$emit("deletado");
          })
          .catch((error: ErrorEvent) => {
            this.mapeamentoErro(error, 1);
          });
      }
    },

    loadFile(arquivo: AtendimentoArquivo) {
      const api = new Api();
      const { codigoAtendimento } = this.$route.params;
      const codigo = arquivo.codigo ? arquivo.codigo : 0;
      const nome = arquivo.nome ? arquivo.nome : "download";

      /* Atualiza a URL */
      api.atendimentoArquivos = api.resourceArquivo(+codigoAtendimento);

      api.atendimentoArquivos
        .loadFile(codigo)
        .then(({ data }) => {
          const href = URL.createObjectURL(data);
          const link = document.createElement("a"); /* Cria um link */

          link.href = href;
          link.setAttribute("download", nome); /* Adicionado arquivo no link */
          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link); /* Remove link */
          URL.revokeObjectURL(href);
        })
        .catch((error: ErrorEvent) => {
          this.$emit("naoDeletado");
          console.error(error);
        });
    },
  },
  created() {
    this.getRegistros();

    /* Adicionando Rotas */
    this.rotas.edicao.atendimentoArquivo = this.getRouteEdicao(
      this.getModule(),
      PATHS.AtendimentoArquivo
    );
  },
});
</script>
