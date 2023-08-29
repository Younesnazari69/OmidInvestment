<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <!--begin::Heading-->
      <div class="row fv-row mb-7">
        <div class="col-xl-3">
          <label class="form-label fw-bold text-dark fs-6">فیلد جستجو</label>
          <!-- <model-select class="form-control form-control-lg form-control-solid" :options="headers"
            v-model="filter.searchField">
          </model-select> -->
          <multi-select class="form-control form-control-sm form-control-solid" :options="filteroptions"
            :selected-options="filter.searchFields" placeholder="select item" @select="onSelect">
          </multi-select>
        </div>
        <template v-for="(searchFields, index) in filter.searchFields">
          <div v-if="searchFields.value == 'CompanyID'" class="col-xl-3">
            <label class="form-label fw-bold text-dark fs-6">شرکت</label>
            <div class="row">
              <div class="col-xl-2">
                <select class="form-control form-control-sm form-control-solid" name="C-Oparation"
                  v-model="filter.searchValue.CompanyID.oparation">
                  <option value="="> = </option>
                  <option value="!="> != </option>
                </select>
              </div>
              <div class="col-xl-10">
                <model-select class="form-control form-control-lg form-control-solid" :options="CompanyList"
                  v-model="filter.searchValue.CompanyID.key">
                </model-select>
              </div>
            </div>

          </div>
          <div v-if="searchFields.value == 'ProvinceID'" class="col-xl-3">
            <label class="form-label fw-bold text-dark fs-6">استان</label>
            <div class="row">
              <div class="col-xl-2">
                <select class="form-control form-control-sm form-control-solid" name="P-Oparation"
                  v-model="filter.searchValue.ProvinceID.oparation">
                  <option value="="> = </option>
                  <option value="!="> != </option>
                </select>
              </div>
              <div class="col-xl-10">
                <model-select class="form-control form-control-lg form-control-solid" :options="ProvinceList"
                  v-model="filter.searchValue.ProvinceID.key">
                </model-select>
              </div>
            </div>

          </div>
          <div v-if="searchFields.value == 'CityID'" class="col-xl-3">
            <label class="form-label fw-bold text-dark fs-6">شهر</label>
            <div class="row">
              <div class="col-xl-2">
                <select class="form-control form-control-sm form-control-solid" name="Ci-Oparation"
                  v-model="filter.searchValue.CityID.oparation">
                  <option value="="> = </option>
                  <option value="!="> != </option>
                </select>
              </div>
              <div class="col-xl-10">
                <model-select class="form-control form-control-lg form-control-solid" :options="CityList"
                  v-model="filter.searchValue.CityID.key">
                </model-select>
              </div>
            </div>

          </div>
          <div v-if="searchFields.value == 'Title'" class="col-xl-3">
            <label class="form-label fw-bold text-dark fs-6">عنوان </label>
            <div class="row">
              <div class="col-xl-2">
                <select class="form-control form-control-sm form-control-solid" name="T-Oparation"
                  v-model="filter.searchValue.Title.oparation">
                  <option value="in">in</option>
                  <option value="="> = </option>
                  <option value="!="> != </option>
                </select>
              </div>
              <div class="col-xl-10">
                <input class="form-control form-control-sm form-control-solid" type="text" placeholder=""
                  name="Title" v-model="filter.searchValue.Title.value" autocomplete="off" />
              </div>
            </div>
          </div>
          <div v-if="searchFields.value == 'OwnerName'" class="col-xl-3">
            <label class="form-label fw-bold text-dark fs-6">عنوان </label>
            <div class="row">
              <div class="col-xl-2">
                <select class="form-control form-control-sm form-control-solid" name="O-Oparation"
                  v-model="filter.searchValue.OwnerName.oparation">
                  <option value="in">in</option>
                  <option value="="> = </option>
                  <option value="!="> != </option>
                </select>
              </div>
              <div class="col-xl-10">
                <input class="form-control form-control-sm form-control-solid" type="text" placeholder=""
                  name="OwnerName" v-model="filter.searchValue.OwnerName.value" autocomplete="off" />
              </div>
            </div>
          </div>
          <div v-if="searchFields.value == 'RegistrationPlate'" class="col-xl-3">
            <label class="form-label fw-bold text-dark fs-6">عنوان </label>
            <div class="row">
              <div class="col-xl-2">
                <select class="form-control form-control-sm form-control-solid" name="R-Oparation"
                  v-model="filter.searchValue.RegistrationPlate.oparation">
                  <option value="in">in</option>
                  <option value="="> = </option>
                  <option value="!="> != </option>
                </select>
              </div>
              <div class="col-xl-10">
                <input class="form-control form-control-sm form-control-solid" type="text" placeholder=""
                  name="RegistrationPlate" v-model="filter.searchValue.RegistrationPlate.value" autocomplete="off" />
              </div>
            </div>
          </div>
          <div v-if="searchFields.value == 'RepresentativeMobile'" class="col-xl-3">
            <label class="form-label fw-bold text-dark fs-6">موبایل نماینده</label>
            <div class="row">
              <div class="col-xl-2">
                <select class="form-control form-control-sm form-control-solid" name="R-Oparation"
                  v-model="filter.searchValue.RepresentativeMobile.oparation">
                  <option value="in">in</option>
                  <option value="="> = </option>
                  <option value="!="> != </option>
                </select>
              </div>
              <div class="col-xl-10">
                <input class="form-control form-control-sm form-control-solid" type="text" placeholder=""
                  name="representativeMobile" v-model="filter.searchValue.RepresentativeMobile.value"
                  autocomplete="off" />
              </div>
            </div>
          </div>
          <div v-if="searchFields.value == 'CompanyRepresentative_Owner_ToVisit'" class="col-xl-3">
            <label class="form-label fw-bold text-dark fs-6">نماینده</label>
            <div class="row">
              <div class="col-xl-2">
                <select class="form-control form-control-sm form-control-solid" name="V-Oparation"
                  v-model="filter.searchValue.CompanyRepresentative_Owner_ToVisit.oparation">
                  <option value="in">in</option>
                  <option value="="> = </option>
                  <option value="!="> != </option>
                </select>
              </div>
              <div class="col-xl-10">
                <input class="form-control form-control-sm form-control-solid" type="text" placeholder=""
                  name="companyRepresentative_Owner_ToVisit"
                  v-model="filter.searchValue.CompanyRepresentative_Owner_ToVisit.value" autocomplete="off" />
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
    :server-items-length="serverItemsLength" :loading="loading" buttons-pagination>
    <template #header-operation="header">
      <!-- {{ header.text }} -->
      <button @click="AddItem" class="btn btn-sm btn-success ">
        <FlAddSquare />
      </button>
      <button @click="ExportToExcell" class="btn btn-sm btn-info ">
        <ReFileExcel2Line  />
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
        <button v-if="item.filesCont>0" @click="ShowFiles(item.id)" class="btn btn-sm btn-success">
          <PhThinFiles />
        </button>
      </div>
    </template>
  </EasyDataTable>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onBeforeMount, reactive } from "vue";
import { useDataStore } from "@/stores/Data";
import { useRouter } from "vue-router";
import type { Header, Item, ServerOptions } from "vue3-easy-data-table";
import { BsTrash, AkEdit, FlAddSquare, PhThinFiles ,ReFileExcel2Line} from '@kalimahapps/vue-icons';
import { MultiSelect, ModelSelect } from 'vue-search-select'

export default defineComponent({
  name: "RealEstateList",
  components: {
    BsTrash,
    AkEdit,
    FlAddSquare,
    PhThinFiles,
    ReFileExcel2Line,
    MultiSelect,
    ModelSelect
  },
  setup() {
    const router = useRouter();
    const store = useDataStore();
    const filteroptions: object[] = [
      { text: "شرکت", value: 'CompanyID' },
      { text: "استان", value: 'ProvinceID' },
      { text: "شهر", value: 'CityID' },
      { text: "عنوان", value: 'Title' },
      { text: "مالک", value: 'OwnerName' },
      { text: "پلاک ثبتی", value: 'RegistrationPlate' },
      { text: "تلفن همراه نماینده", value: 'RepresentativeMobile' },
      { text: "نماینده", value: 'CompanyRepresentative_Owner_ToVisit' },
    ];
    const headers: Header[] = [
      { text: "شرکت", value: 'company', sortable: true },
      { text: "استان", value: 'province', sortable: true },
      { text: "شهر", value: 'city', sortable: true },
      { text: "عنوان", value: 'title', sortable: true },
      { text: "مالک", value: 'ownerName', sortable: true },
      { text: "پلاک ثبتی", value: 'registrationPlate', sortable: true },
      { text: "تلفن همراه نماینده", value: 'representativeMobile', sortable: true },
      { text: "نماینده شرکت ( مالک ) جهت بازدید", value: 'companyRepresentative_Owner_ToVisit', sortable: true },
      { text: "تعداد فایلها", value: 'filesCont', sortable: false },
      { text: "عملیات", value: "operation" },
    ];
    const items = ref<Item[]>([]);
    const loading = ref<Boolean>(false);
    const serverItemsLength = ref<Number>(0);
    const serverOptions = ref<ServerOptions>({ page: 1, rowsPerPage: 10, });
      const serverOptionsForSelects = ref<ServerOptions>({ page: 0, rowsPerPage: 0, });

    const ProvinceList = ref([]);
    const CityList = ref([]);
    const CompanyList = ref([]);
    const DefaultsearchValue= {
        CompanyID: { value: '', key: 0, oparation: '' },
        ProvinceID: { value: '', key: 0, oparation: '' },
        CityID: { value: '', key: 0, oparation: '' },
        Title: { value: '', key: 0, oparation: '' },
        OwnerName: { value: '', key: 0, oparation: '' },
        RegistrationPlate: { value: '', key: 0, oparation: '' },
        RepresentativeMobile: { value: '', key: 0, oparation: '' },
        CompanyRepresentative_Owner_ToVisit: { value: '', key: 0, oparation: '' },
      }
    const filter = ref<any | object>({
      searchFields: [],
      searchValue: DefaultsearchValue
    });
    function onSelect(items, lastSelectItem) {
      filter.value.searchFields = items
      lastSelectItem = lastSelectItem
    }
    const OnSearch = () => {
      FechData("");
    };
    const OnClearSearch = () => {
      filter.value.searchFields = [];
      filter.value.searchValue = DefaultsearchValue,
        FechData("");
    };
    onBeforeMount(() => {
      store.FechLocations(serverOptionsForSelects).then(() => {
        ProvinceList.value = store.LocationsData.LocationList.filter((obj) => { return obj.levelId == 1; });
        CityList.value = store.LocationsData.LocationList.filter((obj) => { return obj.levelId == 2; });
      });
      store.FechCompanys(serverOptionsForSelects).then(() => {
        CompanyList.value = store.CompanysData.CompanyList;
      });
    });
    const FechData = async (ResultType:string) => {
      loading.value = true;
      return store.FechRealEstates(serverOptions.value, filter,ResultType).then(() => {
        items.value = store.RealEstatesData.List;
        serverItemsLength.value = store.RealEstatesData.serverTotalItemsLength;
        if (store.RealEstatesData.exportToExcellFileUrl != "") {
          downloadFile(store.RealEstatesData.exportToExcellFileUrl)
        }
        loading.value = false;
      });
    };
    function downloadFile(urlFileName) {
      store.FechFile(urlFileName).then(res => {
        var blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        var FILE = URL.createObjectURL(blob);
        var docUrl = document.createElement('a');
        docUrl.href = FILE;
        docUrl.setAttribute('download', 'Exportfile.xlsx');
        document.body.appendChild(docUrl);
        docUrl.click();
      });
    }
    const deleteItem = (val: string) => {
      return store.DeleteRealEstate(val).then(() => {
        FechData("");
      });
    };

    const editItem = (val: string) => {
      router.push({ name: "RealEstateForm", params: { id: val } });
    };
    const AddItem = () => {
      router.push({ name: "RealEstateForm", params: { id: "null" } });
    };
    const ShowFiles = (val: string) => {
      router.push({ name: "FilesList", params: { id: val, type: "RealEstate" } });
    };
    const ExportToExcell = () => {
      FechData("ExportToExcell");
    };
    // initial load
    FechData("");
    watch(serverOptions, (value) => { FechData(""); }, { deep: true });

    return {
      headers,
      items,
      serverOptions,
      serverItemsLength,
      loading,
      ProvinceList,
      CityList,
      CompanyList,
      filter,
      filteroptions,
      OnSearch,
      OnClearSearch,
      onSelect,
      deleteItem,
      editItem,
      AddItem,
      ShowFiles,
      ExportToExcell
    };
  },
});
</script>
