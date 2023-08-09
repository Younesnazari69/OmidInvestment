<template>
  <!--begin::Wrapper-->
  <div class="w-lg p-5">
    <VForm class="form w-100" id="kt_login_signin_form" @submit="onSubmitLogin" :validation-schema="UserModel"
      :initial-values="userData">
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
          <div class="row fv-row mb-7">
            <!--begin::Col-->
            <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="id"
              autocomplete="off" hidden="true" />
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">نام</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="firstname"
                autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="firstname" />
                </div>
              </div>
            </div>
            <!--end::Col-->

            <!--begin::Col-->
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">نام خانوادگی</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="lastname"
                autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="lastname" />
                </div>
              </div>
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">تلفن همراه</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="mobile"
                autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="mobile" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <div class="row fv-row mb-7">
            <!--begin::Col-->
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">عنوان شغلی</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="jobTitle"
                autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="jobTitle" />
                </div>
              </div>
            </div>
            <!--end::Col-->
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">پست الکترونیک</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="email"
                autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="email" />
                </div>
              </div>
            </div>
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
          </div>
          <div class="row fv-row mb-7">
            <div class="col-xl-4">
              <label class="form-label fw-bold text-dark fs-6">نام کاربری</label>
              <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="username"
                autocomplete="off" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="username" />
                </div>
              </div>
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-xl-4">
              <!--begin::Input group-->
              <div class="mb-10 fv-row" data-kt-password-meter="true">
                <!--begin::Wrapper-->
                <div class="mb-1">
                  <!--begin::Label-->
                  <label class="form-label fw-bold text-dark fs-6"> کلمه عبور </label>
                  <!--end::Label-->

                  <!--begin::Input wrapper-->
                  <div class="position-relative mb-3">
                    <Field class="form-control form-control-lg form-control-solid" type="password" placeholder=""
                      name="password" autocomplete="off" />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                  </div>
                  <!--end::Input wrapper-->
                  <!--begin::Meter-->
                  <div class="d-flex align-items-center mb-3" data-kt-password-meter-control="highlight">
                    <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                    <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                    <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                    <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
                  </div>
                  <!--end::Meter-->
                </div>
                <!--end::Wrapper-->
                <!--begin::Hint-->
                <div class="text-muted">
                  Use 8 or more characters with a mix of letters, numbers & symbols.
                </div>
                <!--end::Hint-->
              </div>
              <!--end::Input group--->

            </div>
            <!--end::Col-->


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
import { PasswordMeterComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ModelSelect } from "vue-search-select"
import type { ServerOptions } from "vue3-easy-data-table";

import * as Yup from "yup";

export default defineComponent({
  name: "UserForm",
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
    const userData = ref<any|object>({});
    const submitButton = ref<HTMLButtonElement | null>(null);
    const CompanyList = ref([]);
    const Company = ref<any|object>({ value: null, text: "", });

    //Create form validation object
    const UserModel = Yup.object().shape({
      id: Yup.number().label("id"),
      username: Yup.string().required("نام کاربری الزامیست").label("username"),
      password: Yup.string().min(4).required(" کلمه عبور الزامیست").label("password"),
      firstname: Yup.string().required("نام الزامیست").label("firstname"),
      lastname: Yup.string().required("نام خانوادگی الزامیست").label("lastname"),
      mobile: Yup.string().matches(/^(\+98|0)?9\d{9}$/, "تلفن همراه صحیح نیست").required("تلفن همراه نماینده الزامیست").label("mobile"),
      jobTitle: Yup.string().label("jobTitle"),
      email: Yup.string().label("email").nullable(),
      companyID: Yup.string().label("companyID").nullable(),
    });
    onBeforeMount(() => {
      let Guid:string | string[] = route.params.guid;
      if (Guid != 'null') {
        store.FechUser(Guid).then(() => {
          ;
          userData.value = store.UserData;
        });
      }
      const serverOptions = ref<ServerOptions>({
        page: 0,
        rowsPerPage: 0,
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
      //values = values as User;
      // Clear existing errors
      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }
      // Send login request
      await store.UpdateUser(values);
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
              router.push({ name: "UserList" });
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
      router.push({ name: "UserList" });
    };
    return {
      onSubmitLogin,
      UserModel,
      submitButton,
      userData,
      CompanyList,
      Company,
      ReternToList
    };
  },
});
</script>
