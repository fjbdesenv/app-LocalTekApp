import { defineComponent } from "vue";
import { Status } from "@/interfaces";
import { Api } from "@/class";

type TypesAcepts = Status;

export default defineComponent({
  data: () => ({
    registros: new Array<TypesAcepts>(),
  }),
  methods: {
    getLista() {
      const api = new Api();

      while (this.registros.length > 0) this.registros.pop();

      api.status
        .findAll()
        .then((response) => {
          const aux: Array<TypesAcepts> = response.data;
          aux.forEach((item: TypesAcepts) => this.registros.push(item));
        })
        .catch((error: ErrorEvent) => {
          this.$emit("erro", error);
          console.error(error.message);
        });
    },
    deletar(codigo: number) {
      const confirmacao = confirm(`Desenja remover o item ${codigo}?`);

      if (confirmacao) {
        const api = new Api();

        api.status
          .deleteOne(codigo)
          .then(() => {
            this.getLista();
            this.$emit("deletado");
          })
          .catch((error: ErrorEvent) => {
            this.$emit("naoDeletado");
            console.error(error.message);
          });
      }

    },
  },
  created() {
    this.getLista();
  },
})