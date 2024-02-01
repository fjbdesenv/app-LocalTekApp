<template>
  <b-container id="login-view" fluid class="d-flex align-items-center justify-content-center h-100">
    <b-row>
      <b-col cols="12">
        <b-container class="w-100">
          <FormLogin v-if="!loggingIn" @login="login" />
          <Loading v-else />
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BContainer, BRow, BCol } from 'bootstrap-vue-next';
import FormLogin from '@/components/Forms/FormLogin.vue';
import Loading from '@/components/Loadings/Loading.vue';
import { Login } from '@/interfaces/Login'

export default defineComponent({
  name: 'LoginView',
  data: () => ({
    form: {
      email: '',
      senha: ''
    },
    loggingIn: false
  }),
  components: {
    FormLogin,
    Loading,
    BContainer,
    BRow,
    BCol,
  },
  methods: {
    login(form: Login) {
      this.loggingIn = true;
      setTimeout(() => this.loggingIn = false, 5000);
    }
  }
});
</script>
