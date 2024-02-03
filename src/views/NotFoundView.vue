<template>
  <b-container fluid class="d-flex align-items-center justify-content-center h-100">
    <b-row>
      <b-col cols="12">
        <b-container class="w-100">
          <AlertMessage message="Página não encontrada!" link="Home" type="danger" />
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BContainer, BRow, BCol } from 'bootstrap-vue-next';
import AlertMessage from '@/components/Alerts/AlertMessage.vue';

export default defineComponent({
  name: 'NotFoundView',
  components: {
    AlertMessage,
    BContainer,
    BRow,
    BCol,
  },
});
</script>
