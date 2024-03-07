import { defineComponent } from 'vue';
import { Api, Status } from '@/class';
import { AxiosResponse } from 'axios';
import { MixinMessage } from "@/mixins";

export default defineComponent({
    data: () => ({
        listStatus: new Array<Status>(),
        optionsStatus: new Array<{ value: number | undefined, text: string | undefined }>()
    }),
    mixins: [ MixinMessage ],
    methods: {
        getStatus() {
            const api = new Api();
            
            api.status
                .findAll()
                .then((response: AxiosResponse) => {
                    this.listStatus = response.data;
                    this.gerarListaStatusOptions();
                })
                .catch((error) => {
                    console.log(error);
                    this.MSGerrorInternal(error);
                });
        },

        gerarListaStatusOptions() {
            this.listStatus.forEach((item: Status) => {
                this.optionsStatus.push({ value: item.codigo, text: item.descricao });
            });
        }
    },
    created(){
        this.getStatus();
    }

});