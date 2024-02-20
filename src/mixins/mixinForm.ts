import { defineComponent } from 'vue';

export default defineComponent({
    data: () => ({
        disabled: false,
    }),
    props: {
        propsCadastro: {
            type: Boolean /* true - Cadastro | false - Edição */,
            required: false,
        },
        propsDisabled: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        title() {
            if (this.propsCadastro) {
                return "Cadastro";
            } else {
                if (this.disabled) {
                    return "Consulta";
                } else {
                    return "Edição";
                }
            }
        },
    },
    created() {
        /* Desabilita ou habilita os campos */
        this.disabled = this.propsDisabled;
    }
});