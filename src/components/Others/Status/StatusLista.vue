<template>
  <div class="box bg-light h-100 m-3 border rounded-3">Status list</div>
</template>

<script lang="ts">
import { Api } from "@/class";
import { defineComponent } from "vue";

export default defineComponent({
  name: "StatusLista",
  data: () => ({
    registros: [],
  }),
  beforeCreate() {
    console.clear();

    const api = new Api();

    // api.status
    //   .findAll()
    //   .then((res: any) => console.table(res?.data))
    //   .catch((error: any) => console.error(error));

    // api.status
    //   .findOne(1)
    //   .then((res: any) => console.table(res?.data))
    //   .catch((error: any) => console.error(error));

    // api.status
    //   .updateOne(1, { tipo: 123 })
    //   .then((res: any) => console.table(res?.data))
    //   .catch((error: any) => console.error(error));

    // api.status
    //   .createOne({ descricao: "Teste app", tipo: 123 })
    //   .then((res: any) => console.table(res?.data))
    //   .catch((error: any) => console.error(error));

    api.status
      .deleteOne(1)
      .then((res: any) => console.table(res?.data))
      .catch((error: any) => console.error(error));
  },
});
</script>
