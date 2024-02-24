import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        propsTableName: {
            type: String,
            required: true,
        },
    },
});