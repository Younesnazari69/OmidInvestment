<template>
  <EasyDataTable v-model:server-options="serverOptions" :headers="headers" :items="items"
    :server-items-length="serverItemsLength" :loading="loading" buttons-pagination>
    <template #item-content="item">
      <img :width="100" :src="item.content" />
    </template>
    <template #item-operation="item">
      <div class="operation-wrapper">
        <a :href="item.content" :download="'Omid_file' + item.contentType" target="_blank" rel="noopener noreferrer">
          <button class="btn btn-sm btn-success ">
            <McFileDownloadLine />
          </button>
        </a>
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
import { useRouter, useRoute } from "vue-router";
import type { Header, Item, ServerOptions } from "vue3-easy-data-table";
import { BsTrash, AkEdit, FlAddSquare, McFileDownloadLine } from '@kalimahapps/vue-icons';
export default defineComponent({
  components: {
    BsTrash,
    FlAddSquare, McFileDownloadLine
  },
  setup() {
    const router = useRouter();
    const route = useRoute()
    const store = useDataStore();
    const headers: Header[] = [
      { text: "فایل", value: 'content', sortable: true },
      { text: "نوع فایل", value: 'formFileType', sortable: true },
      //{ text: "استان", value: 'contentType', sortable: true },
      { text: "عملیات", value: "operation" },
    ];
    const items = ref<Item[]>([]);
    const loading = ref<Boolean>(false);
    const serverItemsLength = ref<Number>(0);
    const serverOptions = ref<ServerOptions>({
      page: 1,
      rowsPerPage: 5,
    });
    const id = route.params.id;
    const type = route.params.type;

    const FechData = async () => {
      debugger
      //const { page, rowsPerPage, sortBy, sortType } = serverOptions.value;
      loading.value = true;
      return store.FechFiles(serverOptions.value, type, id).then(() => {
        items.value = store.FilesData.FilesList;
        serverItemsLength.value = store.FilesData.serverTotalItemsLength;
        loading.value = false;
      });
    };
    const deleteItem = (val: string) => {
      return store.DeleteFiles(val).then(() => {
        FechData();
      });
    };

    // const editItem = (val: string) => {
    //   router.push({ name: "FilesForm" , params: { id: val }});
    // };
    // const AddItem = () => {
    //   router.push({ name: "FilesForm" , params: { id: "null" }});
    // };

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
      // editItem, AddItem
    };
  },
});
</script>
