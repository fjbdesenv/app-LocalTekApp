<template>
  <b-container fluid class="d-flex align-items-center justify-content-center h-100">
    <b-row>
      <b-col cols="12">
        <b-container class="w-100">
          <FormLogin v-if="!loggingIn && !error.show" @login="login" />
          <AlertMessage v-if="error.show" :message="error.message" :type="error.type" />
          <Loading v-if="loggingIn" />
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import FormLogin from "@/components/Forms/FormLogin.vue";
import Loading from "@/components/Loadings/Loading.vue";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";
import { defineComponent } from "vue";
import { BContainer, BRow, BCol } from "bootstrap-vue-next";
import { Login } from "@/interfaces";
import { Api, LocalStorage } from "@/class";
import { AxiosError } from "axios";
import mixinErro from "@/mixins/mixinErro";

export default defineComponent({
  name: "LoginView",
  data: () => ({
    loggingIn: false,
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

        await api
          .auth(form)
          .then((res) => {
            const token = res.data?.token;
            const localStorage = new LocalStorage();
            const typeToken = typeof token;

            if (token && typeToken === "string") localStorage.token = token;
            else throw new Error(`Token type is invalid. \nType: ${typeToken}`);

            this.$router.push({ name: "Home" });
          })
          .catch((error: AxiosError) => {
            if (error.response?.status == 401) {
              this.errorAuth();
            } else {
              throw error;
            }
          });
      } catch (error) {
        this.errorInternal(error);
      }
      this.loggingIn = false;
    },
  },
  mixins: [mixinErro],
  beforeCreate() {
    const localStorage = new LocalStorage();
    if (typeof localStorage.token == "string") this.$router.push({ name: "Home" });
  },
});
</script>
