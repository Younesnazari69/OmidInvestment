<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <!--begin::Heading-->
      <div class="row fv-row mb-7">
        <div class="col-xl-4">
          <label class="form-label fw-bold text-dark fs-6">فیلد جستجو</label>
          <!-- <model-select class="form-control form-control-lg form-control-solid" :options="headers"
            v-model="filter.searchField">
          </model-select> -->
          <multi-select class="form-control form-control-sm form-control-solid" :options="filteroptions"
            :selected-options="filter.searchFields" placeholder="select item" @select="onSelect">
          </multi-select>
        </div>
        <template v-for="(searchFields, index) in filter.searchFields">
          <div v-if="searchFields.value == 'firstname'" class="col-xl-4">
            <label class="form-label fw-bold text-dark fs-6">نام</label>
            <div class="row">
              <div class="col-xl-2">
                <select class="form-control form-control-sm form-control-solid" name="f-Oparation"
                  v-model="filter.searchValue.firstname.oparation">
                  <option value="in">in</option>
                  <option value="="> = </option>
                  <option value="!="> != </option>
                </select>
              </div>
              <div class="col-xl-10">
                <input class="form-control form-control-sm form-control-solid" type="text" placeholder="" name="firstname"
                  v-model="filter.searchValue.firstname.value" autocomplete="off" />
              </div>
            </div>

          </div>
          <div v-if="searchFields.value == 'lastname'" class="col-xl-4">
            <label class="form-label fw-bold text-dark fs-6">نام خانوادگی</label>
            <div class="row">
              <div class="col-xl-2">
                <select class="form-control form-control-sm form-control-solid" name="l-Oparation"
                  v-model="filter.searchValue.lastname.oparation">
                  <option value="in">in</option>
                  <option value="="> = </option>
                  <option value="!="> != </option>
                </select>
              </div>
              <div class="col-xl-10">
                <input class="form-control form-control-sm form-control-solid" type="text" placeholder="" name="lastname"
                  v-model="filter.searchValue.lastname.value" autocomplete="off" />
              </div>
            </div>

          </div>
          <div v-if="searchFields.value == 'jobTitle'" class="col-xl-4">
            <label class="form-label fw-bold text-dark fs-6">عنوان شغلی</label>
            <div class="row">
              <div class="col-xl-2">
                <select class="form-control form-control-sm form-control-solid" name="j-Oparation"
                  v-model="filter.searchValue.jobTitle.oparation">
                  <option value="in">in</option>
                  <option value="="> = </option>
                  <option value="!="> != </option>
                </select>
              </div>
              <div class="col-xl-10">
                <input class="form-control form-control-sm form-control-solid" type="text" placeholder="" name="jobTitle"
                  v-model="filter.searchValue.jobTitle.value" autocomplete="off" />
              </div>
            </div>

          </div>
          <div v-if="searchFields.value == 'email'" class="col-xl-4">
            <label class="form-label fw-bold text-dark fs-6">پست الکترونیک</label>
            <div class="row">
              <div class="col-xl-2">
                <select class="form-control form-control-sm form-control-solid" name="e-Oparation"
                  v-model="filter.searchValue.email.oparation">
                  <option value="in">in</option>
                  <option value="="> = </option>
                  <option value="!="> != </option>
                </select>
              </div>
              <div class="col-xl-10">
                <input class="form-control form-control-sm form-control-solid" type="text" placeholder="" name="email"
                  v-model="filter.searchValue.email.value" autocomplete="off" />
              </div>
            </div>
          </div>
          <div v-if="searchFields.value == 'mobile'" class="col-xl-4">
            <label class="form-label fw-bold text-dark fs-6">موبایل</label>
            <div class="row">
              <div class="col-xl-2">
                <select class="form-control form-control-sm form-control-solid" name="m-Oparation"
                  v-model="filter.searchValue.mobile.oparation">
                  <option value="in">in</option>
                  <option value="="> = </option>
                  <option value="!="> != </option>
                </select>
              </div>
              <div class="col-xl-10">
                <input class="form-control form-control-sm form-control-solid" type="text" placeholder="" name="mobile"
                  v-model="filter.searchValue.mobile.value" autocomplete="off" />
              </div>
            </div>
          </div>
        </template>

      </div>
      <div class="card-footer">
        <div class="text-center">
          <!--begin::Submit button-->
          <button type="button" id="kt_sign_in_submit" @click="OnSearch" class="btn btn-sm btn-success m-1">
            <span class="indicator-label"> جستجو </span>
          </button>
          <button type="button" id="kt_sign_in_submit" @click="OnClearSearch" class="btn btn-sm btn-warning m-1">
            <span class="indicator-label"> پاک کردن فیلتر ها </span>
          </button>
          <!--end::Submit button-->
        </div>
      </div>
    </div>
  </div>
  <EasyDataTable v-model:server-options="serverOptions" :headers="headers" :items="items"
    :server-items-length="serverItemsLength" :loading="loading" buttons-pagination show-index
    :search-field="filter.searchField" :search-value="filter.searchValue">
    <template #header-operation="header">
      <!-- {{ header.text }} -->
      <button @click="AddItem" class="btn btn-sm btn-success ">
        <FlAddSquare />
      </button>
    </template>
    <template #item-operation="item">
      <div class="operation-wrapper">

        <button @click="editItem(item.guid)" class="btn btn-sm btn-primary">
          <AkEdit />
        </button>
        <button @click="deleteItem(item.guid)" class="btn btn-sm btn-danger ">
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
import { MultiSelect } from 'vue-search-select'

import type { Header, Item, ServerOptions, FilterOption } from "vue3-easy-data-table";
import { BsTrash, AkEdit, FlAddSquare } from '@kalimahapps/vue-icons';
export default defineComponent({
  name: "UserList",
  components: {
    BsTrash,
    AkEdit,
    FlAddSquare,
    MultiSelect
  },
  setup() {
    const router = useRouter();
    const store = useDataStore();
    const filteroptions: object[] = [
      { text: "نام", value: 'firstname' },
      { text: "نام خانوادگی", value: 'lastname' },
      { text: "عنوان شغلی", value: 'jobTitle' },
      { text: "پست الکترونیک", value: 'email' },
      { text: "تلفن همراه", value: 'mobile' },
    ];
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
    const serverOptions = ref<ServerOptions>({ page: 1, rowsPerPage: 10, });
    const DefaultsearchValue = {
      firstname: { value: '', oparation: '' },
      lastname: { value: '', oparation: '' },
      jobTitle: { value: '', oparation: '' },
      email: { value: '', oparation: '' },
      mobile: { value: '', oparation: '' },
    }
    const filter = ref<any | object>({
      searchFields: [],
      searchValue: DefaultsearchValue,
    });
    function onSelect(items, lastSelectItem) {
      filter.value.searchFields = items
      lastSelectItem = lastSelectItem
    }
    const FechData = async (ResultType: string) => {
      //const { page, rowsPerPage, sortBy, sortType } = serverOptions.value;
      debugger
      loading.value = true;
      return store.FechAllUsers(serverOptions.value, filter, ResultType).then(() => {
        items.value = store.AllUsersData.List;
        serverItemsLength.value = store.AllUsersData.serverTotalItemsLength;
        loading.value = false;
      });
    };
    const deleteItem = (val: string) => {
      return store.DeleteUser(val).then(() => {
        FechData("");
      });
    };

    const editItem = (val: string) => {
      router.push({ name: "UserForm", params: { guid: val } });
    };
    const AddItem = () => {
      router.push({ name: "UserForm", params: { guid: "null" } });
    };
    const OnSearch = () => {
      FechData("");
    };
    const OnClearSearch = () => {
      filter.value.searchFields = [];
      filter.value.searchValue = DefaultsearchValue,
        FechData("");
    };
    // initial load
    FechData("");
    watch([serverOptions], (value) => { FechData(""); }, { deep: true });

    return {
      headers,
      items,
      serverOptions,
      filter,
      filteroptions,
      serverItemsLength,
      loading,
      OnSearch,
      OnClearSearch,
      onSelect,
      deleteItem,
      editItem,
      AddItem
    };
  },
});
</script>
