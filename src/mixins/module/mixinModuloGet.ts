import { defineComponent } from 'vue';
import { LocalStorage } from "@/class/LocalStogare";

export default defineComponent({
    methods: {
        getModule() {
            const localStorage = new LocalStorage();
            return localStorage.modulo;
        }
    }
});