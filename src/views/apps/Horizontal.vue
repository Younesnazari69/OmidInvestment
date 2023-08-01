<template>
  <EasyDataTable :headers="headers" :items="items">
    <template #item-operation="item">
      <div class="operation-wrapper">
        <button @click="deleteItem(item)">del</button>
        <button @click="deleteItem(item)">edit</button>

      </div>
    </template>
  </EasyDataTable>
</template>

<script lang="ts">
import { reactive, onMounted, ref } from "vue";
import { useDataStore } from "@/stores/Data";
import type { Header, Item } from "vue3-easy-data-table";
//import Vue3EasyDataTable from 'vue3-easy-data-table';

export default {
  name: "App",
  // components: {
  //   Vue3EasyDataTable
  //   },
  setup() {
    const store = useDataStore();
    const headers: Header[] = [
      { text: "نام کامل", value: 'fullname', sortable: true },
      { text: "نام", value: 'firstname', sortable: true },
      { text: "نام خانوادگی", value: 'lastname', sortable: true },
      { text: "عنوان شغلی", value: 'jobTitle', sortable: true },
      { text: "Operation", value: "operation" },

    ];


    let items = ref([]);

    onMounted(() => {
      store.FechPublicUsers(1, 10).then(() => {
        debugger
        items.value = store.PublicUserList;
      });
    });
    const deleteItem = (val: Item) => {
      console.log(val);
    };

    const editItem = (val: Item) => {
      console.log(val);
    };
    return {
      headers,
      items,
      deleteItem,
      editItem
    };
  },
};
</script>