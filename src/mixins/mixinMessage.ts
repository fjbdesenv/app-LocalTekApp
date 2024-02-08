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
        MSGerrorInternal(error: any) {
            console.error(error?.message);
            this.messageShowTime('Erro interno, tente novamente mais tarde!', 'danger', 3000);
        },
        MSGerrorAuth() {
            this.messageShowTime('Email ou senha incorreto, por favor verifique!', 'danger', 1500);
        },
        MSGdeletado() {
            this.messageShowTime('Registro deletado com sucesso!', 'success', 1500);
        },
        MSGnaoDeletado() {
            this.messageShowTime('Não foi possível deletar esse registro!', 'danger', 1500);
        },
        MSGNotFound() {
            this.messageShowTime('Não encontrado!', 'danger', 1500);
        },
        MSGUpdate() {
            this.messageShowTime('Registro atualizado com sucesso', 'success', 1500);
        },
        MSGdCreate() {
            this.messageShowTime('Registro criado com sucesso!', 'success', 1500);
        },
    },
});