<template>
    <b-form class="bg-info-subtle m-3 border rounded-3 p-5" @submit="onSubmit">

        <h1 class="text-center">Login</h1>

        <b-form-group id="input-group-1" label="Email" label-for="email">
            <b-form-input id="email" v-model="form.email" type="email" placeholder="Email" required
                size="lg"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Senha" label-for="senha">
            <b-form-input id="senha" v-model="form.senha" type="password" placeholder="Senha" required size="lg">
            </b-form-input>
        </b-form-group>

        <b-container class="d-flex justify-content-center  mt-3 ">
            <b-button squared type="submit" variant="primary" size="lg"> Logar </b-button>
        </b-container>

    </b-form>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { BContainer, BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue-next';

export default defineComponent({
    name: 'FormLogin',
    data: () => ({
        form: {
            email: '',
            senha: ''
        }
    }),
    components: {
        BContainer,
        BForm,
        BFormGroup,
        BFormInput,
        BButton
    },
    methods: {
        onSubmit(event: Event) {
            event.preventDefault();
            this.$emit('login', this.form);
        }
    }
});
</script>
