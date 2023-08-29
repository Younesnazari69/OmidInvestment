<template>
  <div class="card card-flush" :class="className"     :style="{backgroundImage: `url('${bgImage}')`, backgroundRepeat: 'no-repeat' ,backgroundPosition: 'left', backgroundSize:'contain'}"
>
    <!--begin::Header-->
    <div class="card-header pt-5">
      <!--begin::Title-->
      <div class="card-title d-flex flex-column">
        <!--begin::Amount-->
        <span class="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">{{
          stats
        }}</span>
        <!--end::Amount-->

        <!--begin::Subtitle-->
        <span class="text-gray-400 pt-1 fw-semibold fs-6">{{
          description
        }}</span>
        <!--end::Subtitle-->
      </div>
      <!--end::Title-->
    </div>
    <!--end::Header-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "default-dashboard-widget-3",
  components: {},
  props: {
    stats: { type: Number, required: true },
    bgImage: { type: String, required: false },
    description: { type: String, required: true },
    className: { type: String, required: false },
  },
  setup() {
    const profiles = [
      {
        name: "Alan Warden",
        initials: "A",
        state: "warning",
      },
      {
        name: "Michael Eberon",
        src: getAssetPath("media/avatars/blank.png"),
      },
    ];

    return {
      profiles,
      getAssetPath,
    };
  },
});
</script>
