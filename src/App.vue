<template>
  <div>
    <div>
      <b-card title="Card Title" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top tag="article"
        style="max-width: 20rem;" class="mb-2">
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>

        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
      <div>
        <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
          <b-dropdown-item>First Action</b-dropdown-item>
          <b-dropdown-item>Second Action</b-dropdown-item>
          <b-dropdown-item>Third Action</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item active>Active action</b-dropdown-item>
          <b-dropdown-item disabled>Disabled action</b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="container">
        Progresso: <b-progress value="90" max="100" show-progress animated></b-progress>
      </div>
      <BIconArrowRepeat></BIconArrowRepeat>

      <b-container fluid class="bg-light  ">
        <b-row>
          <b-col md="4" class="py-4">
            <b-button id="button-1" variant="outline-success">Live chat</b-button>
          </b-col>
          <b-col md="4" class="py-4">
            <b-button id="button-2" variant="outline-success">Html chat</b-button>
          </b-col>
          <b-col md="4" class="py-4">
            <b-button id="button-3" variant="outline-success">Alternative chat</b-button>
          </b-col>
        </b-row>

        <!-- Tooltip title specified via prop title -->
        <b-tooltip target="button-1" title="Online!"></b-tooltip>

        <!-- HTML title specified via default slot -->
        <b-tooltip target="button-2" placement="bottom">
          Hello <strong>World!</strong>
        </b-tooltip>

        <!-- Tooltip for an element identified by ref -->
        <b-tooltip target="button-3" title="Alternative!"></b-tooltip>
      </b-container>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BCard, BCardText, BButton, BDropdown, BDropdownItem, BDropdownDivider, BProgress, BContainer, BRow, BTooltip } from "bootstrap-vue-next";
import { BIconArrowRepeat } from "bootstrap-icons-vue";


export default defineComponent({
  name: 'App',
  components: {
    BCard,
    BCardText,
    BButton,
    BDropdown,
    BDropdownItem,
    BDropdownDivider,
    BProgress,
    BIconArrowRepeat,
    BTooltip,
    BRow,
    BContainer
  }
});
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.css";
@import "../node_modules/bootstrap-vue-next/dist/bootstrap-vue-next.css";
</style>
