import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        mapeamentoErro(error: any, oparacao: number) {
            if (error.response) {
                const statusCode = error.response.status;
                const data = error.response.data;

                if (statusCode === 409) {
                    const message = data.message[1] || data.message[2];
                    switch (oparacao) {
                        case 1: /* Deletar */
                            alert(message);
                            // alert("Esse registro estar vinculado a outros registros, não pode ser deletado!");
                            break;
                        case 2: /* Cadatrar ou editar */
                            alert(message);
                            break;
                    }
                } else if (statusCode === 400) {
                    alert(
                        `Entre em contato com o administrador para verificar o error: ${error.response.data.message}`
                    );
                } else {
                    console.error(error.response.data);
                    this.$emit("naoDeletado");
                }
            } else {
                console.error(error);
                this.$emit("naoDeletado");
            }

            return error.response;
        }
    }
});