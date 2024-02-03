<template>
    <b-container :class="`alert alert-${type} p-3 `">
      <BIconExclamationCircleFill variant="danger" class="h3" /> {{ message }}
    </b-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BContainer } from 'bootstrap-vue-next';
import { BIconExclamationCircleFill } from 'bootstrap-icons-vue';

export default defineComponent({
  name: 'AlertMessage',
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true
    }
  },
  components: {
    BIconExclamationCircleFill,
    BContainer,
  }

});
</script>
