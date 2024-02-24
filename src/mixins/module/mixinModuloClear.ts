import { defineComponent } from 'vue';
import { LocalStorage } from "@/class/LocalStogare";
import { Api } from '@/class';
import { AxiosError } from 'axios';

export default defineComponent({
    beforeMount() {
        const localStorage = new LocalStorage();
        const usuario = localStorage.usuario;
        const modulo = localStorage.modulo;

        /* Verifica se usuário pode acessar o módulo */

        if (usuario) {
            const api = new Api();

            api.usuario
                .findOne(usuario.codigo)
                .then((res) => {
                    const usuariomodulos: string = res.data.modulos;
                    const arrayModulos = usuariomodulos.split("|");

                    if (!arrayModulos.includes(modulo)) this.$router.push({ name: 'Home' });
                })
                .catch((error: AxiosError) => {
                    console.error(error.message);
                    this.$router.push({ name: 'Home' });
                });

        } else {
            this.$router.push({ name: 'Home' });
        }
    },
    beforeUnmount() {
        const localStorage = new LocalStorage();
        localStorage.moduloClear();
    }
});
