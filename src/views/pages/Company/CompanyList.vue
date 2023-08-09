<template>
  <button @click="AddItem" class="btn btn-sm btn-success ">
    <FlAddSquare />
  </button>
  <EasyDataTable v-model:server-options="serverOptions" :headers="headers" :items="items"
    :server-items-length="serverItemsLength" :loading="loading" buttons-pagination>
    <template #item-operation="item">
      <div class="operation-wrapper">
        <button @click="deleteItem(item.id)" class="btn btn-sm btn-danger ">
          <BsTrash />
        </button>
        <button @click="editItem(item.id)" class="btn btn-sm btn-primary">
          <AkEdit />
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
  name: "CompanyList",
  components: {
    BsTrash,
    AkEdit,
    FlAddSquare
  },
  setup() {
    const router = useRouter();
    const store = useDataStore();
    const headers: Header[] = [
      { text: "نام شرکت", value: 'companyName', sortable: true },
      { text: "شناسه ملی", value: 'nationalCode', sortable: true },
      { text: "شرکت پدر", value: 'companyFather', sortable: true },
      { text: "هلدینگ", value: 'holdingID', sortable: true },
      { text: "نوع شرکت", value: 'companyType', sortable: true },
      { text: "سطح شرکت", value: 'companyLevel', sortable: true },
      { text: "وضعیت", value: 'companystatus', sortable: true },
      { text: "نوع صنعت", value: 'industryType', sortable: true },
      { text: "نوع بازار", value: 'marketType', sortable: true },

      { text: "عملیات", value: "operation" },
    ];
    const items = ref<Item[]>([]);
    const loading = ref<Boolean>(false);
    const serverItemsLength = ref<Number>(0);
    const serverOptions = ref<ServerOptions>({
      page: 1,
      rowsPerPage: 10,
    });

    const FechData = async () => {
      //const { page, rowsPerPage, sortBy, sortType } = serverOptions.value;
      loading.value = true;
      return store.FechCompanys(serverOptions.value).then(() => {
        items.value = store.CompanysData.CompanyList;
        serverItemsLength.value = store.CompanysData.serverTotalItemsLength;
        loading.value = false;
      });
    };
    const deleteItem = (val: string) => {
      return store.DeleteCompany(val).then(() => {
        FechData();
      });
    };

    const editItem = (val: string) => {
      router.push({ name: "CompanyForm" , params: { id: val }});
    };
    const AddItem = () => {
      router.push({ name: "CompanyForm" , params: { id: "null" }});
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
      editItem, AddItem
    };
  },
});
</script>
