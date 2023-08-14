<template>
  <div class="card-toolbar">
    <button tabindex="3" type="button" @click="ReternToList" class="btn btn-lg btn-warning">
      <span class="indicator-label"> بازگشت </span>
    </button>
  </div>
  <EasyDataTable v-model:server-options="serverOptions" :headers="headers" :items="items"
    :server-items-length="serverItemsLength" :loading="loading" buttons-pagination>
    <template #item-content="item">
      <div v-if="item.contentType == 'image/jpeg'">
        <img :width="100" :src="FechFile(item.urlFileName, item.contentType)" />
      </div>
      <div v-if="item.contentType == 'application/pdf'">
        <!-- <embed :src="FechFile(item.id)" :width="100" type="application/pdf" /> -->
        <VsFileTypePdf :width="200" />
      </div>
    </template>
    <template #item-operation="item">
      <div class="operation-wrapper">
        <a :href="FechFile(item.urlFileName, item.contentType)" :download="'Omid_file' + item.contentType" target="_blank"
          rel="noopener noreferrer">
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
import { BsTrash, AkEdit, FlAddSquare, McFileDownloadLine, VsFileTypePdf } from '@kalimahapps/vue-icons';
export default defineComponent({
  components: {
    BsTrash,
    FlAddSquare, McFileDownloadLine, VsFileTypePdf
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
      rowsPerPage: 10,
    });
    const id = route.params.id;
    const type = route.params.type;

    const FechData = async () => {
      loading.value = true;
      return store.FechFiles(serverOptions.value, type, id).then(() => {
        items.value = store.FilesData.FilesList;
        serverItemsLength.value = store.FilesData.serverTotalItemsLength;
        loading.value = false;
      });
    };
    async function FechFile(urlFileName, contentType) {
    let file= await store.FechFile(urlFileName).then(res => {
        var blob = new Blob([res.data], {
          type: contentType,
        });
        const data = URL.createObjectURL(blob);
        return data;
      });
      return file
    }

    const deleteItem = (val: string) => {
      return store.DeleteFiles(val).then(() => {
        FechData();
      });
    };
    const ReternToList = () => {
      router.go(-1)
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
      ReternToList,
      FechFile
      // editItem, AddItem
    };
  },
});
</script>
