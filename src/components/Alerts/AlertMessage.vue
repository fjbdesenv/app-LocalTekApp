<template>
  <b-container :class="`alert alert-${type} p-3 `">
    <BIconExclamationCircleFill :variant="type" class="h3" /> {{ message }}
    <b-button v-if="link" class="btn btn-close mx-2" @click="toGoBack"></b-button>
  </b-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BContainer, BButton } from 'bootstrap-vue-next';
import { BIconExclamationCircleFill } from 'bootstrap-icons-vue';

export default defineComponent({
  name: 'AlertMessage',
  props: {
    message: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    type: {
      type: String,
      required: true
    }
  },
  components: {
    BIconExclamationCircleFill,
    BContainer,
    BButton
  },
  methods:{
    toGoBack(){
      if(this.link) this.$router.push({ name: this.link });
    }
  }

});
</script>
