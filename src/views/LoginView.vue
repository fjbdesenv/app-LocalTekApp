<template>
  <b-container id="login-view" fluid class="d-flex align-items-center justify-content-center h-100">
    <b-row>
      <b-col cols="12">
        <b-container class="w-100">
          {{ loggingIn }} - {{ error.show }}
          <FormLogin v-if="!loggingIn && !error.show" @login="login" />
          <AlertMessage v-if="error.show" :message="error.message" />
          <Loading v-if="loggingIn" />
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import FormLogin from '@/components/Forms/FormLogin.vue';
import Loading from '@/components/Loadings/Loading.vue';
import AlertMessage from '@/components/Alerts/AlertMessage.vue';
import { defineComponent } from 'vue';
import { BContainer, BRow, BCol } from 'bootstrap-vue-next';
import { Login } from '@/interfaces';
import { Api } from "@/class/Api";
import { AxiosError } from 'axios';

export default defineComponent({
  name: 'LoginView',
  data: () => ({
    loggingIn: false,
    error: {
      show: false,
      message: ''
    }
  }),
  components: {
    FormLogin,
    Loading,
    AlertMessage,
    BContainer,
    BRow,
    BCol,
  },
  methods: {
    login(form: Login) {
      this.loggingIn = true;
      this.auth(form);
    },
    async auth(form: Login) {
      try {
        const api = new Api();

        await api.auth(form)
          .then(res => {
            
            // Fazer
            console.log(res.data);
          }).catch((error: AxiosError) => {

            if (error.response?.status == 401) {
              this.showErro('Email ou senha incorreto, por favor verifique!');
            } else {
              throw error;
            }

          });
      } catch (error) {
        this.showErro('Erro interno, tente novamente mais tarde!');
      }
      this.loggingIn = false;
    },

    showErro(message: string) {
      this.error.show = true;
      this.error.message = message;
      setTimeout(() => {
        this.error.show = false;
      }, 3000);
    }
  }
});
</script>
