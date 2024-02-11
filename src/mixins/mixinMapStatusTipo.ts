import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        mapeamentoStatusTipo(tipo: number | undefined): string {
            /* Mepear os tipos de status */
            if (tipo) {
                switch (tipo) {
                    case 1:
                        return "Padrão";
                    case 2:
                        return "Remessa";
                    case 3:
                        return "Especificidade";
                }
            }

            return "";
        }
    }
});