<template>
  <!--begin::Wrapper-->
  <div class="w-lg p-5">
    <VForm class="form w-100" id="kt_login_signin_form" @submit="onSubmitLogin"
      :validation-schema="EquipmentAndMachineryModel" :initial-values="EquipmentAndMachineryData">
      <div class="card shadow-sm">
        <div class="card-header">
          <h3 class="card-title">
            ماشین آلات و تجهیزات
          </h3>
          <div class="card-toolbar">
            <button tabindex="3" type="button" @click="ReternToList" class="btn btn-lg btn-warning">
              <span class="indicator-label"> بازگشت به لیست </span>
            </button>
          </div>
        </div>
        <div class="card-body">
          <!--begin::Heading-->
          <div class="row fv-row mb-7">
            <!--begin::Col-->
            <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="id"
              autocomplete="off" hidden="true" />
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">شرکت</label>
              <model-select class="form-control form-control-lg form-control-solid" :options="CompanyList"
                v-model="Company">
              </model-select>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="companyID"
                autocomplete="off" v-model="Company.value" hidden="true" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="companyID" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">مورد ارزیابی_تجهیزات ماشین آلات / تاسیسات </label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="inspection"
                autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="inspection" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">استان</label>
              <model-select class="form-control form-control-lg form-control-solid" :options="ProvinceList"
                v-model="Province">
              </model-select>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="provinceID"
                autocomplete="off" v-model="Province.value" hidden="true" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="provinceID" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">شهر</label>
              <model-select class="form-control form-control-lg form-control-solid" :options="CityList" v-model="City">
              </model-select>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="cityID"
                autocomplete="off" v-model="City.value" hidden="true" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="cityID" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">منطقه شهرداری</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="municipalArea" autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="municipalArea" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">ناحیه شهرداری</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="regionalMunicipality" autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="regionalMunicipality" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">تلفن همراه نماینده</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="representativeMobile" autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="representativeMobile" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">نماینده شرکت ( مالک ) جهت بازدید</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="companyRepresentative_owner_ToVisit" autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="companyRepresentative_owner_ToVisit" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">آدرس</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="address"
                autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="address" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6"> صورت ریز دارایی های ثابت شرکت</label>
              <input class="form-control form-control-lg form-control-solid" type="file" @change="StatementOfAssetsFiles"
                multiple="true" />
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">کد محل استقرار ، مرکز هزینه ، کد مرکز هزینه</label>
              <input class="form-control form-control-lg form-control-solid" type="file" @change="LocationCodeFiles"
                multiple="true" />
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">صورت ریز موجودی قطعات یدکی</label>
              <input class="form-control form-control-lg form-control-solid" type="file"
                @change="InventoryOfSparePartsFiles" multiple="true" />
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">کلیه مجوزها و پروانه های اخذ شده</label>
              <input class="form-control form-control-lg form-control-solid" type="file"
                @change="AllLicensesAndPermitsObtainedFiles" multiple="true" />
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">تصویر کلیه قبوض</label>
              <input class="form-control form-control-lg form-control-solid" type="file" @change="ImageOfAllBillsFiles"
                multiple="true" />
            </div>
            <!-- <img :src="UploudFile"> -->

          </div>
          <div class="row fv-row mb-7">
          </div>
          <!--begin::Actions-->

        </div>
        <div class="card-footer">
          <div class="text-center">
            <!--begin::Submit button-->
            <button tabindex="3" type="submit" ref="submitButton" id="kt_sign_in_submit"
              class="btn btn-lg btn-success w-25 mb-5">
              <span class="indicator-label"> ذخیره </span>
              <span class="indicator-progress">
                لطفا منتظر بمانید...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
            <!--end::Submit button-->
          </div>
        </div>

      </div>
    </VForm>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, onMounted, onBeforeMount, watch } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useDataStore } from "@/stores/Data";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ModelSelect } from "vue-search-select"
import type { ServerOptions } from "vue3-easy-data-table";

import * as Yup from "yup";

export default defineComponent({
  name: "EquipmentAndMachineryForm",
  components: {
    Field,
    VForm,
    ErrorMessage,
    ModelSelect
  },
  setup() {
    const store = useDataStore();
    const AuthStore = useAuthStore();
    const router = useRouter();
    const route = useRoute()
    const EquipmentAndMachineryData = ref<any|object>({});
    const Province = ref<any|object>({ value: null, text: "", });
    const City = ref<any|object>({ value: null, text: "", });
    const Company = ref<any|object>({ value: null, text: "", });
    const UploudFiles = ref<any|object>([]);
    const ProvinceList = ref([]);
    const CityList = ref([]);
    const CompanyList = ref([]);
    const User = ref<any|object>({});
    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const EquipmentAndMachineryModel = Yup.object().shape({
      id: Yup.number().label("id"),
      companyID: Yup.string().required("انتخاب شرکت الزامیست").label("companyID"),
      provinceID: Yup.number().required("انتخاب استان الزامیست").label("provinceID"),
      cityID: Yup.number().required("انتخاب شهر الزامیست").label("cityID"),
      inspection: Yup.string().required("مورد ارزیابی_تجهیزات ماشین آلات / تاسیسات الزامیست").label("inspection"),
      municipalArea: Yup.string().label("municipalArea").nullable(),
      regionalMunicipality: Yup.string().label("regionalMunicipality").nullable(),
      representativeMobile: Yup.string().matches(/^(\+98|0)?9\d{9}$/, "تلفن همراه صحیح نیست").required("تلفن همراه نماینده الزامیست").label("representativeMobile"),
      companyRepresentative_owner_ToVisit: Yup.string().required("نماینده شرکت ( مالک ) جهت بازدید الزامیست").label("companyRepresentative_owner_ToVisit"),
      address: Yup.string().label("address").required("آدرس الزامیست"),
    });

    onBeforeMount(() => {
      const id = route.params.id;
      if (id != "null") {
        store.FechEquipmentAndMachinery(id).then(() => {
          EquipmentAndMachineryData.value = store.EquipmentAndMachineryData;
        });
      }
      User.value = AuthStore.user;
      Company.value = {
        value: User.value.companyID,
        text: User.value.company,
      };
      const serverOptions = ref<ServerOptions>({
        page: 0,
        rowsPerPage: 0,
      });
      store.FechLocations(serverOptions).then(() => {
        ProvinceList.value = store.LocationsData.LocationList.filter((obj) => { return obj.levelId == 1; });
        CityList.value = store.LocationsData.LocationList.filter((obj) => { return obj.levelId == 2; });
      });
      store.FechCompanys(serverOptions).then(() => {
        CompanyList.value = store.CompanysData.CompanyList;
      });
    });

    //#region onSubmit
    const onSubmitLogin = async (values: any) => {
      // Clear existing errors
      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }
      values.Files = UploudFiles.value;
      //values.append('file', UploudFile);
      await store.UpdateEquipmentAndMachinery(values);
      const error = Object.values(store.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "ذخیره اطلاعات انجام شد",
          icon: "success",
          showCancelButton: true,
          buttonsStyling: false,
          confirmButtonText: "ثبت جدید",
          cancelButtonText: "بازگشت به لیست",
          heightAuto: false,
          customClass: {
            cancelButton: "btn fw-semobold btn-light-warning",
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        })
          .then((result) => {
            if (result.isConfirmed) {
            } else if (result.isDismissed) {
              router.push({ name: "EquipmentAndMachineryList" });
            }
          })
      } else {
        Swal.fire({
          text: error[0] as string,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "تلاش مجدد",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        }).then(() => {
          store.errors = {};
        });
      }

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;

    };
    //#endregion
    watch(Province, () => {
      CityList.value = store.LocationsData.LocationList.filter((obj) => { return obj.levelId == 2 && obj.parentId == Province.value.value; });
    });

    const ReternToList = () => {
      router.push({ name: "EquipmentAndMachineryList" });
    };
    //#region Files 
    const StatementOfAssetsFiles = (event) => {
      debugger
      const filesList = event.target.files;
      Array.from(filesList).forEach((item) => {
        const reader = new FileReader();
        const file:any = item;
        reader.onloadend = () => {
          const newfile = {
            Type: file.type,
            FilePreviewUrl: reader.result,
            Name: file.name,
            FormFileType: "صورت ریز دارایی های ثابت شرکت",
            FormFileTypeId: 1,
          };
          UploudFiles.value.push(newfile);
        };
        reader.readAsDataURL(file as Blob);
      });
    }
    const LocationCodeFiles = (event) => {
      debugger
      const filesList = event.target.files;
      Array.from(filesList).forEach((item) => {
        const reader = new FileReader();
        const file :any = item;
        reader.onloadend = () => {
          const newfile = {
            Type: file.type,
            FilePreviewUrl: reader.result,
            Name: file.name,
            FormFileType: "کد محل استقرار ، مرکز هزینه ، کد مرکز هزینه",
            FormFileTypeId: 2,
          };
          UploudFiles.value.push(newfile);
        };
        reader.readAsDataURL(file as Blob);
      });
    }
    const InventoryOfSparePartsFiles = (event) => {
      debugger
      const filesList = event.target.files;
      Array.from(filesList).forEach((item) => {
        const reader = new FileReader();
        const file :any= item;
        reader.onloadend = () => {
          const newfile = {
            Type: file.type,
            FilePreviewUrl: reader.result,
            Name: file.name,
            FormFileType: "صورت ریز موجودی قطعات یدکی",
            FormFileTypeId: 3,
          };
          UploudFiles.value.push(newfile);
        };
        reader.readAsDataURL(file as Blob);
      });
    }
    const AllLicensesAndPermitsObtainedFiles = (event) => {
      debugger
      const filesList = event.target.files;
      Array.from(filesList).forEach((item) => {
        const reader = new FileReader();
        const file: any = item;
        reader.onloadend = () => {
          const newfile = {
            Type: file.type,
            FilePreviewUrl: reader.result,
            Name: file.name,
            FormFileType: "کلیه مجوزها و پروانه های اخذ شده",
            FormFileTypeId: 4,
          };
          UploudFiles.value.push(newfile);
        };
        reader.readAsDataURL(file as Blob);
      });
    }
    const ImageOfAllBillsFiles = (event) => {
      debugger
      const filesList = event.target.files;
      Array.from(filesList).forEach((item) => {
        const reader = new FileReader();
        const file:any = item;
        reader.onloadend = () => {
          const newfile = {
            Type: file.type,
            FilePreviewUrl: reader.result,
            Name: file.name,
            FormFileType: "تصویر کلیه قبوض",
            FormFileTypeId: 5,
          };
          UploudFiles.value.push(newfile);
        };
        reader.readAsDataURL(file as Blob);
      });
    }
    //#endregion
    return {
      onSubmitLogin,
      EquipmentAndMachineryModel,
      submitButton,
      EquipmentAndMachineryData,
      ReternToList,
      ProvinceList,
      CityList,
      CompanyList,
      Province,
      City,
      Company,
      StatementOfAssetsFiles,
      LocationCodeFiles,
      InventoryOfSparePartsFiles,
      AllLicensesAndPermitsObtainedFiles,
      ImageOfAllBillsFiles,
      UploudFiles,
      User
    };
  },
});
</script>
