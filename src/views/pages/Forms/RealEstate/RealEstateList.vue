<template>
  <button @click="AddItem" class="btn btn-sm btn-success ">
    <FlAddSquare />
  </button>
  <EasyDataTable v-model:server-options="serverOptions" :headers="headers" :items="items"
    :server-items-length="serverItemsLength" :loading="loading" buttons-pagination>
    <template #item-operation="item">
      <div class="operation-wrapper">
        <button @click="ShowFiles(item.id)" class="btn btn-sm btn-success">
          <PhThinFiles />
        </button>
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
import { BsTrash, AkEdit, FlAddSquare, PhThinFiles } from '@kalimahapps/vue-icons';
export default defineComponent({
  components: {
    BsTrash,
    AkEdit,
    FlAddSquare, PhThinFiles
  },
  setup() {
    const router = useRouter();
    const store = useDataStore();
    const headers: Header[] = [
      { text: "شرکت", value: 'company', sortable: true },
      { text: "استان", value: 'province', sortable: true },
      { text: "شهر", value: 'City', sortable: true },
      { text: "عنوان", value: 'Title', sortable: true },
      { text: "مالک", value: 'OwnerName', sortable: true },
      { text: "پلاک ثبتی", value: 'RegistrationPlate', sortable: true },
      { text: "تلفن همراه نماینده", value: 'representativeMobile', sortable: true },
      { text: "نماینده شرکت ( مالک ) جهت بازدید", value: 'companyRepresentative_owner_ToVisit', sortable: true },
      { text: "عملیات", value: "operation" },
    ];
    const items = ref<Item[]>([]);
    const loading = ref<Boolean>(false);
    const serverItemsLength = ref<Number>(0);
    const serverOptions = ref<ServerOptions>({
      page: 1,
      rowsPerPage: 5,
    });


    const FechData = async () => {
      debugger
      //const { page, rowsPerPage, sortBy, sortType } = serverOptions.value;
      loading.value = true;
      return store.FechRealEstates(serverOptions.value).then(() => {
        items.value = store.RealEstatesData.RealEstateList;
        serverItemsLength.value = store.RealEstatesData.serverTotalItemsLength;
        loading.value = false;
      });
    };
    const deleteItem = (val: string) => {
      return store.DeleteRealEstate(val).then(() => {
        FechData();
      });
    };

    const editItem = (val: string) => {
      router.push({ name: "RealEstateForm", params: { id: val } });
    };
    const AddItem = () => {
      router.push({ name: "RealEstateForm", params: { id: "null" } });
    };
    const ShowFiles = (val: string) => {
      router.push({ name: "FilesList", params: { id: val ,type:"RealEstate"} });
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
      AddItem,
      ShowFiles
    };
  },
});
</script>
