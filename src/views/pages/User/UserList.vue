<template>
  <div class="card shadow-sm">
    <div class="card-header">
      <h3 class="card-title">
        جستجو
      </h3>
    </div>
    <div class="card-body">
      <!--begin::Heading-->
      <div class="row fv-row mb-7">
        <div class="col-xl-4">
          <label class="form-label fw-bold text-dark fs-6">فیلد جستجو</label>
          <model-select class="form-control form-control-lg form-control-solid" :options="headers"
            v-model="filter.searchField">
          </model-select>
        </div>
        <div v-if="filter.searchField=='firstname'" class="col-xl-4">
          <label class="form-label fw-bold text-dark fs-6">مقدار جستجو</label>
          <input class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="firstname"
            v-model="filter.searchValue" autocomplete="off" />
        </div>
        <div v-else class="col-xl-4">
          <label class="form-label fw-bold text-dark fs-6">مقدار جستجو</label>
          <input class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="lastname"
            v-model="filter.searchValue" autocomplete="off" />
        </div>
      </div>
    </div>
  </div>
  <button @click="AddItem" class="btn btn-sm btn-success ">
    <FlAddSquare />
  </button>
  <EasyDataTable v-model:server-options="serverOptions" :headers="headers" :items="items"
    :server-items-length="serverItemsLength" :loading="loading" buttons-pagination show-index
    :search-field="filter.searchField" :search-value="filter.searchValue">
    <!-- <template #header-firstname="header">
      <div class="filter-column">
        <img
          src="./eglass-filter.png"
          class="filter-icon"
          @click="showFirstnameFilter = !showFirstnameFilter"
        />
        {{ header.text }}
        <div class="filter-menu" v-if="showFirstnameFilter">
          <input v-model="filter.Firstname"/>
        </div>
      </div>
    </template> -->
    <template #item-operation="item">
      <div class="operation-wrapper">
        <button @click="deleteItem(item.guid)" class="btn btn-sm btn-danger ">
          <BsTrash />
        </button>
        <button @click="editItem(item.guid)" class="btn btn-sm btn-primary">
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
import { ModelSelect } from "vue-search-select"
import type { Header, Item, ServerOptions, FilterOption } from "vue3-easy-data-table";
import { BsTrash, AkEdit, FlAddSquare } from '@kalimahapps/vue-icons';
export default defineComponent({
  name: "UserList",
  components: {
    BsTrash,
    AkEdit,
    FlAddSquare,
    ModelSelect
  },
  setup() {
    const router = useRouter();
    const store = useDataStore();
    const headers: Header[] = [
      { text: "نام", value: 'firstname', sortable: true },
      { text: "نام خانوادگی", value: 'lastname', sortable: true },
      { text: "عنوان شغلی", value: 'jobTitle', sortable: true },
      { text: "پست الکترونیک", value: 'email', sortable: true },
      { text: "تلفن همراه", value: 'mobile', sortable: true },
      { text: "عملیات", value: "operation" },
    ];
    const items = ref<Item[]>([]);
    const loading = ref<Boolean>(false);
    const serverItemsLength = ref<Number>(0);
    const serverOptions = ref<ServerOptions>({
      page: 1,
      rowsPerPage: 10,
    });
    const filter = ref<any | object>({
      searchField: '',
      searchValue: '',
    });

    // const filter = ref<any|object>({
    //   Firstname: '',
    //   Lastname: '',
    // });
    // const filterOptions = computed((): FilterOption[] => {
    //   const filterOptionsArray: FilterOption[] = [];
    //   filterOptionsArray.push({
    //     field: 'firstname',
    //     comparison: '=',
    //     criteria: filter.Firstname,
    //   });
    //   filterOptionsArray.push({
    //     field: 'lastname',
    //     comparison: '=',
    //     criteria: filter.Lastname,
    //   });
    //   return filterOptionsArray;
    // });
    // const showFirstnameFilter = ref(false);
    // const showLastnameFilter = ref(false);

    const FechData = async () => {
      //const { page, rowsPerPage, sortBy, sortType } = serverOptions.value;
      debugger
      loading.value = true;
      return store.FechAllUsers(serverOptions.value, filter).then(() => {
        items.value = store.AllUsersData.AllUserList;
        serverItemsLength.value = store.AllUsersData.serverTotalItemsLength;
        loading.value = false;
      });
    };
    const deleteItem = (val: string) => {
      return store.DeleteUser(val).then(() => {
        FechData();
      });
    };

    const editItem = (val: string) => {
      router.push({ name: "UserForm", params: { guid: val } });
    };
    const AddItem = () => {
      router.push({ name: "UserForm", params: { guid: "null" } });
    };

    // initial load
    FechData();
    watch([serverOptions,filter], (value) => { FechData(); }, { deep: true });

    return {
      headers,
      items,
      serverOptions,
      // showFirstnameFilter,
      //  showLastnameFilter,
      filter,
      // filterOptions,
      serverItemsLength,
      loading,
      deleteItem,
      editItem,
      AddItem
    };
  },
});
</script>
