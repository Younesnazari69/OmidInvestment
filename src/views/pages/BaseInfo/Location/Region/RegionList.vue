<template>
    <EasyDataTable v-model:server-options="serverOptions" :headers="headers" :items="items"
      :server-items-length="serverItemsLength" :loading="loading" buttons-pagination>
      <template #header-operation="header">
      <!-- {{ header.text }} -->
      <button @click="AddItem" class="btn btn-sm btn-success ">
        <FlAddSquare />
      </button>
    </template>
      <template #item-operation="item">
        <div class="operation-wrapper">
          <button @click="editItem(item.id)" class="btn btn-sm btn-primary">
            <AkEdit />
          </button>
          <button @click="deleteItem(item.id)" class="btn btn-sm btn-danger ">
            <BsTrash />
          </button>
        </div>
      </template>
    </EasyDataTable>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, watch, onMounted, reactive } from "vue";
  import { useDataStore } from "@/stores/Data";
  import { useRouter } from "vue-router";
  import type { Header, Item, ServerOptions } from "vue3-easy-data-table";
  import { BsTrash, AkEdit, FlAddSquare } from '@kalimahapps/vue-icons';
  export default defineComponent({
    name: "RegionList",
    components: {
      BsTrash,
      AkEdit,
      FlAddSquare
    },
    setup() {
      const router = useRouter();
      const store = useDataStore();
      const headers: Header[] = [
        { text: "نام", value: 'name', sortable: true,width:800 },
        { text: "عملیات", value: "operation" },
      ];
      const items = ref<Item[]>([]);
      const loading = ref<Boolean>(false);
      const serverItemsLength = ref<Number>(0);
      const serverOptions = ref<ServerOptions>({
        page: 1,
        rowsPerPage: 10,
      });
  
      const FechData= async () => {
        loading.value = true;
        return store.FechRegions(serverOptions.value).then(() => {
          items.value = store.RegionsData.List;
          serverItemsLength.value = store.RegionsData.serverTotalItemsLength;
          loading.value = false;
        });
      };
      const deleteItem = (val: Number) => {
        return store.DeleteRegion(val).then(() => {
          FechData();
        });
      };
  
      const editItem = (val: string) => {
        router.push({ name: "RegionForm" , params: { id: val }});
      };
      const AddItem = () => {
        router.push({ name: "RegionForm" , params: { id: "null" }});
      };
      // initial load
      FechData();
      watch(serverOptions, (value) => { FechData(); }, { deep: true });
  
      return {
        headers,
        items,
        serverOptions,
        serverItemsLength,
        loading,
        deleteItem,
        editItem,
        AddItem
      };
    },
  });
  </script>
  