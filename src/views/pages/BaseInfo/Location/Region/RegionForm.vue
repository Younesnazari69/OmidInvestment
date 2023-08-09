<template>
  <!--begin::Wrapper-->
  <div class="w-lg p-10">
    <!--begin::Form-->
    <VForm class="form w-100" id="kt_login_signin_form" @submit="onSubmitLogin" :validation-schema="RegionModel"
      :initial-values="RegionData">
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
          <Field class="form-control form-control-lg form-control-solid" type="text" placeholder="" name="name"
            autocomplete="off" />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="name" />
            </div>
          </div>
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
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";

export default defineComponent({
  name: "RegionForm",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useDataStore();
    const router = useRouter();
    const route = useRoute()
    const RegionData = ref<any|object>({});
    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const RegionModel = Yup.object().shape({
      id: Yup.number().label("id"),
      name: Yup.string().required().label("name"),
    });

    onBeforeMount(() => {
      const id = route.params.id;
      if (id != "null") {
        store.FechRegion(id).then(() => {
          RegionData.value = store.RegionData;
        });
      }
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
      await store.UpdateRegion(values);
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
              router.push({ name: "RegionList" });
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
      router.push({ name: "RegionList" });
    };
    return {
      onSubmitLogin,
      RegionModel,
      submitButton,
      RegionData,
      ReternToList
    };
  },
});
</script>
