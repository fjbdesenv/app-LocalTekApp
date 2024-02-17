import { defineComponent } from 'vue';
import { LocalStorage } from "@/class/LocalStogare";

export default defineComponent({
    beforeUnmount() {
        const localStorage = new LocalStorage();
        localStorage.moduloClear();
    }
});
