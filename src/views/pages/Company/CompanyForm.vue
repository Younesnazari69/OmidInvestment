<template>
  <!--begin::Wrapper-->
  <div class="w-lg p-5">
    <VForm class="form w-100" id="kt_login_signin_form" @submit="onSubmitLogin" :validation-schema="CompanyModel"
      :initial-values="CompanyData">
      <div class="card shadow-sm">
        <div class="card-header">
          <h3 class="card-title">
            ورود به سیستم
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
            <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="id"
              autocomplete="off" hidden="true" />
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">نام شرکت</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="companyName"
                autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="companyName" />
                </div>
              </div>
            </div>

            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">شناسه ملی</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="nationalCode" autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="nationalCode" />
                </div>
              </div>
            </div>

            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">موضوع فعالیت</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="activitySubject" autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="activitySubject" />
                </div>
              </div>
            </div>

            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">ظرفیت</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="capital"
                autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="capital" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">شرکت مادر</label>
              <model-select class="form-control form-control-lg form-control-solid" :options="CompanyList"
                v-model="Company">
              </model-select>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="companyFatherID" autocomplete="off" v-model="Company.value" hidden="true" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="companyFatherID" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">هلدینگ </label>
              <model-select class="form-control form-control-lg form-control-solid" :options="CompanyList"
                v-model="Company">
              </model-select>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="holdingID"
                autocomplete="off" v-model="Company.value" hidden="true" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="holdingID" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">سطح شرکت</label>
              <model-select class="form-control form-control-lg form-control-solid" :options="CompanyLevelList"
                v-model="CompanyLevel">
              </model-select>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="companyLevelID" autocomplete="off" v-model="CompanyLevel.value" hidden="true" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="companyLevelID" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">وضعیت</label>
              <model-select class="form-control form-control-lg form-control-solid" :options="CompanystatusList"
                v-model="Companystatus">
              </model-select>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="companystatusID" autocomplete="off" v-model="Companystatus.value" hidden="true" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="companystatusID" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">نوع شرکت</label>
              <model-select class="form-control form-control-lg form-control-solid" :options="CompanyTypeList"
                v-model="CompanyType">
              </model-select>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="companyTypeID" autocomplete="off" v-model="CompanyType.value" hidden="true" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="companyTypeID" />
                </div>
              </div>
            </div>

            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">مختصات آدرس</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="coordinatesAddress" autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="coordinatesAddress" />
                </div>
              </div>
            </div>

            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">تاریخ پذیرش</label>
              <date-picker v-model="dateOfAcceptance" auto-submit />
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="dateOfAcceptance" autocomplete="off" v-model="dateOfAcceptance" hidden="true" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="dateOfAcceptance" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">توضیحات</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="description"
                autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="description" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">سال تاسیس </label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="establishmentYear" autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="establishmentYear" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">آدرس کارخانه</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="factoryAddress" autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="factoryAddress" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">تلفن کارخانه</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="factoryPhoneNumber" autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="factoryPhoneNumber" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">بورسی است</label>
              <div class="form-control form-control-lg form-control-solid">
                <Field name="hasBourse" type="checkbox" :value="false" />
              </div>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="hasBourse" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">آدرس دفتر مرکزی</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="headOfficeAddress" autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="headOfficeAddress" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">تلفن دفتر مرکزی</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="headOfficePhoneNumber" autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="headOfficePhoneNumber" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">صنعت</label>
              <model-select class="form-control form-control-lg form-control-solid" :options="IndustryTypeList"
                v-model="IndustryType">
              </model-select>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="industryTypeID" autocomplete="off" v-model="IndustryType.value" hidden="true" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="industryTypeID" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">نوع بازار</label>
              <model-select class="form-control form-control-lg form-control-solid" :options="MarketTypeList"
                v-model="MarketType">
              </model-select>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="marketTypeId" autocomplete="off" v-model="MarketType.value" hidden="true" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="marketTypeId" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">ماه شروع دوره مالی</label>
              <date-picker v-model="monthStartFiscalYear" auto-submit />
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="monthStartFiscalYear" autocomplete="off" v-model="monthStartFiscalYear" hidden="true" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="monthStartFiscalYear" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">درصد مالکیت هلدینگ </label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="ownershipPercentage" autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="ownershipPercentage" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">شماره ثبت</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder=""
                name="registerNumber" autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="registerNumber" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">آدرس سایت</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="site"
                autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="site" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">نماد بورسی</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="symbol"
                autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="symbol" />
                </div>
              </div>
            </div>
          </div>
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
import { defineComponent, ref, nextTick, onMounted, onBeforeMount } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useDataStore } from "@/stores/Data";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ModelSelect } from "vue-search-select"
import type { ServerOptions } from "vue3-easy-data-table";

import * as Yup from "yup";
export default defineComponent({
  name: "CompanyForm",
  components: {
    Field,
    VForm,
    ErrorMessage,
    ModelSelect,
  },
  setup() {
    const store = useDataStore();
    const router = useRouter();
    const route = useRoute()
    const CompanyData = ref<any | object>({});
    const Company = ref<any | object>({ value: null, text: "", });
    const CompanyLevel = ref<any | object>({ value: null, text: "", });
    const Companystatus = ref<any | object>({ value: null, text: "", });
    const CompanyType = ref<any | object>({ value: null, text: "", });
    const IndustryType = ref<any | object>({ value: null, text: "", });
    const MarketType = ref<any | object>({ value: null, text: "", });
    const CompanyList = ref([]);
    const CompanyLevelList = ref([]);
    const CompanystatusList = ref([]);
    const CompanyTypeList = ref([]);
    const IndustryTypeList = ref([]);
    const MarketTypeList = ref([]);
    const monthStartFiscalYear = ref([]);
    const dateOfAcceptance = ref([]);

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const CompanyModel = Yup.object().shape({
      id: Yup.number().label("id"),
      companyName: Yup.string().required("نام شرکت الزامیست").label("companyName"),
      nationalCode: Yup.number().required("شناسه ملی شرکت الزامیست").label("nationalCode"),
      capital: Yup.number().required("ظرفیت شزکت الزامیست").label("capital").nullable(),
      companyLevelID: Yup.number().required("انتخاب سطح شرکت الزامیست").label("companyLevelID"),
      companystatusID: Yup.number().required("انتخاب وضعیت شرکت الزامیست").label("companystatusID"),
      companyTypeID: Yup.number().required("انتخاب نوع شرکت الزامیست").label("companyTypeID"),
      industryTypeID: Yup.number().required("انتخاب نوع صنعت شرکت الزامیست").label("industryTypeID"),
      marketTypeId: Yup.number().required("انتخاب نوع بازار شرکت الزامیست").label("marketTypeId"),
      ownershipPercentage: Yup.number().required(" درصد مالکیت هلدینگ الزامیست").label("ownershipPercentage"),
      registerNumber: Yup.number().required(" شماره ثبت الزامیست").label("registerNumber"),
      companyFatherID: Yup.number().label("companyFatherID").nullable(),
      holdingID: Yup.number().label("holdingID").nullable(),
      coordinatesAddress: Yup.string().label("coordinatesAddress").nullable(),
      dateOfAcceptance: Yup.date().label("dateOfAcceptance").nullable(),
      description: Yup.string().label("description").nullable(),
      establishmentYear: Yup.string().label("establishmentYear").nullable(),
      factoryAddress: Yup.string().label("factoryAddress").nullable(),
      factoryPhoneNumber: Yup.string().label("factoryPhoneNumber").nullable(),
      headOfficeAddress: Yup.string().label("headOfficeAddress").nullable(),
      headOfficePhoneNumber: Yup.string().label("headOfficePhoneNumber").nullable(),
      site: Yup.string().label("site").nullable(),
      symbol: Yup.string().label("symbol").nullable(),
      monthStartFiscalYear: Yup.date().label("monthStartFiscalYear").nullable(),
      activitySubject: Yup.string().label("activitySubject").nullable(),
      hasBourse: Yup.bool().label("hasBourse").nullable(),

    });
    onBeforeMount(() => {
      const id = route.params.id;
      if (id != "null") {
        store.FechCompany(id).then(() => {
          CompanyData.value = store.CompanyData;
        });
      }
      const serverOptions = ref<ServerOptions>({
        page: 0,
        rowsPerPage: 0,
      });
      store.FechCompanys(serverOptions).then(() => {
        CompanyList.value = store.CompanysData.CompanyList;
      });
      store.FechCompanyLevels(serverOptions).then(() => {
        CompanyLevelList.value = store.CompanyLevelsData.CompanyLevelList;
      });
      store.FechCompanystatus(serverOptions).then(() => {
        CompanystatusList.value = store.CompanystatusData.CompanystatusList;
      });
      store.FechCompanyTypes(serverOptions).then(() => {
        CompanyTypeList.value = store.CompanyTypesData.CompanyTypeList;
      });
      store.FechIndustryTypes(serverOptions).then(() => {
        IndustryTypeList.value = store.IndustryTypesData.IndustryTypeList;
      });
      store.FechMarketTypes(serverOptions).then(() => {
        MarketTypeList.value = store.MarketTypesData.MarketTypeList;
      });
    });
    //Form submit function
    const onSubmitLogin = async (values: any) => {
      debugger
      //values = values as Company;
      // Clear existing errors
      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }
      console.log(parent);
      await store.UpdateCompany(values);
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
              CompanyData.value = null;
            } else if (result.isDismissed) {
              router.push({ name: "CompanyList" });
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
    const ReternToList = () => {
      router.push({ name: "CompanyList" });
    };
    return {
      onSubmitLogin,
      CompanyModel,
      submitButton,
      CompanyData,
      ReternToList,
      CompanyList,
      CompanyLevelList,
      CompanystatusList,
      CompanyTypeList,
      IndustryTypeList,
      MarketTypeList,
      Company,
      CompanyLevel,
      Companystatus,
      CompanyType,
      IndustryType,
      MarketType,
      monthStartFiscalYear,
      dateOfAcceptance
    };
  },
});
</script>
