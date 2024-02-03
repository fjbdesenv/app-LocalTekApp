import { defineComponent } from 'vue';

export default defineComponent({
    data: () => ({
        error: {
            show: false,
            message: '',
            type: 'success'
        }
    }),
    methods: {
        messageShowTime(message: string, type: string, time: number) {

            if (time < 0) time = 0;

            this.error.show = true;
            this.error.message = message;
            this.error.type = type;

            setTimeout(() => {
                this.error.show = false;
            }, time);
        },
        errorInternal(error: any) {
            if (error) console.error(error?.message);
            this.messageShowTime('Erro interno, tente novamente mais tarde!', 'danger', 3000);
        },
        errorAuth() {
            this.messageShowTime('Email ou senha incorreto, por favor verifique!', 'danger', 3000);
        }
    },
});