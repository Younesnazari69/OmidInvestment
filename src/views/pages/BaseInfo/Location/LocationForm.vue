<template>
  <!--begin::Wrapper-->
  <div class="w-lg p-5">
    <VForm class="form w-100" id="kt_login_signin_form" @submit="onSubmitLogin" :validation-schema="LocationModel"
      :initial-values="LocationData">
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
              <model-select class="form-control form-control-lg form-control-solid" :options="LocationList"
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
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ModelSelect } from "vue-search-select"
import type { ServerOptions } from "vue3-easy-data-table";

import * as Yup from "yup";

export default defineComponent({
  name: "LocationForm",
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
    const LocationData = ref<any|object>({});
    const parent = ref<any|object>({
      value: null,
      text: "",
    });
    const region = ref<any|object>({
      value: null,
      text: "",
    });
    const RegionList = ref([]);
    const LocationList = ref([]);

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const LocationModel = Yup.object().shape({
      id: Yup.number().label("id"),
      name: Yup.string().required().label("name"),
      code: Yup.number().label("code"),
      levelId: Yup.number().label("levelId"),
      regionId: Yup.number().required().label("regionId"),
      parentId: Yup.number().label("parentId").nullable(),
    });

    onBeforeMount(() => {
      const id = route.params.id;
      if (id != "null") {
        store.FechLocation(id).then(() => {
          LocationData.value = store.LocationData;
        });
      }
      const serverOptions = ref<ServerOptions>({
        page: 0,
        rowsPerPage: 0,
      });
      store.FechRegions(serverOptions).then(() => {
        RegionList.value = store.RegionsData.RegionList;
      });
      store.FechLocations(serverOptions).then(() => {
        LocationList.value = store.LocationsData.LocationList;
      });
    });
    //Form submit function
    const onSubmitLogin = async (values: any) => {
      debugger
      //values = values as Location;
      // Clear existing errors
      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }
      console.log(parent);
      await store.UpdateLocation(values);
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
              router.push({ name: "LocationList" });
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
      router.push({ name: "LocationList" });
    };
    return {
      onSubmitLogin,
      LocationModel,
      submitButton,
      LocationData,
      ReternToList,
      RegionList,
      LocationList,
      parent,
      region,
    };
  },
});
</script>
