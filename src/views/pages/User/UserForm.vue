<template>
  <!--begin::Wrapper-->
  <div class="w-lg p-10">
    <!--begin::Form-->
    <VForm class="form w-100" id="kt_login_signin_form" @submit="onSubmitLogin" :validation-schema="UserModel"
      :initial-values="userData">
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">ورود به سیستم</h1>
        <!--end::Title-->
      </div>
      <!--begin::Heading-->
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
        <div class="col-xl-8">
          <label class="form-label fw-bold text-dark fs-6">پست الکترونیک</label>
          <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="email"
            autocomplete="off" />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="email" />
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
      <!--begin::Actions-->
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
        <button tabindex="3" type="button" @click="ReternToList" class="btn btn-lg btn-primary w-25 mb-5">
          <span class="indicator-label"> بازگشت به لیست </span>
        </button>
        <!--end::Submit button-->
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, onMounted, onBeforeMount } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useDataStore } from "@/stores/Data";

// import { useAuthStore, type User } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import { PasswordMeterComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";

export default defineComponent({
  name: "UserForm",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useDataStore();
    const router = useRouter();
    const route = useRoute()
    const userData = ref<object>({});
    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const UserModel = Yup.object().shape({
      id: Yup.number().label("id"),
      username: Yup.string().required().label("username"),
      password: Yup.string().min(4).required().label("password"),
      email: Yup.string().label("email"),
      firstname: Yup.string().required().label("firstname"),
      lastname: Yup.string().required().label("lastname"),
      mobile: Yup.string().required().label("mobile"),
      jobTitle: Yup.string().label("jobTitle"),

    });

    onBeforeMount(() => {
      const Guid = route.params.guid;
      if (Guid != "null") {
        store.FechUser(Guid).then(() => {
          debugger;
          userData.value = store.UserData;
        });
      }
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
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        }).then(() => {
          router.push({ name: "UserList" });
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
      router.push({ name: "UserList" });
    };
    return {
      onSubmitLogin,
      UserModel,
      submitButton,
      userData,
      ReternToList
    };
  },
});
</script>
