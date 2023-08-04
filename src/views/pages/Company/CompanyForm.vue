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
            <!--begin::Col-->
            <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="id"
              autocomplete="off" hidden="true" />
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">نام</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="name"
                autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="name" />
                </div>
              </div>
            </div>
            <!--end::Col-->

            <!--begin::Col-->
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">کد</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="code"
                autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="code" />
                </div>
              </div>
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">سطح</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="levelId"
                autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="levelId" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <div class="row fv-row mb-7">
            <!--begin::Col-->
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">کشور</label>
              <model-select class="form-control form-control-lg form-control-solid" :options="RegionList"
                v-model="region">
              </model-select>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="regionId"
                autocomplete="off" v-model="region.value" hidden="true" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="regionId" />
                </div>
              </div>
            </div>
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">والد</label>
              <model-select class="form-control form-control-lg form-control-solid" :options="CompanyList"
                v-model="parent">
              </model-select>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="parentId"
                autocomplete="off" v-model="parent.value" hidden="true" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="parentId" />
                </div>
              </div>
            </div>

            <!--end::Col-->
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
import { defineComponent, ref, nextTick, onMounted, onBeforeMount } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useDataStore } from "@/stores/Data";
import { useRouter, useRoute } from "vue-router";
import { PasswordMeterComponent } from "@/assets/ts/components";
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
    ModelSelect
  },
  setup() {
    const store = useDataStore();
    const router = useRouter();
    const route = useRoute()
    const CompanyData = ref<object>({});
    const parent = ref<object>({
      value: null,
      text: "",
    });
    const region = ref<object>({
      value: null,
      text: "",
    });
    const RegionList = ref([]);
    const CompanyList = ref([]);

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const CompanyModel = Yup.object().shape({
      id: Yup.number().label("id"),
      companyName: Yup.string().required().label("companyName"),
      nationalCode: Yup.number().required().label("nationalCode"),
      activitySubject: Yup.string().label("activitySubject").nullable(),
      capital: Yup.number().required().label("capital").nullable(),
      companyFatherID: Yup.number().label("companyFatherID").nullable(),
      companyLevelID: Yup.number().label("companyLevelID").nullable(),
      companystatusID: Yup.number().label("companystatusID").nullable(),
      companyTypeID: Yup.number().label("companyTypeID").nullable(),
      coordinatesAddress: Yup.string().label("coordinatesAddress").nullable(),
      dateOfAcceptance: Yup.date().label("dateOfAcceptance").nullable(),
      description: Yup.string().label("description").nullable(),
      establishmentYear: Yup.string().label("establishmentYear").nullable(),
      factoryAddress: Yup.string().label("factoryAddress").nullable(),
      factoryPhoneNumber: Yup.string().label("factoryPhoneNumber").nullable(),
      hasBourse: Yup.bool().label("hasBourse").nullable(),
      headOfficeAddress: Yup.string().label("headOfficeAddress").nullable(),
      headOfficePhoneNumber: Yup.string().label("headOfficePhoneNumber").nullable(),
      holdingID: Yup.number().label("holdingID").nullable(),
      industryTypeID: Yup.number().label("industryTypeID").nullable(),
      marketTypeId: Yup.number().label("marketTypeId").nullable(),
      monthStartFiscalYear: Yup.number().label("monthStartFiscalYear").nullable(),
      ownershipPercentage: Yup.number().label("ownershipPercentage").nullable(),
      registerNumber: Yup.number().label("registerNumber").nullable(),
      site: Yup.string().label("site").nullable(),
      symbol: Yup.string().label("symbol").nullable(),
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
      store.FechRegions(serverOptions).then(() => {
        RegionList.value = store.RegionsData.RegionList;
      });
      store.FechCompanys(serverOptions).then(() => {
        CompanyList.value = store.CompanysData.CompanyList;
      });
    });
    onMounted(() => {
      nextTick(() => {
        PasswordMeterComponent.bootstrap();
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
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        }).then(() => {
          router.push({ name: "CompanyList" });
          // Go to page after successfully login
          // Swal.fire({
          //   text: "خطا در ذخیره اطلاعات",
          //   icon: "success",
          //   buttonsStyling: false,
          //   confirmButtonText: "Ok, got it!",
          //   heightAuto: false,
          //   customClass: {
          //     confirmButton: "btn fw-semobold btn-light-primary",
          //   },
          // })
        });
      } else {
        Swal.fire({
          text: error[0] as string,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
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
      RegionList,
      CompanyList,
      parent,
      region,
    };
  },
});
</script>
