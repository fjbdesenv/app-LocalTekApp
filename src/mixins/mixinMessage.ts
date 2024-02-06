import { defineComponent } from 'vue';

export default defineComponent({
    data: () => ({
        show: false,
        message: '',
        type: 'success'
    }),
    methods: {
        messageShowTime(message: string, type: string, time: number) {

            if (time < 0) time = 0;

            this.show = true;
            this.message = message;
            this.type = type;

            setTimeout(() => {
                this.show = false;
            }, time);
        },
        errorInternal(error: any) {
            console.error(error?.message);
            this.messageShowTime('Erro interno, tente novamente mais tarde!', 'danger', 3000);
        },
        errorAuth() {
            this.messageShowTime('Email ou senha incorreto, por favor verifique!', 'danger', 3000);
        },
        deletado() {
            this.messageShowTime('Registro deletado com sucesso!', 'success', 2000);
        },
        naoDeletado() {
            this.messageShowTime('Não foi possível deletar esse registro!', 'danger', 3000);
        }
    },
});