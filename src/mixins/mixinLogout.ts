import { defineComponent } from 'vue';
import { LocalStorage } from "@/class/LocalStogare";

export default defineComponent({
    methods: {
        logout() {
            const localStogare = new LocalStorage();

            localStogare.tokenClear();
            this.$router.push({ name: 'Login' });
        }
    }

});