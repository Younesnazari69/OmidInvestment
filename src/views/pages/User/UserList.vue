<template>
  <button @click="AddItem" class="btn btn-sm btn-success ">
    <FlAddSquare />
  </button>
  <EasyDataTable v-model:server-options="serverOptions" :headers="headers" :items="items"
    :server-items-length="serverItemsLength" :loading="loading" buttons-pagination>
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
import type { Header, Item, ServerOptions } from "vue3-easy-data-table";
import { BsTrash, AkEdit, FlAddSquare } from '@kalimahapps/vue-icons';
export default defineComponent({
  name: "UserList",
  components: {
    BsTrash,
    AkEdit,
    FlAddSquare
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

    const FechData = async () => {
      debugger
      //const { page, rowsPerPage, sortBy, sortType } = serverOptions.value;
      loading.value = true;
      return store.FechAllUsers(serverOptions.value).then(() => {
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
      router.push({ name: "UserForm" , params: { guid: val }});
    };
    const AddItem = () => {
      router.push({ name: "UserForm" , params: { guid: "null" }});
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
