<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10">
    <div class="text-center">
      <img alt="Logo" :src="getAssetPath('media/logos/AppLogo-1024.png')"
        class="h-150px h-lg-200px app-sidebar-logo-default theme-light-show" />
    </div>

    <!--begin::Form-->
    <VForm class="form w-100" id="kt_login_signin_form" @submit="onSubmitLogin" :validation-schema="login">

      <div class="card shadow-sm">
        <div class="card-body">
          <!--begin::Heading-->
          <div class="text-center mb-10">
            <!--begin::Title-->
            <h1 class="text-dark mb-3">ورود به سیستم</h1>
            <!--end::Title-->
          </div>
          <!--begin::Heading-->

          <!--begin::Input group-->
          <div class="fv-row mb-10">
            <!--begin::Label-->
            <label class="form-label fs-6 fw-bold text-dark">نام کاربری</label>
            <!--end::Label-->

            <!--begin::Input-->
            <Field tabindex="1" class="form-control form-control-lg form-control-solid" type="text" name="username"
              autocomplete="off" />
            <!--end::Input-->
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="username" />
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="fv-row mb-10">
            <!--begin::Wrapper-->
            <div class="d-flex flex-stack mb-2">
              <!--begin::Label-->
              <label class="form-label fw-bold text-dark fs-6 mb-0">کلمه عبور</label>
              <!--end::Label-->
            </div>
            <!--end::Wrapper-->

            <!--begin::Input-->
            <Field tabindex="2" class="form-control form-control-lg form-control-solid" type="Password" name="password"
              autocomplete="off" />
            <!--end::Input-->
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>
          <!--end::Input group-->
        </div>
        <div class="card-footer">
          <!--begin::Actions-->
          <div class="text-center">
            <!--begin::Submit button-->
            <button tabindex="3" type="submit" ref="submitButton" id="kt_sign_in_submit"
              class="btn btn-lg btn-primary w-100 mb-5">
              <span class="indicator-label"> ورود </span>

              <span class="indicator-progress">
                Please wait...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
            <!--end::Submit button-->
          </div>
          <!--end::Actions-->
        </div>

      </div>
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const login = Yup.object().shape({
      username: Yup.string().required().label("username"),
      password: Yup.string().min(4).required().label("password"),
    });

    //Form submit function
    const onSubmitLogin = async (values: any) => {
      // values = values as User;
      // Clear existing errors
      store.logout();

      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Send login request
      await store.login(values);
      const error = Object.values(store.errors);

      if (error.length === 0) {
        router.push({ name: "dashboard" });
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

    return {
      onSubmitLogin,
      login,
      submitButton,
      getAssetPath,
    };
  },
});
</script>
